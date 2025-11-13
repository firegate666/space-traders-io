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
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import DataState from '../components/DataState';
import { useAuth } from '../context/AuthContext';
import { useApiQuery } from '../hooks/useApiQuery';
import { getFleet, refuelShip, FleetResponse, Ship } from '../services/spaceTraders';

const FleetPage: React.FC = () => {
  const { token } = useAuth();
  const [statusMessage, setStatusMessage] = useState<{ message: string; tone: 'success' | 'danger' } | null>(
    null
  );
  const fetchFleet = useCallback(() => getFleet(token ?? ''), [token]);
  const fleetQuery = useApiQuery<FleetResponse>(fetchFleet, {
    enabled: Boolean(token),
    dependencies: [token]
  });

  const handleRefuel = useCallback(
    async (ship: Ship) => {
      if (!token) {
        return;
      }
      try {
        const result = await refuelShip(token, ship.symbol);
        setStatusMessage({
          message: `${ship.symbol} refueled. Current fuel: ${result.data.fuel.current}/${result.data.fuel.capacity}`,
          tone: 'success'
        });
        await fleetQuery.refetch();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to refuel ship';
        setStatusMessage({ message, tone: 'danger' });
      }
    },
    [fleetQuery, token]
  );

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await fleetQuery.refetch();
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fleet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="page-padding">
          {statusMessage && (
            <IonText color={statusMessage.tone} className="ion-margin-bottom">
              {statusMessage.message}
            </IonText>
          )}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Ships</IonCardTitle>
              <IonCardSubtitle>Monitor your fleet</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <DataState loading={fleetQuery.loading} error={fleetQuery.error}>
                {fleetQuery.data?.data.length ? (
                  <IonList>
                    {fleetQuery.data.data.map((ship) => (
                      <IonItem key={ship.symbol} lines="full">
                        <IonLabel>
                          <h2>{ship.symbol}</h2>
                          <p>
                            {ship.nav.systemSymbol} / {ship.nav.waypointSymbol} - {ship.nav.status}
                          </p>
                          <p>
                            Fuel: {ship.fuel.current}/{ship.fuel.capacity} | Crew: {ship.crew.current}/{ship.crew.capacity}
                          </p>
                        </IonLabel>
                        <IonButton slot="end" onClick={() => handleRefuel(ship)}>
                          Refuel
                        </IonButton>
                      </IonItem>
                    ))}
                  </IonList>
                ) : (
                  <p>No ships yet. Accept contracts to earn credits and expand your fleet.</p>
                )}
              </DataState>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FleetPage;
