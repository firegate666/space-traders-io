/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { Contract } from '../models/Contract';
import type { Faction } from '../models/Faction';
import type { FactionSymbol } from '../models/FactionSymbol';
import type { Ship } from '../models/Ship';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountsService {
    /**
     * Get Account
     * Fetch your account details.
     * @returns any Default Response
     * @throws ApiError
     */
    public static getMyAccount(): CancelablePromise<{
        data: {
            account: {
                id: string;
                email: string | null;
                token?: string;
                createdAt: string;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/account',
        });
    }
    /**
     * Register New Agent
     * Creates a new agent and ties it to an account.
     * The agent symbol must consist of a 3-14 character string, and will be used to represent your agent. This symbol will prefix the symbol of every ship you own. Agent symbols will be cast to all uppercase characters.
     *
     * This new agent will be tied to a starting faction of your choice, which determines your starting location, and will be granted an authorization token, a contract with their starting faction, a command ship that can fly across space with advanced capabilities, a small probe ship that can be used for reconnaissance, and 175,000 credits.
     *
     * > #### Keep your token safe and secure
     * >
     * > Keep careful track of where you store your token. You can generate a new token from our account dashboard, but if someone else gains access to your token they will be able to use it to make API requests on your behalf until the end of the reset.
     *
     * If you are new to SpaceTraders, It is recommended to register with the COSMIC faction, a faction that is well connected to the rest of the universe. After registering, you should try our interactive [quickstart guide](https://docs.spacetraders.io/quickstart/new-game) which will walk you through a few basic API requests in just a few minutes.
     * @param requestBody
     * @returns any Successfully registered.
     * @throws ApiError
     */
    public static register(
        requestBody: {
            /**
             * Your desired agent symbol. This will be a unique name used to represent your agent, and will be the prefix for your ships.
             */
            symbol: string;
            faction: FactionSymbol;
        },
    ): CancelablePromise<{
        data: {
            /**
             * A Bearer token for accessing secured API endpoints.
             */
            token: string;
            agent: Agent;
            faction: Faction;
            contract: Contract;
            ships: Array<Ship>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
