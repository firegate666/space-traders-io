import { useCallback, useState } from 'react';
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
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import DataState from '../components/DataState';
import { useAuth } from '../context/AuthContext';
import { useApiQuery } from '../hooks/useApiQuery';
import { getSystems, SystemsResponse } from '../services/spaceTraders';

const SystemsPage: React.FC = () => {
  const { token } = useAuth();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const systemsQuery = useApiQuery<SystemsResponse>(() => getSystems(token ?? '', page, 20), {
    enabled: Boolean(token),
    immediate: true,
    dependencies: [page, token]
  });

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await systemsQuery.refetch();
    event.detail.complete();
  };

  const handleNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const filteredSystems = systemsQuery.data?.data.filter((system) =>
    system.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Systems</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="page-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Known Systems</IonCardTitle>
              <IonCardSubtitle>Total: {systemsQuery.data?.meta.total ?? '...'}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonSearchbar
                value={filter}
                debounce={200}
                placeholder="Search by symbol"
                onIonInput={(event) => setFilter(event.detail.value?.toString() ?? '')}
              />
              <DataState loading={systemsQuery.loading} error={systemsQuery.error}>
                {filteredSystems?.length ? (
                  <IonList>
                    {filteredSystems.map((system) => (
                      <IonItem key={system.symbol} lines="full">
                        <IonLabel>
                          <h2>{system.symbol}</h2>
                          <p>Type: {system.type}</p>
                          <p>
                            Coordinates: ({system.x}, {system.y})
                          </p>
                        </IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                ) : (
                  <IonText>No systems match your filter.</IonText>
                )}
              </DataState>
              <div className="pagination-controls">
                <IonButton disabled={page === 1} onClick={handlePreviousPage}>
                  Previous
                </IonButton>
                <span>Page {systemsQuery.data?.meta.page ?? page}</span>
                <IonButton
                  disabled={Boolean(
                    systemsQuery.data &&
                      systemsQuery.data.meta.page * systemsQuery.data.meta.limit >=
                        systemsQuery.data.meta.total
                  )}
                  onClick={handleNextPage}
                >
                  Next
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SystemsPage;
