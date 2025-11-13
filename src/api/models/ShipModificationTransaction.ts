/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Result of a transaction for a ship modification, such as installing a mount or a module.
 */
export type ShipModificationTransaction = {
    /**
     * The symbol of the waypoint where the transaction took place.
     */
    waypointSymbol: string;
    /**
     * The symbol of the ship that made the transaction.
     */
    shipSymbol: string;
    /**
     * The symbol of the trade good.
     */
    tradeSymbol: string;
    /**
     * The total price of the transaction.
     */
    totalPrice: number;
    /**
     * The timestamp of the transaction.
     */
    timestamp: string;
};

