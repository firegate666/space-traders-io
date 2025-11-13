/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TradeSymbol } from './TradeSymbol';
/**
 * A yield from the siphon operation.
 */
export type SiphonYield = {
    symbol: TradeSymbol;
    /**
     * The number of units siphoned that were placed into the ship's cargo hold.
     */
    units: number;
};

