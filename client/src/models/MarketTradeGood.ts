/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivityLevel } from './ActivityLevel';
import type { SupplyLevel } from './SupplyLevel';
import type { TradeSymbol } from './TradeSymbol';
export type MarketTradeGood = {
    symbol: TradeSymbol;
    /**
     * The type of trade good (export, import, or exchange).
     */
    type: MarketTradeGood.type;
    /**
     * This is the maximum number of units that can be purchased or sold at this market in a single trade for this good. Trade volume also gives an indication of price volatility. A market with a low trade volume will have large price swings, while high trade volume will be more resilient to price changes.
     */
    tradeVolume: number;
    supply: SupplyLevel;
    activity?: ActivityLevel;
    /**
     * The price at which this good can be purchased from the market.
     */
    purchasePrice: number;
    /**
     * The price at which this good can be sold to the market.
     */
    sellPrice: number;
};
export namespace MarketTradeGood {
    /**
     * The type of trade good (export, import, or exchange).
     */
    export enum type {
        EXPORT = 'EXPORT',
        IMPORT = 'IMPORT',
        EXCHANGE = 'EXCHANGE',
    }
}

