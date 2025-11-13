/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Payments for the contract.
 */
export type ContractPayment = {
    /**
     * The amount of credits received up front for accepting the contract.
     */
    onAccepted: number;
    /**
     * The amount of credits received when the contract is fulfilled.
     */
    onFulfilled: number;
};

