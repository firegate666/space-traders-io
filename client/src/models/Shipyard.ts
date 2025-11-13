/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipType } from './ShipType';
import type { ShipyardShip } from './ShipyardShip';
import type { ShipyardTransaction } from './ShipyardTransaction';
/**
 * Shipyard details.
 */
export type Shipyard = {
    /**
     * The symbol of the shipyard. The symbol is the same as the waypoint where the shipyard is located.
     */
    symbol: string;
    /**
     * The list of ship types available for purchase at this shipyard.
     */
    shipTypes: Array<{
        type: ShipType;
    }>;
    /**
     * The list of recent transactions at this shipyard.
     */
    transactions?: Array<ShipyardTransaction>;
    /**
     * The ships that are currently available for purchase at the shipyard.
     */
    ships?: Array<ShipyardShip>;
    /**
     * The fee to modify a ship at this shipyard. This includes installing or removing modules and mounts on a ship. In the case of mounts, the fee is a flat rate per mount. In the case of modules, the fee is per slot the module occupies.
     */
    modificationsFee: number;
};

