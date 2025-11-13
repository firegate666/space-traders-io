/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TradeSymbol } from './TradeSymbol';
/**
 * A good that can be traded for other goods or currency.
 */
export type TradeGood = {
    symbol: TradeSymbol;
    /**
     * The name of the good.
     */
    name: string;
    /**
     * The description of the good.
     */
    description: string;
};

