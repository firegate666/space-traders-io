/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivityLevel } from './ActivityLevel';
import type { ShipEngine } from './ShipEngine';
import type { ShipFrame } from './ShipFrame';
import type { ShipModule } from './ShipModule';
import type { ShipMount } from './ShipMount';
import type { ShipReactor } from './ShipReactor';
import type { ShipType } from './ShipType';
import type { SupplyLevel } from './SupplyLevel';
/**
 * Ship details available at a shipyard.
 */
export type ShipyardShip = {
    type: ShipType;
    /**
     * Name of the ship.
     */
    name: string;
    /**
     * Description of the ship.
     */
    description: string;
    activity?: ActivityLevel;
    supply: SupplyLevel;
    /**
     * The purchase price of the ship.
     */
    purchasePrice: number;
    frame: ShipFrame;
    reactor: ShipReactor;
    engine: ShipEngine;
    /**
     * Modules installed in this ship.
     */
    modules: Array<ShipModule>;
    /**
     * Mounts installed in this ship.
     */
    mounts: Array<ShipMount>;
    crew: {
        /**
         * The minimum number of crew members required to maintain the ship.
         */
        required: number;
        /**
         * The maximum number of crew members the ship can support.
         */
        capacity: number;
    };
};

