import React from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  barChartOutline,
  briefcaseOutline,
  compassOutline,
  globeOutline,
  rocketOutline
} from 'ionicons/icons';
import { useSession } from './store/SessionProvider';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ContractsPage } from './pages/ContractsPage';
import { FleetPage } from './pages/FleetPage';
import { SystemsPage } from './pages/SystemsPage';
import { IntelPage } from './pages/IntelPage';

const App: React.FC = () => {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Switch>
            <Route path="/dashboard" component={DashboardPage} exact />
            <Route path="/contracts" component={ContractsPage} exact />
            <Route path="/fleet" component={FleetPage} exact />
            <Route path="/systems" component={SystemsPage} exact />
            <Route path="/intel" component={IntelPage} exact />
            <Redirect exact from="/" to="/dashboard" />
          </Switch>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={barChartOutline} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="contracts" href="/contracts">
            <IonIcon icon={briefcaseOutline} />
            <IonLabel>Contracts</IonLabel>
          </IonTabButton>
          <IonTabButton tab="fleet" href="/fleet">
            <IonIcon icon={rocketOutline} />
            <IonLabel>Fleet</IonLabel>
          </IonTabButton>
          <IonTabButton tab="systems" href="/systems">
            <IonIcon icon={compassOutline} />
            <IonLabel>Systems</IonLabel>
          </IonTabButton>
          <IonTabButton tab="intel" href="/intel">
            <IonIcon icon={globeOutline} />
            <IonLabel>Intel</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default App;
