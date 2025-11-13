import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import App from './App';
import { AuthProvider } from './context/AuthContext';

import '@ionic/react/css/core.css';
import './styles/theme.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IonReactRouter>
      <IonApp>
        <AuthProvider>
          <App />
        </AuthProvider>
      </IonApp>
    </IonReactRouter>
  </StrictMode>
);
