import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Agent } from '../api';
import { AccountsService } from '../api/services/AccountsService';
import { AgentsService } from '../api/services/AgentsService';
import { OpenAPI } from '../api/core/OpenAPI';

type SessionContextValue = {
  token: string | null;
  agent: Agent | null;
  accountEmail: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  refreshProfile: () => Promise<void>;
  logout: () => void;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

const STORAGE_KEY = 'spaceTraders.authToken';

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.localStorage.getItem(STORAGE_KEY);
  });
  const [agent, setAgent] = useState<Agent | null>(null);
  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (token) {
      window.localStorage.setItem(STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    OpenAPI.TOKEN = token ?? undefined;
  }, [token]);

  const refreshProfile = async () => {
    if (!token) {
      setAgent(null);
      setAccountEmail(null);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const [agentResponse, accountResponse] = await Promise.all([
        AgentsService.getMyAgent(),
        AccountsService.getMyAccount()
      ]);
      setAgent(agentResponse.data);
      setAccountEmail(accountResponse.data.account.email);
    } catch (refreshError) {
      const message = refreshError instanceof Error ? refreshError.message : 'Failed to load profile.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      refreshProfile();
    } else {
      setAgent(null);
      setAccountEmail(null);
    }
  }, [token]);

  const logout = () => {
    setTokenState(null);
    setAgent(null);
    setAccountEmail(null);
  };

  const value = useMemo<SessionContextValue>(
    () => ({
      token,
      agent,
      accountEmail,
      isLoading,
      error,
      isAuthenticated: Boolean(token),
      setToken: setTokenState,
      refreshProfile,
      logout
    }),
    [token, agent, accountEmail, isLoading, error]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = (): SessionContextValue => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
