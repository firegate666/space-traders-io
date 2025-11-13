/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Faction } from '../models/Faction';
import type { Meta } from '../models/Meta';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FactionsService {
    /**
     * List factions
     * Return a paginated list of all the factions in the game.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Successfully fetched factions.
     * @throws ApiError
     */
    public static getFactions(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<Faction>;
        meta: Meta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/factions',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Faction details
     * View the details of a faction.
     * @param factionSymbol The faction symbol
     * @returns any Default Response
     * @throws ApiError
     */
    public static getFaction(
        factionSymbol: string,
    ): CancelablePromise<{
        data: Faction;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/factions/{factionSymbol}',
            path: {
                'factionSymbol': factionSymbol,
            },
        });
    }
    /**
     * Get My Factions
     * Retrieve factions with which the agent has reputation.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Default Response
     * @throws ApiError
     */
    public static getMyFactions(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<{
            symbol: string;
            reputation: number;
        }>;
        meta: Meta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/factions',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
}
