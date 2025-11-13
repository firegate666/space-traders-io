/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { Contract } from '../models/Contract';
import type { Meta } from '../models/Meta';
import type { ShipCargo } from '../models/ShipCargo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ContractsService {
    /**
     * List Contracts
     * Return a paginated list of all your contracts.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Successfully listed contracts.
     * @throws ApiError
     */
    public static getContracts(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<Contract>;
        meta: Meta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/contracts',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Get Contract
     * Get the details of a specific contract.
     * @param contractId The contract ID to accept.
     * @returns any Successfully fetched contract.
     * @throws ApiError
     */
    public static getContract(
        contractId: string,
    ): CancelablePromise<{
        data: Contract;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/contracts/{contractId}',
            path: {
                'contractId': contractId,
            },
        });
    }
    /**
     * Accept Contract
     * Accept a contract by ID.
     *
     * You can only accept contracts that were offered to you, were not accepted yet, and whose deadlines has not passed yet.
     * @param contractId The contract ID to accept.
     * @returns any Successfully accepted contract.
     * @throws ApiError
     */
    public static acceptContract(
        contractId: string,
    ): CancelablePromise<{
        data: {
            contract: Contract;
            agent: Agent;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/contracts/{contractId}/accept',
            path: {
                'contractId': contractId,
            },
        });
    }
    /**
     * Fulfill Contract
     * Fulfill a contract. Can only be used on contracts that have all of their delivery terms fulfilled.
     * @param contractId The ID of the contract to fulfill.
     * @returns any Successfully fulfilled a contract.
     * @throws ApiError
     */
    public static fulfillContract(
        contractId: string,
    ): CancelablePromise<{
        data: {
            contract: Contract;
            agent: Agent;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/contracts/{contractId}/fulfill',
            path: {
                'contractId': contractId,
            },
        });
    }
    /**
     * Deliver Cargo to Contract
     * Deliver cargo to a contract.
     *
     * In order to use this API, a ship must be at the delivery location (denoted in the delivery terms as `destinationSymbol` of a contract) and must have a number of units of a good required by this contract in its cargo.
     *
     * Cargo that was delivered will be removed from the ship's cargo.
     * @param contractId The ID of the contract.
     * @param requestBody
     * @returns any Successfully delivered cargo to contract.
     * @throws ApiError
     */
    public static deliverContract(
        contractId: string,
        requestBody: {
            /**
             * Symbol of a ship located in the destination to deliver a contract and that has a good to deliver in its cargo.
             */
            shipSymbol: string;
            /**
             * The symbol of the good to deliver.
             */
            tradeSymbol: string;
            /**
             * Amount of units to deliver.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            contract: Contract;
            cargo: ShipCargo;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/contracts/{contractId}/deliver',
            path: {
                'contractId': contractId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Negotiate Contract
     * Negotiate a new contract with the HQ.
     *
     * In order to negotiate a new contract, an agent must not have ongoing or offered contracts over the allowed maximum amount. Currently the maximum contracts an agent can have at a time is 1.
     *
     * Once a contract is negotiated, it is added to the list of contracts offered to the agent, which the agent can then accept.
     *
     * The ship must be present at any waypoint with a faction present to negotiate a contract with that faction.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully negotiated a new contract.
     * @throws ApiError
     */
    public static negotiateContract(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            contract: Contract;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/negotiate/contract',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
}
