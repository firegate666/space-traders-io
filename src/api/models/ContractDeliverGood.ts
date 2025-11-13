/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The details of a delivery contract. Includes the type of good, units needed, and the destination.
 */
export type ContractDeliverGood = {
    /**
     * The symbol of the trade good to deliver.
     */
    tradeSymbol: string;
    /**
     * The destination where goods need to be delivered.
     */
    destinationSymbol: string;
    /**
     * The number of units that need to be delivered on this contract.
     */
    unitsRequired: number;
    /**
     * The number of units fulfilled on this contract.
     */
    unitsFulfilled: number;
};

