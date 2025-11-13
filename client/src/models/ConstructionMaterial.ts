/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TradeSymbol } from './TradeSymbol';
/**
 * The details of the required construction materials for a given waypoint under construction.
 */
export type ConstructionMaterial = {
    tradeSymbol: TradeSymbol;
    /**
     * The number of units required.
     */
    required: number;
    /**
     * The number of units fulfilled toward the required amount.
     */
    fulfilled: number;
};

