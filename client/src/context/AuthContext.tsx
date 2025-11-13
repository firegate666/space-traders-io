import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

interface AuthContextValue {
  token: string | null;
  callSign: string | null;
  login: (token: string, callSign: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'spaceTradersAuth';

type StorageShape = {
  token: string;
  callSign: string;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [callSign, setCallSign] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const stored = JSON.parse(raw) as StorageShape;
        setToken(stored.token);
        setCallSign(stored.callSign);
      } catch (error) {
        console.error('Failed to load auth state', error);
      }
    }
  }, []);

  useEffect(() => {
    if (token && callSign) {
      const value: StorageShape = { token, callSign };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [token, callSign]);

  const login = useCallback((newToken: string, newCallSign: string) => {
    setToken(newToken);
    setCallSign(newCallSign);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setCallSign(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      callSign,
      login,
      logout
    }),
    [token, callSign, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
