/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WaypointOrbital } from './WaypointOrbital';
import type { WaypointSymbol } from './WaypointSymbol';
import type { WaypointType } from './WaypointType';
/**
 * Waypoint details.
 */
export type SystemWaypoint = {
    symbol: WaypointSymbol;
    type: WaypointType;
    /**
     * Relative position of the waypoint on the system's x axis. This is not an absolute position in the universe.
     */
    'x': number;
    /**
     * Relative position of the waypoint on the system's y axis. This is not an absolute position in the universe.
     */
    'y': number;
    /**
     * Waypoints that orbit this waypoint.
     */
    orbitals: Array<WaypointOrbital>;
    /**
     * The symbol of the parent waypoint, if this waypoint is in orbit around another waypoint. Otherwise this value is undefined.
     */
    orbits?: string;
};

