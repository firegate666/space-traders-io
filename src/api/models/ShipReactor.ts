/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipComponentCondition } from './ShipComponentCondition';
import type { ShipComponentIntegrity } from './ShipComponentIntegrity';
import type { ShipComponentQuality } from './ShipComponentQuality';
import type { ShipRequirements } from './ShipRequirements';
/**
 * The reactor of the ship. The reactor is responsible for powering the ship's systems and weapons.
 */
export type ShipReactor = {
    /**
     * Symbol of the reactor.
     */
    symbol: ShipReactor.SymbolEnum;
    /**
     * Name of the reactor.
     */
    name: string;
    condition: ShipComponentCondition;
    integrity: ShipComponentIntegrity;
    /**
     * Description of the reactor.
     */
    description: string;
    /**
     * The amount of power provided by this reactor. The more power a reactor provides to the ship, the lower the cooldown it gets when using a module or mount that taxes the ship's power.
     */
    powerOutput: number;
    requirements: ShipRequirements;
    quality: ShipComponentQuality;
};
export namespace ShipReactor {
    /**
     * Symbol of the reactor.
     */
    export enum SymbolEnum {
        REACTOR_SOLAR_I = 'REACTOR_SOLAR_I',
        REACTOR_FUSION_I = 'REACTOR_FUSION_I',
        REACTOR_FISSION_I = 'REACTOR_FISSION_I',
        REACTOR_CHEMICAL_I = 'REACTOR_CHEMICAL_I',
        REACTOR_ANTIMATTER_I = 'REACTOR_ANTIMATTER_I',
    }
}

