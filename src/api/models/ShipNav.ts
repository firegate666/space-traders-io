/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipNavFlightMode } from './ShipNavFlightMode';
import type { ShipNavRoute } from './ShipNavRoute';
import type { ShipNavStatus } from './ShipNavStatus';
import type { SystemSymbol } from './SystemSymbol';
import type { WaypointSymbol } from './WaypointSymbol';
/**
 * The navigation information of the ship.
 */
export type ShipNav = {
    systemSymbol: SystemSymbol;
    waypointSymbol: WaypointSymbol;
    route: ShipNavRoute;
    status: ShipNavStatus;
    flightMode: ShipNavFlightMode;
};

