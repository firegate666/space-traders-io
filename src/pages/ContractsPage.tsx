import {
  IonButton,
  IonChip,
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
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { closeCircleOutline, sendOutline } from 'ionicons/icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Contract, ContractDeliverGood, Meta, Ship } from '../api';
import { ContractsService } from '../api/services/ContractsService';
import { FleetService } from '../api/services/FleetService';
import { useSession } from '../store/SessionProvider';

interface DeliverState {
  contract: Contract;
  good: ContractDeliverGood;
}

export const ContractsPage: React.FC = () => {
  const { refreshProfile } = useSession();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [ships, setShips] = useState<Ship[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliverState, setDeliverState] = useState<DeliverState | null>(null);
  const [deliverShipSymbol, setDeliverShipSymbol] = useState('');
  const [deliverUnits, setDeliverUnits] = useState<number>(0);
  const [feedback, setFeedback] = useState('');

  const loadContracts = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await ContractsService.getContracts(page, 10);
      setContracts(result.data);
      setMeta(result.meta);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Failed to load contracts.');
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const loadShips = useCallback(async () => {
    try {
      const result = await FleetService.getMyShips(1, 50);
      setShips(result.data);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Failed to load ships.');
    }
  }, []);

  useEffect(() => {
    loadContracts();
  }, [loadContracts]);

  useEffect(() => {
    loadShips();
  }, [loadShips]);

  const openDeliverModal = (contract: Contract, good: ContractDeliverGood) => {
    setDeliverState({ contract, good });
    setDeliverShipSymbol('');
    setDeliverUnits(good.unitsRequired - good.unitsFulfilled);
    setIsModalOpen(true);
  };

  const handleDeliver = async () => {
    if (!deliverState || !deliverShipSymbol || !deliverUnits) {
      return;
    }
    try {
      setFeedback('');
      const response = await ContractsService.deliverContract(deliverState.contract.id, {
        shipSymbol: deliverShipSymbol,
        tradeSymbol: deliverState.good.tradeSymbol,
        units: deliverUnits
      });
      setFeedback(`Delivered via ${response.data.contract.id}. Remaining payout ${response.data.contract.terms.payment.onFulfilled}`);
      await Promise.all([refreshProfile(), loadContracts()]);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Delivery failed.');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleAccept = async (contract: Contract) => {
    try {
      const response = await ContractsService.acceptContract(contract.id);
      setFeedback(`Contract accepted. Deadline ${response.data.contract.terms.deadline}`);
      await Promise.all([refreshProfile(), loadContracts()]);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Failed to accept contract.');
    }
  };

  const handleFulfill = async (contract: Contract) => {
    try {
      const response = await ContractsService.fulfillContract(contract.id);
      setFeedback(`Fulfilled contract ${response.data.contract.id}. Payout ${response.data.contract.terms.payment.onFulfilled}`);
      await Promise.all([refreshProfile(), loadContracts()]);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Failed to fulfill contract.');
    }
  };

  const refreshContracts = async (event?: CustomEvent) => {
    await loadContracts();
    if (event) {
      event.detail.complete();
    }
  };

  const availableShips = useMemo(() => ships.map((ship) => ship.symbol), [ships]);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Contracts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refreshContracts}>
          <IonRefresherContent />
        </IonRefresher>
        {isLoading && <IonProgressBar type="indeterminate" />}<IonGrid fixed>
          <IonRow>
            <IonCol size="12">
              {feedback && (
                <IonText color="tertiary">
                  <p className="ion-padding-start ion-padding-end">{feedback}</p>
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            {contracts.map((contract) => (
              <IonCol key={contract.id} size="12" sizeMd="6">
                <div className="contract-card ion-padding ion-margin-bottom ion-border-radius">
                  <h2>{contract.type}</h2>
                  <p>
                    <strong>Accepted:</strong> {contract.accepted ? 'Yes' : 'No'} | <strong>Fulfilled:</strong>{' '}
                    {contract.fulfilled ? 'Yes' : 'No'}
                  </p>
                  <p>
                    <strong>Deadline:</strong> {new Date(contract.terms.deadline).toLocaleString()}
                  </p>
                  <IonChip color={contract.accepted ? 'success' : 'warning'}>
                    Credits on acceptance: {contract.terms.payment.onAccepted.toLocaleString()}
                  </IonChip>
                  <IonChip color="tertiary">
                    Credits on completion: {contract.terms.payment.onFulfilled.toLocaleString()}
                  </IonChip>
                  <IonList>
                    {(contract.terms.deliver ?? []).map((good) => (
                      <IonItem key={good.tradeSymbol} lines="full">
                        <IonLabel>
                          <h3>{good.tradeSymbol}</h3>
                          <p>
                            Deliver to {good.destinationSymbol} | {good.unitsFulfilled}/{good.unitsRequired} units
                          </p>
                        </IonLabel>
                        <IonButton
                          slot="end"
                          size="small"
                          disabled={!contract.accepted || contract.fulfilled || good.unitsFulfilled >= good.unitsRequired}
                          onClick={() => openDeliverModal(contract, good)}
                        >
                          Deliver
                        </IonButton>
                      </IonItem>
                    ))}
                  </IonList>
                  <div className="ship-action-group ion-margin-top">
                    <IonButton disabled={contract.accepted} onClick={() => handleAccept(contract)}>
                      Accept
                    </IonButton>
                    <IonButton
                      color="success"
                      disabled={!contract.accepted || contract.fulfilled}
                      onClick={() => handleFulfill(contract)}
                    >
                      Fulfill
                    </IonButton>
                  </div>
                </div>
              </IonCol>
            ))}
          </IonRow>
          <IonRow className="ion-justify-content-between ion-align-items-center ion-padding">
            <IonCol size="6">
              <IonButton disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
                Previous
              </IonButton>
            </IonCol>
            <IonCol size="6" className="ion-text-right">
              <IonButton
                disabled={meta ? page >= Math.ceil(meta.total / meta.limit) : false}
                onClick={() => setPage((value) => value + 1)}
              >
                Next
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Deliver Cargo</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setIsModalOpen(false)}>
                <IonIcon slot="icon-only" icon={closeCircleOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {deliverState && (
              <IonList>
                <IonItem lines="full">
                  <IonLabel position="stacked">Ship</IonLabel>
                  <IonSelect
                    value={deliverShipSymbol}
                    placeholder="Select ship"
                    interface="popover"
                    onIonChange={(event) => setDeliverShipSymbol(event.detail.value)}
                  >
                    {availableShips.map((symbol) => (
                      <IonSelectOption key={symbol} value={symbol}>
                        {symbol}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem lines="full">
                  <IonLabel position="stacked">Units</IonLabel>
                  <IonInput
                    type="number"
                    min={1}
                    max={deliverState.good.unitsRequired - deliverState.good.unitsFulfilled}
                    value={deliverUnits}
                    onIonChange={(event) => setDeliverUnits(Number(event.detail.value) || 0)}
                  />
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>
                    Destination: <strong>{deliverState.good.destinationSymbol}</strong>
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>
                    Trade Good: <strong>{deliverState.good.tradeSymbol}</strong>
                  </IonLabel>
                </IonItem>
              </IonList>
            )}
            <IonButton expand="block" className="ion-margin-top" onClick={handleDeliver}>
              <IonIcon icon={sendOutline} slot="start" />Deliver
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
