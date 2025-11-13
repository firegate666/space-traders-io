/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TradeSymbol } from './TradeSymbol';
/**
 * The type of cargo item and the number of units.
 */
export type ShipCargoItem = {
    symbol: TradeSymbol;
    /**
     * The name of the cargo item type.
     */
    name: string;
    /**
     * The description of the cargo item type.
     */
    description: string;
    /**
     * The number of units of the cargo item.
     */
    units: number;
};

