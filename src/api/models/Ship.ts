/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cooldown } from './Cooldown';
import type { ShipCargo } from './ShipCargo';
import type { ShipCrew } from './ShipCrew';
import type { ShipEngine } from './ShipEngine';
import type { ShipFrame } from './ShipFrame';
import type { ShipFuel } from './ShipFuel';
import type { ShipModule } from './ShipModule';
import type { ShipMount } from './ShipMount';
import type { ShipNav } from './ShipNav';
import type { ShipReactor } from './ShipReactor';
import type { ShipRegistration } from './ShipRegistration';
/**
 * Ship details.
 */
export type Ship = {
    /**
     * The globally unique identifier of the ship in the following format: `[AGENT_SYMBOL]-[HEX_ID]`
     */
    symbol: string;
    registration: ShipRegistration;
    nav: ShipNav;
    crew: ShipCrew;
    frame: ShipFrame;
    reactor: ShipReactor;
    engine: ShipEngine;
    /**
     * Modules installed in this ship.
     */
    modules: Array<ShipModule>;
    /**
     * Mounts installed in this ship.
     */
    mounts: Array<ShipMount>;
    cargo: ShipCargo;
    fuel: ShipFuel;
    cooldown: Cooldown;
};

