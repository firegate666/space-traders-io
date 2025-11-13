/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipComponentCondition } from './ShipComponentCondition';
import type { ShipComponentIntegrity } from './ShipComponentIntegrity';
import type { ShipComponentQuality } from './ShipComponentQuality';
import type { ShipRequirements } from './ShipRequirements';
/**
 * The engine determines how quickly a ship travels between waypoints.
 */
export type ShipEngine = {
    /**
     * The symbol of the engine.
     */
    symbol: ShipEngine.SymbolEnum;
    /**
     * The name of the engine.
     */
    name: string;
    condition: ShipComponentCondition;
    integrity: ShipComponentIntegrity;
    /**
     * The description of the engine.
     */
    description: string;
    /**
     * The speed stat of this engine. The higher the speed, the faster a ship can travel from one point to another. Reduces the time of arrival when navigating the ship.
     */
    speed: number;
    requirements: ShipRequirements;
    quality: ShipComponentQuality;
};
export namespace ShipEngine {
    /**
     * The symbol of the engine.
     */
    export enum SymbolEnum {
        ENGINE_IMPULSE_DRIVE_I = 'ENGINE_IMPULSE_DRIVE_I',
        ENGINE_ION_DRIVE_I = 'ENGINE_ION_DRIVE_I',
        ENGINE_ION_DRIVE_II = 'ENGINE_ION_DRIVE_II',
        ENGINE_HYPER_DRIVE_I = 'ENGINE_HYPER_DRIVE_I',
    }
}

