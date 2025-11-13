import { apiFetch } from './api';

export interface RegisterRequest {
  symbol: string;
  faction: string;
  email?: string;
}

export interface RegisterResponse {
  data: {
    token: string;
    agent: Agent;
    contract: Contract;
    faction: Faction;
    ship: Ship;
  };
}

export interface Faction {
  symbol: string;
  name: string;
  description: string;
  headquarters: string;
}

export interface AgentResponse {
  data: Agent;
}

export interface Agent {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: number;
}

export interface ContractResponse {
  data: Contract[];
}

export interface Contract {
  id: string;
  factionSymbol: string;
  type: string;
  accepted: boolean;
  fulfilled: boolean;
  expiration: string;
  terms: {
    deadline: string;
    payment: {
      onAccepted: number;
      onFulfilled: number;
    };
  };
}

export interface FleetResponse {
  data: Ship[];
}

export interface Ship {
  symbol: string;
  registration: {
    name: string;
    factionSymbol: string;
  };
  nav: {
    systemSymbol: string;
    waypointSymbol: string;
    route: {
      departure: Waypoint;
      destination: Waypoint;
      arrival: string;
      departureTime: string;
    };
    status: string;
    flightMode: string;
  };
  crew: {
    current: number;
    capacity: number;
    morale: number;
    wages: number;
  };
  frame: {
    name: string;
    moduleSlots: number;
    mountingPoints: number;
    fuelCapacity: number;
  };
  fuel: {
    current: number;
    capacity: number;
  };
  cargo: {
    capacity: number;
    units: number;
    inventory: Array<{ symbol: string; name: string; description?: string; units: number }>;
  };
}

export interface SystemsResponse {
  data: System[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface System {
  symbol: string;
  sectorSymbol: string;
  type: string;
  x: number;
  y: number;
  distance?: number;
}

export interface Waypoint {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
}

export interface ContractsAcceptResponse {
  data: {
    agent: Agent;
    contract: Contract;
  };
}

export interface RefuelResponse {
  data: {
    agent: Agent;
    fuel: Ship['fuel'];
  };
}

export const registerAgent = (payload: RegisterRequest) =>
  apiFetch<RegisterResponse>('/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const getAgent = (token: string) => apiFetch<AgentResponse>('/my/agent', {}, token);

export const getContracts = (token: string) => apiFetch<ContractResponse>('/my/contracts', {}, token);

export const acceptContract = (token: string, contractId: string) =>
  apiFetch<ContractsAcceptResponse>(`/my/contracts/${contractId}/accept`, { method: 'POST' }, token);

export const getFleet = (token: string) => apiFetch<FleetResponse>('/my/ships', {}, token);

export const refuelShip = (token: string, shipSymbol: string) =>
  apiFetch<RefuelResponse>(`/my/ships/${shipSymbol}/refuel`, { method: 'POST' }, token);

export const getSystems = (token: string, page = 1, limit = 20) =>
  apiFetch<SystemsResponse>(`/systems?page=${page}&limit=${limit}`, {}, token);
