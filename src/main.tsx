import React from 'react';
import ReactDOM from 'react-dom';
import { IonApp } from '@ionic/react';
import App from './App';
import { SessionProvider } from './store/SessionProvider';
import './theme/variables.css';
import './theme/global.css';
import '@ionic/react/css/core.css';

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <IonApp>
        <App />
      </IonApp>
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
