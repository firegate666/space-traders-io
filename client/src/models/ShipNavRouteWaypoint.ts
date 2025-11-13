/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SystemSymbol } from './SystemSymbol';
import type { WaypointType } from './WaypointType';
/**
 * The destination or departure of a ships nav route.
 */
export type ShipNavRouteWaypoint = {
    /**
     * The symbol of the waypoint.
     */
    symbol: string;
    type: WaypointType;
    systemSymbol: SystemSymbol;
    /**
     * Position in the universe in the x axis.
     */
    'x': number;
    /**
     * Position in the universe in the y axis.
     */
    'y': number;
};

