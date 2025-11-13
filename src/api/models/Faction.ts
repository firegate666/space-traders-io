/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FactionSymbol } from './FactionSymbol';
import type { FactionTrait } from './FactionTrait';
/**
 * Faction details.
 */
export type Faction = {
    symbol: FactionSymbol;
    /**
     * Name of the faction.
     */
    name: string;
    /**
     * Description of the faction.
     */
    description: string;
    /**
     * The waypoint in which the faction's HQ is located in.
     */
    headquarters?: string;
    /**
     * List of traits that define this faction.
     */
    traits: Array<FactionTrait>;
    /**
     * Whether or not the faction is currently recruiting new agents.
     */
    isRecruiting: boolean;
};

