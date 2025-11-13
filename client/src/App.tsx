import { useMemo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton
} from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { useAuth } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import FleetPage from './pages/FleetPage';
import ContractsPage from './pages/ContractsPage';
import SystemsPage from './pages/SystemsPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const { token, logout } = useAuth();

  const protectedRoutes = useMemo(
    () => (
      <IonSplitPane when="sm" contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Space Traders</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle autoHide={false}>
                <IonItem routerLink="/dashboard" routerDirection="root">
                  <IonLabel>Dashboard</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem routerLink="/fleet" routerDirection="root">
                  <IonLabel>Fleet</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem routerLink="/contracts" routerDirection="root">
                  <IonLabel>Contracts</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem routerLink="/systems" routerDirection="root">
                  <IonLabel>Systems</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
            <div className="logout-container">
              <IonButton expand="block" color="medium" onClick={logout}>
                <IonIcon icon={logOutOutline} slot="start" />
                Logout
              </IonButton>
            </div>
          </IonContent>
        </IonMenu>

        <IonPage id="main">
          <IonRouterOutlet>
            <Route path="/dashboard" component={DashboardPage} exact />
            <Route path="/fleet" component={FleetPage} exact />
            <Route path="/contracts" component={ContractsPage} exact />
            <Route path="/systems" component={SystemsPage} exact />
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
          </IonRouterOutlet>
        </IonPage>
      </IonSplitPane>
    ),
    [logout]
  );

  return token ? (
    protectedRoutes
  ) : (
    <IonPage>
      <IonRouterOutlet>
        <Route path="/login" component={LoginPage} exact />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonPage>
  );
};

export default App;
