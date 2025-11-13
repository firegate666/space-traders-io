import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/react';
import { closeOutline, rocketOutline } from 'ionicons/icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Ship } from '../api';
import { FleetService } from '../api/services/FleetService';
import { useSession } from '../store/SessionProvider';

interface ActionField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  placeholder?: string;
  optional?: boolean;
  options?: { label: string; value: string }[];
  getOptions?: (context: { ship: Ship; ships: Ship[] }) => { label: string; value: string }[];
}

interface ShipActionMeta {
  key: string;
  label: string;
  description?: string;
  fields: ActionField[];
  perform: (ship: Ship, values: Record<string, any>) => Promise<unknown>;
}

const refineOptions = ['IRON', 'COPPER', 'SILVER', 'GOLD', 'ALUMINUM', 'PLATINUM', 'URANITE', 'MERITIUM', 'FUEL'];

export const FleetPage: React.FC = () => {
  const { refreshProfile } = useSession();
  const [ships, setShips] = useState<Ship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [activeShip, setActiveShip] = useState<Ship | null>(null);
  const [activeAction, setActiveAction] = useState<ShipActionMeta | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [actionOutput, setActionOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const loadShips = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await FleetService.getMyShips(1, 50);
      setShips(result.data);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to load ships.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadShips();
  }, [loadShips]);

  const actions: ShipActionMeta[] = useMemo(
    () => [
      {
        key: 'orbit',
        label: 'Enter Orbit',
        fields: [],
        perform: (ship) => FleetService.orbitShip(ship.symbol)
      },
      {
        key: 'dock',
        label: 'Dock',
        fields: [],
        perform: (ship) => FleetService.dockShip(ship.symbol)
      },
      {
        key: 'navigate',
        label: 'Navigate',
        description: 'Travel to a waypoint within the current system.',
        fields: [
          { name: 'waypointSymbol', label: 'Destination Waypoint', type: 'text', placeholder: 'X1-Y1' }
        ],
        perform: (ship, values) =>
          FleetService.navigateShip(ship.symbol, { waypointSymbol: values.waypointSymbol })
      },
      {
        key: 'jump',
        label: 'Jump',
        description: 'Jump to another system.',
        fields: [{ name: 'waypointSymbol', label: 'Connected Waypoint', type: 'text', placeholder: 'X1-DF55-A1' }],
        perform: (ship, values) => FleetService.jumpShip(ship.symbol, { waypointSymbol: values.waypointSymbol })
      },
      {
        key: 'warp',
        label: 'Warp',
        description: 'Warp to a remote waypoint.',
        fields: [{ name: 'waypointSymbol', label: 'Target Waypoint', type: 'text' }],
        perform: (ship, values) => FleetService.warpShip(ship.symbol, { waypointSymbol: values.waypointSymbol })
      },
      {
        key: 'refuel',
        label: 'Refuel',
        fields: [
          { name: 'units', label: 'Fuel Units', type: 'number', optional: true },
          { name: 'fromCargo', label: 'Use Cargo Fuel', type: 'checkbox', optional: true }
        ],
        perform: (ship, values) =>
          FleetService.refuelShip(ship.symbol, {
            units: values.units ? Number(values.units) : undefined,
            fromCargo: values.fromCargo ?? undefined
          })
      },
      {
        key: 'repair',
        label: 'Repair',
        description: 'Repair ship at shipyard.',
        fields: [],
        perform: (ship) => FleetService.repairShip(ship.symbol)
      },
      {
        key: 'chart',
        label: 'Chart Waypoint',
        fields: [],
        perform: (ship) => FleetService.createChart(ship.symbol)
      },
      {
        key: 'survey',
        label: 'Create Survey',
        fields: [],
        perform: (ship) => FleetService.createSurvey(ship.symbol)
      },
      {
        key: 'extract',
        label: 'Extract Resources',
        fields: [],
        perform: (ship) => FleetService.extractResources(ship.symbol)
      },
      {
        key: 'siphon',
        label: 'Siphon Resources',
        fields: [],
        perform: (ship) => FleetService.siphonResources(ship.symbol)
      },
      {
        key: 'sell',
        label: 'Sell Cargo',
        fields: [
          {
            name: 'tradeSymbol',
            label: 'Good',
            type: 'select',
            getOptions: ({ ship }) =>
              ship.cargo.inventory.map((item) => ({ label: `${item.name} (${item.units})`, value: item.symbol }))
          },
          { name: 'units', label: 'Units', type: 'number' }
        ],
        perform: (ship, values) =>
          FleetService.sellCargo(ship.symbol, {
            symbol: values.tradeSymbol,
            units: Number(values.units)
          })
      },
      {
        key: 'purchase',
        label: 'Purchase Cargo',
        fields: [
          { name: 'tradeSymbol', label: 'Good Symbol', type: 'text' },
          { name: 'units', label: 'Units', type: 'number' }
        ],
        perform: (ship, values) =>
          FleetService.purchaseCargo(ship.symbol, {
            symbol: values.tradeSymbol,
            units: Number(values.units)
          })
      },
      {
        key: 'jettison',
        label: 'Jettison Cargo',
        fields: [
          {
            name: 'tradeSymbol',
            label: 'Good',
            type: 'select',
            getOptions: ({ ship }) =>
              ship.cargo.inventory.map((item) => ({ label: `${item.name} (${item.units})`, value: item.symbol }))
          },
          { name: 'units', label: 'Units', type: 'number' }
        ],
        perform: (ship, values) =>
          FleetService.jettison(ship.symbol, {
            symbol: values.tradeSymbol,
            units: Number(values.units)
          })
      },
      {
        key: 'transfer',
        label: 'Transfer Cargo',
        fields: [
          {
            name: 'tradeSymbol',
            label: 'Good',
            type: 'select',
            getOptions: ({ ship }) =>
              ship.cargo.inventory.map((item) => ({ label: `${item.name} (${item.units})`, value: item.symbol }))
          },
          { name: 'units', label: 'Units', type: 'number' },
          {
            name: 'targetShip',
            label: 'Target Ship',
            type: 'select',
            getOptions: ({ ship, ships }) =>
              ships
                .filter((candidate) => candidate.symbol !== ship.symbol)
                .map((candidate) => ({ label: candidate.symbol, value: candidate.symbol }))
          }
        ],
        perform: (ship, values) =>
          FleetService.transferCargo(ship.symbol, {
            tradeSymbol: values.tradeSymbol,
            units: Number(values.units),
            shipSymbol: values.targetShip
          })
      },
      {
        key: 'scanWaypoints',
        label: 'Scan Waypoints',
        fields: [],
        perform: (ship) => FleetService.createShipWaypointScan(ship.symbol)
      },
      {
        key: 'scanSystems',
        label: 'Scan Systems',
        fields: [],
        perform: (ship) => FleetService.createShipSystemScan(ship.symbol)
      },
      {
        key: 'scanShips',
        label: 'Scan Ships',
        fields: [],
        perform: (ship) => FleetService.createShipShipScan(ship.symbol)
      },
      {
        key: 'refine',
        label: 'Refine Materials',
        fields: [
          {
            name: 'produce',
            label: 'Output',
            type: 'select',
            options: refineOptions.map((symbol) => ({ label: symbol, value: symbol }))
          }
        ],
        perform: (ship, values) => FleetService.shipRefine(ship.symbol, { produce: values.produce })
      }
    ],
    []
  );

  const openActionModal = (ship: Ship, action: ShipActionMeta) => {
    setActiveShip(ship);
    setActiveAction(action);
    setFormValues({});
    setActionOutput('');
    setActionModalOpen(true);
  };

  const closeModal = () => {
    setActionModalOpen(false);
    setActiveShip(null);
    setActiveAction(null);
  };

  const resolveFieldOptions = (field: ActionField, ship: Ship): { label: string; value: string }[] => {
    if (field.getOptions) {
      return field.getOptions({ ship, ships });
    }
    return field.options ?? [];
  };

  const handleSubmit = async () => {
    if (!activeShip || !activeAction) {
      return;
    }
    try {
      setIsSubmitting(true);
      setActionOutput('');
      const payload = await activeAction.perform(activeShip, formValues);
      const summary = JSON.stringify(payload, null, 2);
      setActionOutput(summary);
      await Promise.all([refreshProfile(), loadShips()]);
    } catch (error) {
      setActionOutput(error instanceof Error ? error.message : 'Ship action failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Fleet Operations</IonTitle>
          <IonButton slot="end" fill="clear" onClick={loadShips}>
            <IonIcon slot="icon-only" icon={rocketOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoading && <IonProgressBar type="indeterminate" />}<IonGrid fixed>
          <IonRow>
            <IonCol size="12">
              {feedback && (
                <IonCard color="danger">
                  <IonCardContent>{feedback}</IonCardContent>
                </IonCard>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            {ships.map((ship) => (
              <IonCol key={ship.symbol} size="12" sizeMd="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{ship.symbol}</IonCardTitle>
                    <IonCardSubtitle>
                      {ship.registration.role} • {ship.nav.status} at {ship.nav.waypointSymbol}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>Frame: {ship.frame.name}</p>
                    <p>Crew: {ship.crew.current}/{ship.crew.capacity}</p>
                    <p>
                      Fuel: {ship.fuel.current}/{ship.fuel.capacity} • Condition {ship.frame.condition ?? '??'}%
                    </p>
                    <h4>Cargo</h4>
                    <IonList>
                      {ship.cargo.inventory.map((item) => (
                        <IonItem key={item.symbol} lines="none">
                          <IonLabel>
                            {item.name} ({item.units})
                            <p>{item.description}</p>
                          </IonLabel>
                        </IonItem>
                      ))}
                      {!ship.cargo.inventory.length && (
                        <IonItem lines="none">
                          <IonLabel>No cargo aboard.</IonLabel>
                        </IonItem>
                      )}
                    </IonList>
                    <div className="ship-action-group ion-margin-top">
                      {actions.map((action) => (
                        <IonButton key={action.key} size="small" onClick={() => openActionModal(ship, action)}>
                          {action.label}
                        </IonButton>
                      ))}
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonModal isOpen={actionModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                {activeShip?.symbol} - {activeAction?.label}
              </IonTitle>
              <IonButton slot="end" fill="clear" onClick={closeModal}>
                <IonIcon icon={closeOutline} slot="icon-only" />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {activeAction && activeShip && (
              <IonList>
                {activeAction.description && (
                  <IonItem lines="none">
                    <IonLabel>{activeAction.description}</IonLabel>
                  </IonItem>
                )}
                {activeAction.fields?.map((field) => {
                  const options = resolveFieldOptions(field, activeShip);
                  const value = formValues[field.name];
                  if (field.type === 'select') {
                    return (
                      <IonItem key={field.name} lines="full">
                        <IonLabel position="stacked">{field.label}</IonLabel>
                        <IonSelect
                          value={value}
                          placeholder={field.placeholder}
                          interface="popover"
                          onIonChange={(event) =>
                            setFormValues((current) => ({ ...current, [field.name]: event.detail.value }))
                          }
                        >
                          {options.map((option) => (
                            <IonSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                    );
                  }
                  if (field.type === 'checkbox') {
                    return (
                      <IonItem key={field.name} lines="full">
                        <IonLabel>{field.label}</IonLabel>
                        <IonToggle
                          checked={Boolean(value)}
                          onIonChange={(event) =>
                            setFormValues((current) => ({ ...current, [field.name]: event.detail.checked }))
                          }
                        />
                      </IonItem>
                    );
                  }
                  return (
                    <IonItem key={field.name} lines="full">
                      <IonLabel position="stacked">{field.label}</IonLabel>
                      <IonInput
                        type={field.type}
                        value={value ?? ''}
                        placeholder={field.placeholder}
                        onIonChange={(event) =>
                          setFormValues((current) => ({ ...current, [field.name]: event.detail.value }))
                        }
                      />
                    </IonItem>
                  );
                })}
              </IonList>
            )}
            <IonButton expand="block" className="ion-margin-top" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Executing...' : 'Execute Action'}
            </IonButton>
            {actionOutput && (
              <IonTextarea
                readonly
                autoGrow
                value={actionOutput}
                className="ion-margin-top"
              />
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
