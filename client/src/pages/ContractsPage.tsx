import { useCallback, useMemo, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import DataState from '../components/DataState';
import { useAuth } from '../context/AuthContext';
import { useApiQuery } from '../hooks/useApiQuery';
import {
  acceptContract,
  Contract,
  ContractResponse,
  getAgent,
  getContracts
} from '../services/spaceTraders';

const ContractsPage: React.FC = () => {
  const { token } = useAuth();
  const [status, setStatus] = useState<{ message: string; tone: 'success' | 'danger' } | null>(
    null
  );
  const fetchAgent = useCallback(() => getAgent(token ?? ''), [token]);
  const fetchContracts = useCallback(() => getContracts(token ?? ''), [token]);
  const agentQuery = useApiQuery(fetchAgent, { enabled: Boolean(token), dependencies: [token] });
  const contractsQuery = useApiQuery<ContractResponse>(fetchContracts, {
    enabled: Boolean(token),
    dependencies: [token]
  });

  const credits = agentQuery.data?.data.credits ?? 0;

  const handleAccept = useCallback(
    async (contract: Contract) => {
      if (!token) {
        return;
      }
      try {
        await acceptContract(token, contract.id);
        setStatus({ message: `Contract ${contract.id} accepted!`, tone: 'success' });
        await Promise.all([contractsQuery.refetch(), agentQuery.refetch()]);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to accept contract';
        setStatus({ message, tone: 'danger' });
      }
    },
    [agentQuery, contractsQuery, token]
  );

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await Promise.all([contractsQuery.refetch(), agentQuery.refetch()]);
    event.detail.complete();
  };

  const sortedContracts = useMemo(
    () => contractsQuery.data?.data.slice().sort((a, b) => (a.accepted === b.accepted ? 0 : a.accepted ? 1 : -1)) ?? [],
    [contractsQuery.data]
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contracts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="page-padding">
          {status && (
            <IonText color={status.tone} className="ion-margin-bottom">
              {status.message}
            </IonText>
          )}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Available Contracts</IonCardTitle>
              <IonCardSubtitle>Agent credits: {credits.toLocaleString()}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <DataState loading={contractsQuery.loading} error={contractsQuery.error}>
                {sortedContracts.length ? (
                  <IonList>
                    {sortedContracts.map((contract) => (
                      <IonItem key={contract.id} lines="full">
                        <IonLabel>
                          <h2>{contract.type}</h2>
                          <p>Deadline: {new Date(contract.terms.deadline).toLocaleString()}</p>
                          <p>Expiration: {new Date(contract.expiration).toLocaleString()}</p>
                        </IonLabel>
                        <IonButton
                          slot="end"
                          color={contract.accepted ? 'medium' : 'primary'}
                          disabled={contract.accepted}
                          onClick={() => handleAccept(contract)}
                        >
                          {contract.accepted ? 'Accepted' : 'Accept'}
                        </IonButton>
                      </IonItem>
                    ))}
                  </IonList>
                ) : (
                  <p>No contracts to show right now. Check back soon!</p>
                )}
              </DataState>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ContractsPage;
