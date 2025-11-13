/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipCargoItem } from './ShipCargoItem';
/**
 * Ship cargo details.
 */
export type ShipCargo = {
    /**
     * The max number of items that can be stored in the cargo hold.
     */
    capacity: number;
    /**
     * The number of items currently stored in the cargo hold.
     */
    units: number;
    /**
     * The items currently in the cargo hold.
     */
    inventory: Array<ShipCargoItem>;
};

