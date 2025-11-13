/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DataService {
    /**
     * Describes trade relationships
     * Describes which import and exports map to each other.
     * @returns any Successfully retrieved the supply chain information
     * @throws ApiError
     */
    public static getSupplyChain(): CancelablePromise<{
        data: {
            exportToImportMap: Record<string, Array<string>>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/market/supply-chain',
        });
    }
    /**
     * Subscribe to events
     * Subscribe to departure events for a system.
     *
     * ## WebSocket Events
     *
     * The following events are available:
     *
     * - `systems.{systemSymbol}.departure`: A ship has departed from the system.
     *
     * ## Subscribe using a message with the following format:
     *
     * ```json
     * {
         * "action": "subscribe",
         * "systemSymbol": "{systemSymbol}"
         * }
         * ```
         *
         * ## Unsubscribe using a message with the following format:
         *
         * ```json
         * {
             * "action": "unsubscribe",
             * "systemSymbol": "{systemSymbol}"
             * }
             * ```
             * @returns any Default Response
             * @throws ApiError
             */
            public static websocketDepartureEvents(): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/my/socket.io',
                });
            }
        }
