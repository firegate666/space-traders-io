import {
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
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import DataState from '../components/DataState';
import { useAuth } from '../context/AuthContext';
import { useApiQuery } from '../hooks/useApiQuery';
import { AgentResponse, getAgent, getContracts } from '../services/spaceTraders';
import { useCallback } from 'react';

const DashboardPage: React.FC = () => {
  const { token } = useAuth();
  const fetchAgent = useCallback(() => getAgent(token ?? ''), [token]);
  const fetchContracts = useCallback(() => getContracts(token ?? ''), [token]);
  const agentQuery = useApiQuery<AgentResponse>(fetchAgent, {
    enabled: Boolean(token),
    dependencies: [token]
  });
  const contractsQuery = useApiQuery(fetchContracts, {
    enabled: Boolean(token),
    dependencies: [token]
  });

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await Promise.all([agentQuery.refetch(), contractsQuery.refetch()]);
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Command Center</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="page-padding">
          <DataState loading={agentQuery.loading} error={agentQuery.error}>
            {agentQuery.data && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{agentQuery.data.data.symbol}</IonCardTitle>
                  <IonCardSubtitle>Headquarters: {agentQuery.data.data.headquarters}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>Credits</IonLabel>
                      <IonLabel slot="end">{agentQuery.data.data.credits.toLocaleString()}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Ship Count</IonLabel>
                      <IonLabel slot="end">{agentQuery.data.data.shipCount}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Starting Faction</IonLabel>
                      <IonLabel slot="end">{agentQuery.data.data.startingFaction}</IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            )}
          </DataState>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Contracts</IonCardTitle>
              <IonCardSubtitle>Active opportunities</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <DataState loading={contractsQuery.loading} error={contractsQuery.error}>
                {contractsQuery.data?.data.length ? (
                  <IonList>
                    {contractsQuery.data.data.map((contract) => (
                      <IonItem key={contract.id} lines="full">
                        <IonLabel>
                          <h2>{contract.type}</h2>
                          <p>Deadline: {new Date(contract.terms.deadline).toLocaleString()}</p>
                          <p>Accepted: {contract.accepted ? 'Yes' : 'No'} | Fulfilled: {contract.fulfilled ? 'Yes' : 'No'}</p>
                        </IonLabel>
                        <IonLabel slot="end">
                          <div>On Accept: {contract.terms.payment.onAccepted}</div>
                          <div>On Fulfill: {contract.terms.payment.onFulfilled}</div>
                        </IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                ) : (
                  <p>No contracts yet. Visit the Contracts tab to find opportunities.</p>
                )}
              </DataState>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
