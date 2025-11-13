/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TradeSymbol } from './TradeSymbol';
/**
 * A yield from the extraction operation.
 */
export type ExtractionYield = {
    symbol: TradeSymbol;
    /**
     * The number of units extracted that were placed into the ship's cargo hold.
     */
    units: number;
};

