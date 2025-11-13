/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SystemType } from './SystemType';
/**
 * Details of a system was that scanned.
 */
export type ScannedSystem = {
    /**
     * Symbol of the system.
     */
    symbol: string;
    /**
     * Symbol of the system's sector.
     */
    sectorSymbol: string;
    type: SystemType;
    /**
     * Position in the universe in the x axis.
     */
    'x': number;
    /**
     * Position in the universe in the y axis.
     */
    'y': number;
    /**
     * The system's distance from the scanning ship.
     */
    distance: number;
};

