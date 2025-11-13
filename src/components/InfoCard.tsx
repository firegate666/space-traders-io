import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/react';
import React from 'react';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, subtitle, footer, children }) => (
  <IonCard>
    <IonCardHeader>
      <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      <IonCardTitle>{title}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      {children}
      {footer && <div className="ion-margin-top">{footer}</div>}
    </IonCardContent>
  </IonCard>
);
