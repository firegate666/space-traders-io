import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect, useMemo, useState } from 'react';
import type { Faction } from '../api';
import { AccountsService } from '../api/services/AccountsService';
import { FactionsService } from '../api/services/FactionsService';
import { useSession } from '../store/SessionProvider';

const TOKEN_PLACEHOLDER = 'Paste your SpaceTraders API token here';

type AuthMode = 'token' | 'register';

export const AuthPage: React.FC = () => {
  const { setToken, refreshProfile, isLoading, error } = useSession();
  const [mode, setMode] = useState<AuthMode>('token');
  const [tokenInput, setTokenInput] = useState('');
  const [factions, setFactions] = useState<Faction[]>([]);
  const [registerSymbol, setRegisterSymbol] = useState('');
  const [registerFaction, setRegisterFaction] = useState('COSMIC');
  const [registerResponse, setRegisterResponse] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'register') {
      let cancelled = false;
      const loadFactions = async () => {
        try {
          const result = await FactionsService.getFactions(1, 20);
          if (!cancelled) {
            setFactions(result.data);
          }
        } catch (err) {
          if (!cancelled) {
            const message = err instanceof Error ? err.message : 'Unable to load factions.';
            setLoadError(message);
          }
        }
      };
      loadFactions();
      return () => {
        cancelled = true;
      };
    }
    return undefined;
  }, [mode]);

  const handleTokenSubmit = async () => {
    if (!tokenInput.trim()) {
      return;
    }
    setToken(tokenInput.trim());
    await refreshProfile();
  };

  const handleRegister = async () => {
    if (!registerSymbol.trim()) {
      return;
    }
    setIsSubmitting(true);
    setRegisterResponse('');
    try {
      const response = await AccountsService.register({
        symbol: registerSymbol.trim(),
        faction: registerFaction as any
      });
      setRegisterResponse(
        `Welcome ${response.data.agent.symbol}! Your token is ${response.data.token}. Please store it safely.`
      );
      setToken(response.data.token);
      await refreshProfile();
    } catch (registerError) {
      const message = registerError instanceof Error ? registerError.message : 'Registration failed.';
      setRegisterResponse(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorToDisplay = useMemo(() => error ?? loadError ?? '', [error, loadError]);

  return (
    <IonPage className="auth-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Space Traders Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonCard>
                <IonCardContent>
                  <IonSegment
                    value={mode}
                    onIonChange={(event) => setMode(event.detail.value as AuthMode)}
                    className="ion-margin-bottom"
                  >
                    <IonSegmentButton value="token">
                      <IonLabel>Use Token</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="register">
                      <IonLabel>Register</IonLabel>
                    </IonSegmentButton>
                  </IonSegment>
                  {mode === 'token' ? (
                    <IonList>
                      <IonItem>
                        <IonLabel position="stacked">API Token</IonLabel>
                        <IonInput
                          placeholder={TOKEN_PLACEHOLDER}
                          value={tokenInput}
                          onIonChange={(event) => setTokenInput(event.detail.value ?? '')}
                        />
                      </IonItem>
                      <IonButton expand="block" className="ion-margin-top" onClick={handleTokenSubmit}>
                        Continue
                      </IonButton>
                    </IonList>
                  ) : (
                    <IonList>
                      <IonItem>
                        <IonLabel position="stacked">Agent Symbol</IonLabel>
                        <IonInput
                          placeholder="Enter a unique callsign"
                          value={registerSymbol}
                          onIonChange={(event) => setRegisterSymbol(event.detail.value ?? '')}
                          maxlength={14}
                        />
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">Faction</IonLabel>
                        <IonSelect
                          interface="popover"
                          value={registerFaction}
                          onIonChange={(event) => setRegisterFaction(event.detail.value)}
                        >
                          {factions.map((faction) => (
                            <IonSelectOption key={faction.symbol} value={faction.symbol}>
                              {faction.name} ({faction.symbol})
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                      <IonButton expand="block" className="ion-margin-top" onClick={handleRegister} disabled={isSubmitting}>
                        {isSubmitting ? 'Registering...' : 'Register'}
                      </IonButton>
                      {registerResponse && (
                        <IonTextarea readonly value={registerResponse} autoGrow className="ion-margin-top" />
                      )}
                    </IonList>
                  )}
                  {errorToDisplay && (
                    <IonText color="danger" className="ion-text-center ion-margin-top">
                      <p>{errorToDisplay}</p>
                    </IonText>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonLoading isOpen={isLoading || isSubmitting} message="Loading" />
      </IonContent>
    </IonPage>
  );
};
