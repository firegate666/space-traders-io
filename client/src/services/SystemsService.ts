/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Construction } from '../models/Construction';
import type { JumpGate } from '../models/JumpGate';
import type { Market } from '../models/Market';
import type { Meta } from '../models/Meta';
import type { ShipCargo } from '../models/ShipCargo';
import type { Shipyard } from '../models/Shipyard';
import type { System } from '../models/System';
import type { TradeSymbol } from '../models/TradeSymbol';
import type { Waypoint } from '../models/Waypoint';
import type { WaypointTraitSymbol } from '../models/WaypointTraitSymbol';
import type { WaypointType } from '../models/WaypointType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SystemsService {
    /**
     * List Systems
     * Return a paginated list of all systems.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Successfully listed systems.
     * @throws ApiError
     */
    public static getSystems(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<System>;
        meta: Meta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/systems',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Get System
     * Get the details of a system. Requires the system to have been visited or charted.
     * @param systemSymbol
     * @returns any Successfully fetched the system.
     * @throws ApiError
     */
    public static getSystem(
        systemSymbol: string,
    ): CancelablePromise<{
        data: System;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/systems/{systemSymbol}',
            path: {
                'systemSymbol': systemSymbol,
            },
        });
    }
    /**
     * List Waypoints in System
     * Return a paginated list of all of the waypoints for a given system.
     *
     * If a waypoint is uncharted, it will return the `Uncharted` trait instead of its actual traits.
     * @param systemSymbol
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @param type Filter waypoints by type.
     * @param traits Filter waypoints by one or more traits.
     * @returns any Successfully listed waypoints.
     * @throws ApiError
     */
    public static getSystemWaypoints(
        systemSymbol: string,
        page: number = 1,
        limit: number = 10,
        type?: WaypointType,
        traits?: (Array<WaypointTraitSymbol> | WaypointTraitSymbol),
    ): CancelablePromise<{
        data: Array<Waypoint>;
        meta: Meta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints',
            path: {
                'systemSymbol': systemSymbol,
            },
            query: {
                'page': page,
                'limit': limit,
                'type': type,
                'traits': traits,
            },
        });
    }
    /**
     * Get Waypoint
     * View the details of a waypoint.
     *
     * If the waypoint is uncharted, it will return the 'Uncharted' trait instead of its actual traits.
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @returns any Successfully fetched waypoint details.
     * @throws ApiError
     */
    public static getWaypoint(
        systemSymbol: string,
        waypointSymbol: string,
    ): CancelablePromise<{
        data: Waypoint;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
        });
    }
    /**
     * Get Construction Site
     * Get construction details for a waypoint. Requires a waypoint with a property of `isUnderConstruction` to be true.
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @returns any Successfully fetched construction site.
     * @throws ApiError
     */
    public static getConstruction(
        systemSymbol: string,
        waypointSymbol: string,
    ): CancelablePromise<{
        data: Construction;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}/construction',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
        });
    }
    /**
     * Supply Construction Site
     * Supply a construction site with the specified good. Requires a waypoint with a property of `isUnderConstruction` to be true.
     *
     * The good must be in your ship's cargo. The good will be removed from your ship's cargo and added to the construction site's materials.
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @param requestBody
     * @returns any Successfully supplied construction site.
     * @throws ApiError
     */
    public static supplyConstruction(
        systemSymbol: string,
        waypointSymbol: string,
        requestBody: {
            /**
             * The symbol of the ship supplying construction materials.
             */
            shipSymbol: string;
            /**
             * The symbol of the good to supply.
             */
            tradeSymbol: TradeSymbol;
            /**
             * Amount of units to supply.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            construction: Construction;
            cargo: ShipCargo;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}/construction/supply',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Market
     * Retrieve imports, exports and exchange data from a marketplace. Requires a waypoint that has the `Marketplace` trait to use.
     *
     * Send a ship to the waypoint to access trade good prices and recent transactions. Refer to the [Market Overview page](https://docs.spacetraders.io/game-concepts/markets) to gain better a understanding of the market in the game.
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @returns any Successfully fetched the market.
     * @throws ApiError
     */
    public static getMarket(
        systemSymbol: string,
        waypointSymbol: string,
    ): CancelablePromise<{
        data: Market;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}/market',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
        });
    }
    /**
     * Get Jump Gate
     * Get jump gate details for a waypoint. Requires a waypoint of type `JUMP_GATE` to use.
     *
     * Waypoints connected to this jump gate can be found by querying the waypoints in the system.
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @returns any Jump gate details retrieved successfully.
     * @throws ApiError
     */
    public static getJumpGate(
        systemSymbol: string,
        waypointSymbol: string,
    ): CancelablePromise<{
        data: JumpGate;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}/jump-gate',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
        });
    }
    /**
     * Get Shipyard
     * Get the shipyard for a waypoint. Requires a waypoint that has the `Shipyard` trait to use. Send a ship to the waypoint to access data on ships that are currently available for purchase and recent transactions.
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @returns any Successfully fetched the shipyard.
     * @throws ApiError
     */
    public static getShipyard(
        systemSymbol: string,
        waypointSymbol: string,
    ): CancelablePromise<{
        data: Shipyard;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}/shipyard',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
        });
    }
}
