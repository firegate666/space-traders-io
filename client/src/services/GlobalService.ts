/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GlobalService {
    /**
     * Server status
     * Return the status of the game server.
     * This also includes a few global elements, such as announcements, server reset dates and leaderboards.
     * @returns any Fetched status successfully.
     * @throws ApiError
     */
    public static getStatus(): CancelablePromise<{
        /**
         * The current status of the game server.
         */
        status: string;
        /**
         * The current version of the API.
         */
        version: string;
        /**
         * The date when the game server was last reset.
         */
        resetDate: string;
        description: string;
        stats: {
            /**
             * Total number of accounts registered on the game server.
             */
            accounts?: number;
            /**
             * Number of registered agents in the game.
             */
            agents: number;
            /**
             * Total number of ships in the game.
             */
            ships: number;
            /**
             * Total number of systems in the game.
             */
            systems: number;
            /**
             * Total number of waypoints in the game.
             */
            waypoints: number;
        };
        health: {
            /**
             * The date/time when the market was last updated.
             */
            lastMarketUpdate?: string;
        };
        leaderboards: {
            /**
             * Top agents with the most credits.
             */
            mostCredits: Array<{
                /**
                 * Symbol of the agent.
                 */
                agentSymbol: string;
                /**
                 * Amount of credits.
                 */
                credits: number;
            }>;
            /**
             * Top agents with the most charted submitted.
             */
            mostSubmittedCharts: Array<{
                /**
                 * Symbol of the agent.
                 */
                agentSymbol: string;
                /**
                 * Amount of charts done by the agent.
                 */
                chartCount: number;
            }>;
        };
        serverResets: {
            /**
             * The date and time when the game server will reset.
             */
            next: string;
            /**
             * How often we intend to reset the game server.
             */
            frequency: string;
        };
        announcements: Array<{
            title: string;
            body: string;
        }>;
        links: Array<{
            name: string;
            url: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Error code list
     * Return a list of all possible error codes thrown by the game server.
     * @returns any Fetched error codes successfully.
     * @throws ApiError
     */
    public static getErrorCodes(): CancelablePromise<{
        errorCodes: Array<{
            code: number;
            name: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/error-codes',
        });
    }
}
