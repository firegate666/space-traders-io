/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WaypointSymbol } from './WaypointSymbol';
/**
 * Result of a repair transaction.
 */
export type RepairTransaction = {
    waypointSymbol: WaypointSymbol;
    /**
     * The symbol of the ship.
     */
    shipSymbol: string;
    /**
     * The total price of the transaction.
     */
    totalPrice: number;
    /**
     * The timestamp of the transaction.
     */
    timestamp: string;
};

