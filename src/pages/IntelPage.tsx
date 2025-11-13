import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonPage,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import type { Faction } from '../api';
import { DataTable } from '../components/DataTable';
import { DataService } from '../api/services/DataService';
import { FactionsService } from '../api/services/FactionsService';
import { GlobalService } from '../api/services/GlobalService';

interface ErrorCode {
  code: number;
  name: string;
}

export const IntelPage: React.FC = () => {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [myFactions, setMyFactions] = useState<{ symbol: string; reputation: number }[]>([]);
  const [errorCodes, setErrorCodes] = useState<ErrorCode[]>([]);
  const [supplyChain, setSupplyChain] = useState<[string, string[]][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const loadIntel = async () => {
      try {
        setIsLoading(true);
        setFeedback('');
        const [factionsResponse, myFactionsResponse, errorCodeResponse, supplyChainResponse] = await Promise.all([
          FactionsService.getFactions(1, 20),
          FactionsService.getMyFactions(1, 20),
          GlobalService.getErrorCodes(),
          DataService.getSupplyChain()
        ]);
        setFactions(factionsResponse.data);
        setMyFactions(myFactionsResponse.data);
        setErrorCodes(errorCodeResponse.errorCodes);
        setSupplyChain(Object.entries(supplyChainResponse.data.exportToImportMap));
      } catch (error) {
        setFeedback(error instanceof Error ? error.message : 'Failed to load intelligence reports.');
      } finally {
        setIsLoading(false);
      }
    };

    loadIntel();
  }, []);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Galactic Intel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoading && <IonProgressBar type="indeterminate" />}<IonGrid fixed>
          {feedback && (
            <IonRow>
              <IonCol size="12">
                <IonCard color="danger">
                  <IonCardContent>{feedback}</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Major Factions</IonCardTitle>
                  <IonCardSubtitle>Known powers across the quadrant</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <DataTable
                    data={factions}
                    getKey={(faction) => faction.symbol}
                    columns={[
                      { header: 'Name', key: 'name' },
                      { header: 'Symbol', key: 'symbol' },
                      { header: 'Description', key: 'description' }
                    ]}
                  />
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Our Reputation</IonCardTitle>
                  <IonCardSubtitle>Influence by faction</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <DataTable
                    data={myFactions}
                    getKey={(entry) => entry.symbol}
                    columns={[
                      { header: 'Faction', key: 'symbol' },
                      { header: 'Reputation', key: 'reputation' }
                    ]}
                  />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Error Codes</IonCardTitle>
                  <IonCardSubtitle>Know your diagnostics</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <DataTable
                    data={errorCodes}
                    getKey={(code) => String(code.code)}
                    columns={[
                      { header: 'Code', key: 'code' },
                      { header: 'Name', key: 'name' }
                    ]}
                  />
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Trade Supply Chain</IonCardTitle>
                  <IonCardSubtitle>Exports to Imports</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {supplyChain.map(([exportGood, imports]) => (
                      <IonCard key={exportGood} className="ion-margin-bottom">
                        <IonCardHeader>
                          <IonCardTitle>{exportGood}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <p>Imports:</p>
                          <ul>
                            {imports.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </IonCardContent>
                      </IonCard>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
