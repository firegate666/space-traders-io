/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipNav } from './ShipNav';
import type { ShipRegistration } from './ShipRegistration';
/**
 * The ship that was scanned. Details include information about the ship that could be detected by the scanner.
 */
export type ScannedShip = {
    /**
     * The globally unique identifier of the ship.
     */
    symbol: string;
    registration: ShipRegistration;
    nav: ShipNav;
    /**
     * The frame of the ship.
     */
    frame?: {
        /**
         * The symbol of the frame.
         */
        symbol: string;
    };
    /**
     * The reactor of the ship.
     */
    reactor?: {
        /**
         * The symbol of the reactor.
         */
        symbol: string;
    };
    /**
     * The engine of the ship.
     */
    engine: {
        /**
         * The symbol of the engine.
         */
        symbol: string;
    };
    /**
     * List of mounts installed in the ship.
     */
    mounts?: Array<{
        /**
         * The symbol of the mount.
         */
        symbol: string;
    }>;
};

