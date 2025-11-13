/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SystemFaction } from './SystemFaction';
import type { SystemType } from './SystemType';
import type { SystemWaypoint } from './SystemWaypoint';
/**
 * System details.
 */
export type System = {
    /**
     * The constellation that the system is part of.
     */
    constellation?: string;
    /**
     * The symbol of the system.
     */
    symbol: string;
    /**
     * The symbol of the sector.
     */
    sectorSymbol: string;
    type: SystemType;
    /**
     * Relative position of the system in the sector in the x axis.
     */
    'x': number;
    /**
     * Relative position of the system in the sector in the y axis.
     */
    'y': number;
    /**
     * Waypoints in this system.
     */
    waypoints: Array<SystemWaypoint>;
    /**
     * Factions that control this system.
     */
    factions: Array<SystemFaction>;
    /**
     * The name of the system.
     */
    name?: string;
};

