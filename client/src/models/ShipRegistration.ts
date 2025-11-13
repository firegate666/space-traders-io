/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipRole } from './ShipRole';
/**
 * The public registration information of the ship
 */
export type ShipRegistration = {
    /**
     * The agent's registered name of the ship
     */
    name: string;
    /**
     * The symbol of the faction the ship is registered with
     */
    factionSymbol: string;
    role: ShipRole;
};

