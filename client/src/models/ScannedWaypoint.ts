/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Chart } from './Chart';
import type { SystemSymbol } from './SystemSymbol';
import type { WaypointFaction } from './WaypointFaction';
import type { WaypointOrbital } from './WaypointOrbital';
import type { WaypointSymbol } from './WaypointSymbol';
import type { WaypointTrait } from './WaypointTrait';
import type { WaypointType } from './WaypointType';
/**
 * A waypoint that was scanned by a ship.
 */
export type ScannedWaypoint = {
    symbol: WaypointSymbol;
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
    /**
     * List of waypoints that orbit this waypoint.
     */
    orbitals: Array<WaypointOrbital>;
    faction?: WaypointFaction;
    /**
     * The traits of the waypoint.
     */
    traits: Array<WaypointTrait>;
    chart?: Chart;
};

