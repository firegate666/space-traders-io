/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipRequirements } from './ShipRequirements';
/**
 * A module can be installed in a ship and provides a set of capabilities such as storage space or quarters for crew. Module installations are permanent.
 */
export type ShipModule = {
    /**
     * The symbol of the module.
     */
    symbol: ShipModule.SymbolEnum;
    /**
     * Name of this module.
     */
    name: string;
    /**
     * Description of this module.
     */
    description: string;
    /**
     * Modules that provide capacity, such as cargo hold or crew quarters will show this value to denote how much of a bonus the module grants.
     */
    capacity?: number;
    /**
     * Modules that have a range will such as a sensor array show this value to denote how far can the module reach with its capabilities.
     */
    range?: number;
    requirements: ShipRequirements;
};
export namespace ShipModule {
    /**
     * The symbol of the module.
     */
    export enum SymbolEnum {
        MODULE_MINERAL_PROCESSOR_I = 'MODULE_MINERAL_PROCESSOR_I',
        MODULE_GAS_PROCESSOR_I = 'MODULE_GAS_PROCESSOR_I',
        MODULE_CARGO_HOLD_I = 'MODULE_CARGO_HOLD_I',
        MODULE_CARGO_HOLD_II = 'MODULE_CARGO_HOLD_II',
        MODULE_CARGO_HOLD_III = 'MODULE_CARGO_HOLD_III',
        MODULE_CREW_QUARTERS_I = 'MODULE_CREW_QUARTERS_I',
        MODULE_ENVOY_QUARTERS_I = 'MODULE_ENVOY_QUARTERS_I',
        MODULE_PASSENGER_CABIN_I = 'MODULE_PASSENGER_CABIN_I',
        MODULE_MICRO_REFINERY_I = 'MODULE_MICRO_REFINERY_I',
        MODULE_ORE_REFINERY_I = 'MODULE_ORE_REFINERY_I',
        MODULE_FUEL_REFINERY_I = 'MODULE_FUEL_REFINERY_I',
        MODULE_SCIENCE_LAB_I = 'MODULE_SCIENCE_LAB_I',
        MODULE_JUMP_DRIVE_I = 'MODULE_JUMP_DRIVE_I',
        MODULE_JUMP_DRIVE_II = 'MODULE_JUMP_DRIVE_II',
        MODULE_JUMP_DRIVE_III = 'MODULE_JUMP_DRIVE_III',
        MODULE_WARP_DRIVE_I = 'MODULE_WARP_DRIVE_I',
        MODULE_WARP_DRIVE_II = 'MODULE_WARP_DRIVE_II',
        MODULE_WARP_DRIVE_III = 'MODULE_WARP_DRIVE_III',
        MODULE_SHIELD_GENERATOR_I = 'MODULE_SHIELD_GENERATOR_I',
        MODULE_SHIELD_GENERATOR_II = 'MODULE_SHIELD_GENERATOR_II',
    }
}

