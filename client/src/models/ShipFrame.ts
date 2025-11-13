/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipComponentCondition } from './ShipComponentCondition';
import type { ShipComponentIntegrity } from './ShipComponentIntegrity';
import type { ShipComponentQuality } from './ShipComponentQuality';
import type { ShipRequirements } from './ShipRequirements';
/**
 * The frame of the ship. The frame determines the number of modules and mounting points of the ship, as well as base fuel capacity. As the condition of the frame takes more wear, the ship will become more sluggish and less maneuverable.
 */
export type ShipFrame = {
    /**
     * Symbol of the frame.
     */
    symbol: ShipFrame.symbol;
    /**
     * Name of the frame.
     */
    name: string;
    condition: ShipComponentCondition;
    integrity: ShipComponentIntegrity;
    /**
     * Description of the frame.
     */
    description: string;
    /**
     * The amount of slots that can be dedicated to modules installed in the ship. Each installed module take up a number of slots, and once there are no more slots, no new modules can be installed.
     */
    moduleSlots: number;
    /**
     * The amount of slots that can be dedicated to mounts installed in the ship. Each installed mount takes up a number of points, and once there are no more points remaining, no new mounts can be installed.
     */
    mountingPoints: number;
    /**
     * The maximum amount of fuel that can be stored in this ship. When refueling, the ship will be refueled to this amount.
     */
    fuelCapacity: number;
    requirements: ShipRequirements;
    quality: ShipComponentQuality;
};
export namespace ShipFrame {
    /**
     * Symbol of the frame.
     */
    export enum symbol {
        FRAME_PROBE = 'FRAME_PROBE',
        FRAME_DRONE = 'FRAME_DRONE',
        FRAME_INTERCEPTOR = 'FRAME_INTERCEPTOR',
        FRAME_RACER = 'FRAME_RACER',
        FRAME_FIGHTER = 'FRAME_FIGHTER',
        FRAME_FRIGATE = 'FRAME_FRIGATE',
        FRAME_SHUTTLE = 'FRAME_SHUTTLE',
        FRAME_EXPLORER = 'FRAME_EXPLORER',
        FRAME_MINER = 'FRAME_MINER',
        FRAME_LIGHT_FREIGHTER = 'FRAME_LIGHT_FREIGHTER',
        FRAME_HEAVY_FREIGHTER = 'FRAME_HEAVY_FREIGHTER',
        FRAME_TRANSPORT = 'FRAME_TRANSPORT',
        FRAME_DESTROYER = 'FRAME_DESTROYER',
        FRAME_CRUISER = 'FRAME_CRUISER',
        FRAME_CARRIER = 'FRAME_CARRIER',
        FRAME_BULK_FREIGHTER = 'FRAME_BULK_FREIGHTER',
    }
}

