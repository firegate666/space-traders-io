/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContractTerms } from './ContractTerms';
/**
 * Contract details.
 */
export type Contract = {
    /**
     * ID of the contract.
     */
    id: string;
    /**
     * The symbol of the faction that this contract is for.
     */
    factionSymbol: string;
    /**
     * Type of contract.
     */
    type: Contract.type;
    terms: ContractTerms;
    /**
     * Whether the contract has been accepted by the agent
     */
    accepted: boolean;
    /**
     * Whether the contract has been fulfilled
     */
    fulfilled: boolean;
    /**
     * Deprecated in favor of deadlineToAccept
     * @deprecated
     */
    expiration: string;
    /**
     * The time at which the contract is no longer available to be accepted
     */
    deadlineToAccept?: string;
};
export namespace Contract {
    /**
     * Type of contract.
     */
    export enum type {
        PROCUREMENT = 'PROCUREMENT',
        TRANSPORT = 'TRANSPORT',
        SHUTTLE = 'SHUTTLE',
    }
}

