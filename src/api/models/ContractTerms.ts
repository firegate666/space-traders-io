/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContractDeliverGood } from './ContractDeliverGood';
import type { ContractPayment } from './ContractPayment';
/**
 * The terms to fulfill the contract.
 */
export type ContractTerms = {
    /**
     * The deadline for the contract.
     */
    deadline: string;
    payment: ContractPayment;
    /**
     * The cargo that needs to be delivered to fulfill the contract.
     */
    deliver?: Array<ContractDeliverGood>;
};

