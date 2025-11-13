/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WaypointSymbol } from './WaypointSymbol';
/**
 * Results of a transaction with a shipyard.
 */
export type ShipyardTransaction = {
    waypointSymbol: WaypointSymbol;
    /**
     * The symbol of the ship type (e.g. SHIP_MINING_DRONE) that was the subject of the transaction. Contrary to what the name implies, this is NOT the symbol of the ship that was purchased.
     * @deprecated
     */
    shipSymbol: string;
    /**
     * The symbol of the ship type (e.g. SHIP_MINING_DRONE) that was the subject of the transaction.
     */
    shipType: string;
    /**
     * The price of the transaction.
     */
    price: number;
    /**
     * The symbol of the agent that made the transaction.
     */
    agentSymbol: string;
    /**
     * The timestamp of the transaction.
     */
    timestamp: string;
};

