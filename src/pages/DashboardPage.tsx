import {
  IonButton,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { logOutOutline, refreshOutline } from 'ionicons/icons';
import React, { useCallback, useEffect, useState } from 'react';
import type { Contract, Ship } from '../api';
import { ContractsService } from '../api/services/ContractsService';
import { FleetService } from '../api/services/FleetService';
import { GlobalService } from '../api/services/GlobalService';
import { InfoCard } from '../components/InfoCard';
import { DataTable } from '../components/DataTable';
import { useSession } from '../store/SessionProvider';

export const DashboardPage: React.FC = () => {
  const { agent, accountEmail, refreshProfile, logout } = useSession();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [ships, setShips] = useState<Ship[]>([]);
  const [announcements, setAnnouncements] = useState<{ title: string; body: string }[]>([]);
  const [statusMeta, setStatusMeta] = useState<{
    description: string;
    resetDate: string;
    status: string;
    version: string;
  } | null>(null);
  const [leaderboard, setLeaderboard] = useState<{ agentSymbol: string; credits: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const [contractsResult, shipsResult, statusResult] = await Promise.all([
        ContractsService.getContracts(1, 5),
        FleetService.getMyShips(1, 20),
        GlobalService.getStatus()
      ]);
      setContracts(contractsResult.data);
      setShips(shipsResult.data);
      setAnnouncements(statusResult.announcements);
      setStatusMeta({
        description: statusResult.description,
        resetDate: statusResult.resetDate,
        status: statusResult.status,
        version: statusResult.version
      });
      setLeaderboard(statusResult.leaderboards.mostCredits.slice(0, 5));
    } catch (dashboardError) {
      setError(dashboardError instanceof Error ? dashboardError.message : 'Unable to load dashboard data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const refreshAll = async () => {
    await Promise.all([refreshProfile(), loadDashboard()]);
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Command Console</IonTitle>
          <IonButton slot="end" fill="clear" onClick={refreshAll}>
            <IonIcon slot="icon-only" icon={refreshOutline} />
          </IonButton>
          <IonButton slot="end" color="danger" fill="clear" onClick={logout}>
            <IonIcon slot="icon-only" icon={logOutOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoading && <IonProgressBar type="indeterminate" />}
        <IonGrid fixed>
          <IonRow>
            <IonCol size="12">
              {error && (
                <IonText color="danger">
                  <p className="ion-padding-start ion-padding-end">{error}</p>
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <InfoCard
                title={agent?.symbol ?? 'Unknown Agent'}
                subtitle={agent ? `Headquarters ${agent.headquarters}` : 'Loading agent'}
                footer={
                  <div className="chip-list">
                    <IonChip color="primary">Credits: {agent?.credits.toLocaleString()}</IonChip>
                    <IonChip color="tertiary">Account: {accountEmail ?? 'Unknown'}</IonChip>
                    <IonChip color="secondary">Faction: {agent?.startingFaction}</IonChip>
                  </div>
                }
              >
                <p>Fleet Size: {agent?.shipCount ?? ships.length}</p>
                <p>Ship Count: {ships.length}</p>
              </InfoCard>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <InfoCard
                title="Galactic Status"
                subtitle={statusMeta ? `${statusMeta.status} • API ${statusMeta.version}` : 'Loading status'}
                footer={statusMeta && <p>Next Reset: {new Date(statusMeta.resetDate).toLocaleString()}</p>}
              >
                <p>{statusMeta?.description}</p>
                <IonList>
                  {announcements.map((item) => (
                    <IonText key={item.title}>
                      <h4>{item.title}</h4>
                      <p>{item.body}</p>
                    </IonText>
                  ))}
                </IonList>
              </InfoCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <InfoCard title="Active Contracts" subtitle="Top 5">
                <DataTable
                  data={contracts}
                  getKey={(contract) => contract.id}
                  columns={[
                    { header: 'Type', key: 'type' },
                    {
                      header: 'Deadline',
                      key: 'deadline',
                      render: (contract) => new Date(contract.terms.deadline).toLocaleString()
                    },
                    {
                      header: 'Accepted',
                      key: 'accepted',
                      render: (contract) => (contract.accepted ? 'Yes' : 'No')
                    },
                    {
                      header: 'Progress',
                      key: 'progress',
                      render: (contract) => {
                        const deliverables = contract.terms.deliver ?? [];
                        const delivered = deliverables.reduce(
                          (acc, good) => acc + good.unitsFulfilled,
                          0
                        );
                        const required = deliverables.reduce(
                          (acc, good) => acc + good.unitsRequired,
                          0
                        );
                        return required ? `${delivered}/${required}` : 'N/A';
                      }
                    }
                  ]}
                />
              </InfoCard>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <InfoCard title="Top Credits" subtitle="Leaderboard">
                <DataTable
                  data={leaderboard}
                  getKey={(entry) => entry.agentSymbol}
                  columns={[
                    { header: 'Agent', key: 'agentSymbol' },
                    {
                      header: 'Credits',
                      key: 'credits',
                      render: (entry) => entry.credits.toLocaleString()
                    }
                  ]}
                />
              </InfoCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <InfoCard title="Fleet Overview" subtitle="Latest ships">
                <DataTable
                  data={ships}
                  getKey={(ship) => ship.symbol}
                  columns={[
                    { header: 'Symbol', key: 'symbol' },
                    {
                      header: 'Role',
                      key: 'registration',
                      render: (ship) => ship.registration.role
                    },
                    {
                      header: 'Nav',
                      key: 'nav',
                      render: (ship) => `${ship.nav.status} @ ${ship.nav.waypointSymbol}`
                    },
                    {
                      header: 'Fuel',
                      key: 'fuel',
                      render: (ship) => `${ship.fuel.current}/${ship.fuel.capacity}`
                    }
                  ]}
                />
              </InfoCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
