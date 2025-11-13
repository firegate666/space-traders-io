import { IonText, IonSpinner } from '@ionic/react';

interface DataStateProps {
  loading: boolean;
  error?: string | null;
  children: React.ReactNode;
}

const DataState: React.FC<DataStateProps> = ({ loading, error, children }) => {
  if (loading) {
    return (
      <div className="centered">
        <IonSpinner name="crescent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered">
        <IonText color="danger">{error}</IonText>
      </div>
    );
  }

  return <>{children}</>;
};

export default DataState;
