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
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import type { JumpGate, Market, Shipyard, System, Waypoint, Construction } from '../api';
import { SystemsService } from '../api/services/SystemsService';
import { DataTable } from '../components/DataTable';

export const SystemsPage: React.FC = () => {
  const [systems, setSystems] = useState<System[]>([]);
  const [systemsPage, setSystemsPage] = useState(1);
  const [systemsMeta, setSystemsMeta] = useState<{ total: number; limit: number } | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<System | null>(null);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [waypointPage, setWaypointPage] = useState(1);
  const [waypointMeta, setWaypointMeta] = useState<{ total: number; limit: number } | null>(null);
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(null);
  const [market, setMarket] = useState<Market | null>(null);
  const [shipyard, setShipyard] = useState<Shipyard | null>(null);
  const [jumpGate, setJumpGate] = useState<JumpGate | null>(null);
  const [construction, setConstruction] = useState<Construction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const loadSystems = useCallback(
    async (page: number) => {
      try {
        setIsLoading(true);
        setFeedback('');
        const response = await SystemsService.getSystems(page, 12);
        setSystems(response.data);
        setSystemsMeta({ total: response.meta.total, limit: response.meta.limit });
      } catch (error) {
        setFeedback(error instanceof Error ? error.message : 'Unable to load systems.');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadSystems(systemsPage);
  }, [loadSystems, systemsPage]);

  const loadWaypoints = useCallback(
    async (systemSymbol: string, page: number) => {
      try {
        setIsLoading(true);
        setFeedback('');
        const response = await SystemsService.getSystemWaypoints(systemSymbol, page, 20);
        setWaypoints(response.data);
        setWaypointMeta({ total: response.meta.total, limit: response.meta.limit });
      } catch (error) {
        setFeedback(error instanceof Error ? error.message : 'Unable to load waypoints.');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleSelectSystem = async (systemSymbol: string) => {
    try {
      setIsLoading(true);
      const [systemResponse] = await Promise.all([
        SystemsService.getSystem(systemSymbol)
      ]);
      setSelectedSystem(systemResponse.data);
      setWaypointPage(1);
      await loadWaypoints(systemSymbol, 1);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to fetch system.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectWaypoint = async (waypointSymbol: string) => {
    if (!selectedSystem) {
      return;
    }
    try {
      setIsLoading(true);
      const waypointResponse = await SystemsService.getWaypoint(selectedSystem.symbol, waypointSymbol);
      setSelectedWaypoint(waypointResponse.data);
      setMarket(null);
      setShipyard(null);
      setJumpGate(null);
      setConstruction(null);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to fetch waypoint.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMarket = async () => {
    if (!selectedSystem || !selectedWaypoint) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await SystemsService.getMarket(selectedSystem.symbol, selectedWaypoint.symbol);
      setMarket(response.data);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to fetch market.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadShipyard = async () => {
    if (!selectedSystem || !selectedWaypoint) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await SystemsService.getShipyard(selectedSystem.symbol, selectedWaypoint.symbol);
      setShipyard(response.data);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to fetch shipyard.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadJumpGate = async () => {
    if (!selectedSystem || !selectedWaypoint) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await SystemsService.getJumpGate(selectedSystem.symbol, selectedWaypoint.symbol);
      setJumpGate(response.data);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to fetch jump gate.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadConstruction = async () => {
    if (!selectedSystem || !selectedWaypoint) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await SystemsService.getConstruction(selectedSystem.symbol, selectedWaypoint.symbol);
      setConstruction(response.data);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to fetch construction site.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextSystemsPage = () => {
    if (systemsMeta) {
      const maxPage = Math.ceil(systemsMeta.total / systemsMeta.limit);
      if (systemsPage < maxPage) {
        setSystemsPage((value) => value + 1);
      }
    }
  };

  const prevSystemsPage = () => {
    if (systemsPage > 1) {
      setSystemsPage((value) => value - 1);
    }
  };

  const nextWaypointPage = () => {
    if (selectedSystem && waypointMeta) {
      const maxPage = Math.ceil(waypointMeta.total / waypointMeta.limit);
      if (waypointPage < maxPage) {
        const newPage = waypointPage + 1;
        setWaypointPage(newPage);
        loadWaypoints(selectedSystem.symbol, newPage);
      }
    }
  };

  const prevWaypointPage = () => {
    if (selectedSystem && waypointPage > 1) {
      const newPage = waypointPage - 1;
      setWaypointPage(newPage);
      loadWaypoints(selectedSystem.symbol, newPage);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Systems Explorer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoading && <IonProgressBar type="indeterminate" />}<IonGrid fixed>
          {feedback && (
            <IonRow>
              <IonCol size="12">
                <IonCard color="danger">
                  <IonCardContent>{feedback}</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol size="12" sizeMd="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Systems</IonCardTitle>
                  <IonCardSubtitle>Select a system to explore</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {systems.map((system) => (
                      <IonItem
                        key={system.symbol}
                        button
                        detail
                        onClick={() => handleSelectSystem(system.symbol)}
                      >
                        <IonLabel>
                          <h3>{system.symbol}</h3>
                          <p>
                            {system.type} • {system.waypoints.length} waypoints
                          </p>
                        </IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                  <div className="ship-action-group ion-margin-top">
                    <IonButton onClick={prevSystemsPage} disabled={systemsPage === 1}>
                      Previous
                    </IonButton>
                    <IonButton onClick={nextSystemsPage}>Next</IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{selectedSystem ? selectedSystem.symbol : 'System Details'}</IonCardTitle>
                  <IonCardSubtitle>
                    {selectedSystem
                      ? `${selectedSystem.type} • ${selectedSystem.sectorSymbol}`
                      : 'Select a system to view details'}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  {selectedSystem && (
                    <>
                      <p>Location: {selectedSystem.x}, {selectedSystem.y}</p>
                      <p>Factions: {selectedSystem.factions.map((faction) => faction.symbol).join(', ') || 'Unknown'}</p>
                      <IonList>
                        {waypoints.map((waypoint) => (
                          <IonItem
                            key={waypoint.symbol}
                            button
                            detail
                            onClick={() => handleSelectWaypoint(waypoint.symbol)}
                          >
                            <IonLabel>
                              <h3>{waypoint.symbol}</h3>
                              <p>
                                {waypoint.type} • {waypoint.traits.map((trait) => trait.name).join(', ')}
                              </p>
                            </IonLabel>
                          </IonItem>
                        ))}
                      </IonList>
                      <div className="ship-action-group ion-margin-top">
                        <IonButton onClick={prevWaypointPage} disabled={waypointPage === 1}>
                          Previous
                        </IonButton>
                        <IonButton onClick={nextWaypointPage}>Next</IonButton>
                      </div>
                    </>
                  )}
                  {!selectedSystem && <p>Choose a system to list its waypoints.</p>}
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{selectedWaypoint ? selectedWaypoint.symbol : 'Waypoint Details'}</IonCardTitle>
                  <IonCardSubtitle>
                    {selectedWaypoint
                      ? `${selectedWaypoint.type} • Orbitals ${selectedWaypoint.orbitals.length}`
                      : 'Select a waypoint to inspect'}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  {selectedWaypoint ? (
                    <>
                      <p>Traits: {selectedWaypoint.traits.map((trait) => trait.name).join(', ') || 'Uncharted'}</p>
                      <p>Orbit: {selectedWaypoint.orbits ?? 'N/A'}</p>
                      <p>Charted by: {selectedWaypoint.chart ? selectedWaypoint.chart.submittedBy : 'Unknown'}</p>
                      <div className="ship-action-group ion-margin-top">
                        <IonButton onClick={loadMarket}>Market</IonButton>
                        <IonButton onClick={loadShipyard}>Shipyard</IonButton>
                        <IonButton onClick={loadJumpGate}>Jump Gate</IonButton>
                        <IonButton onClick={loadConstruction}>Construction</IonButton>
                      </div>
                      {market && (
                        <div className="ion-margin-top">
                          <h4>Market</h4>
                          <DataTable
                            data={(market?.tradeGoods ?? [])}
                            getKey={(good) => good.symbol}
                            columns={[
                              { header: 'Good', key: 'symbol' },
                              { header: 'Trade Volume', key: 'tradeVolume' },
                              {
                                header: 'Supply',
                                key: 'supply',
                                render: (good) => `${good.supply} @ ${good.purchasePrice}`
                              }
                            ]}
                          />
                        </div>
                      )}
                      {shipyard && (
                        <div className="ion-margin-top">
                          <h4>Shipyard</h4>
                          <DataTable
                            data={(shipyard?.ships ?? [])}
                            getKey={(ship) => ship.type}
                            columns={[
                              { header: 'Type', key: 'type' },
                              { header: 'Name', key: 'name' },
                              { header: 'Price', key: 'purchasePrice', render: (ship) => ship.purchasePrice.toLocaleString() }
                            ]}
                          />
                        </div>
                      )}
                      {jumpGate && (
                        <div className="ion-margin-top">
                          <h4>Jump Connections</h4>
                          <ul>
                            {(jumpGate?.connections ?? []).map((connection) => (
                              <li key={connection}>{connection}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {construction && (
                        <div className="ion-margin-top">
                          <h4>Construction</h4>
                          <ul>
                            {construction.materials.map((material) => (
                              <li key={material.tradeSymbol}>
                                {material.tradeSymbol}: {material.fulfilled}/{material.required}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <p>Select a waypoint to view information.</p>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
