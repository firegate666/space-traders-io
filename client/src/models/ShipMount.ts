/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipRequirements } from './ShipRequirements';
/**
 * A mount is installed on the exterier of a ship.
 */
export type ShipMount = {
    /**
     * Symbol of this mount.
     */
    symbol: ShipMount.symbol;
    /**
     * Name of this mount.
     */
    name: string;
    /**
     * Description of this mount.
     */
    description: string;
    /**
     * Mounts that have this value, such as mining lasers, denote how powerful this mount's capabilities are.
     */
    strength?: number;
    /**
     * Mounts that have this value denote what goods can be produced from using the mount.
     */
    deposits?: Array<'QUARTZ_SAND' | 'SILICON_CRYSTALS' | 'PRECIOUS_STONES' | 'ICE_WATER' | 'AMMONIA_ICE' | 'IRON_ORE' | 'COPPER_ORE' | 'SILVER_ORE' | 'ALUMINUM_ORE' | 'GOLD_ORE' | 'PLATINUM_ORE' | 'DIAMONDS' | 'URANITE_ORE' | 'MERITIUM_ORE'>;
    requirements: ShipRequirements;
};
export namespace ShipMount {
    /**
     * Symbol of this mount.
     */
    export enum symbol {
        MOUNT_GAS_SIPHON_I = 'MOUNT_GAS_SIPHON_I',
        MOUNT_GAS_SIPHON_II = 'MOUNT_GAS_SIPHON_II',
        MOUNT_GAS_SIPHON_III = 'MOUNT_GAS_SIPHON_III',
        MOUNT_SURVEYOR_I = 'MOUNT_SURVEYOR_I',
        MOUNT_SURVEYOR_II = 'MOUNT_SURVEYOR_II',
        MOUNT_SURVEYOR_III = 'MOUNT_SURVEYOR_III',
        MOUNT_SENSOR_ARRAY_I = 'MOUNT_SENSOR_ARRAY_I',
        MOUNT_SENSOR_ARRAY_II = 'MOUNT_SENSOR_ARRAY_II',
        MOUNT_SENSOR_ARRAY_III = 'MOUNT_SENSOR_ARRAY_III',
        MOUNT_MINING_LASER_I = 'MOUNT_MINING_LASER_I',
        MOUNT_MINING_LASER_II = 'MOUNT_MINING_LASER_II',
        MOUNT_MINING_LASER_III = 'MOUNT_MINING_LASER_III',
        MOUNT_LASER_CANNON_I = 'MOUNT_LASER_CANNON_I',
        MOUNT_MISSILE_LAUNCHER_I = 'MOUNT_MISSILE_LAUNCHER_I',
        MOUNT_TURRET_I = 'MOUNT_TURRET_I',
    }
}

