import { useCallback, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import { ApiError, isApiError } from '../services/api';
import { registerAgent } from '../services/spaceTraders';

const factions = [
  { value: 'COSMIC', label: 'Cosmic' },
  { value: 'VOID', label: 'Void' },
  { value: 'GALACTIC', label: 'Galactic' },
  { value: 'QUANTUM', label: 'Quantum' },
  { value: 'DOMINION', label: 'Dominion' }
];

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [callSign, setCallSign] = useState('');
  const [faction, setFaction] = useState(factions[0]?.value ?? 'COSMIC');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setSubmitting(true);
      setError(null);
      try {
        const response = await registerAgent({
          symbol: callSign,
          faction,
          email: email || undefined
        });
        login(response.data.token, response.data.agent.symbol);
      } catch (err) {
        let message = 'Unknown error';
        if (isApiError(err)) {
          message = err.error.message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
      } finally {
        setSubmitting(false);
      }
    },
    [callSign, faction, email, login]
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Start your command</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Register Agent</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Call Sign</IonLabel>
                  <IonInput
                    value={callSign}
                    onIonInput={(event) =>
                      setCallSign(event.detail.value?.toString().toUpperCase() ?? '')
                    }
                    placeholder="E.g. GALAXYFOX"
                    required
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Faction</IonLabel>
                  <IonSelect value={faction} onIonChange={(event) => setFaction(event.detail.value)}>
                    {factions.map((item) => (
                      <IonSelectOption key={item.value} value={item.value}>
                        {item.label}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Email (optional)</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonInput={(event) => setEmail(event.detail.value?.toString() ?? '')}
                    placeholder="agent@example.com"
                  />
                </IonItem>
              </IonList>
              {error && (
                <IonText color="danger" className="ion-margin-top">
                  {error}
                </IonText>
              )}
              <IonButton
                type="submit"
                expand="block"
                className="ion-margin-top"
                disabled={!callSign || submitting}
              >
                {submitting ? 'Registering...' : 'Launch Command'}
              </IonButton>
            </IonCardContent>
          </IonCard>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
