/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MarketTradeGood } from './MarketTradeGood';
import type { MarketTransaction } from './MarketTransaction';
import type { TradeGood } from './TradeGood';
/**
 * Market details.
 */
export type Market = {
    /**
     * The symbol of the market. The symbol is the same as the waypoint where the market is located.
     */
    symbol: string;
    /**
     * The list of goods that are exported from this market.
     */
    exports: Array<TradeGood>;
    /**
     * The list of goods that are sought as imports in this market.
     */
    imports: Array<TradeGood>;
    /**
     * The list of goods that are bought and sold between agents at this market.
     */
    exchange: Array<TradeGood>;
    /**
     * The list of recent transactions at this market. Visible only when a ship is present at the market.
     */
    transactions?: Array<MarketTransaction>;
    /**
     * The list of goods that are traded at this market. Visible only when a ship is present at the market.
     */
    tradeGoods?: Array<MarketTradeGood>;
};

