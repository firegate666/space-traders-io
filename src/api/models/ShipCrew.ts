/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The ship's crew service and maintain the ship's systems and equipment.
 */
export type ShipCrew = {
    /**
     * The current number of crew members on the ship.
     */
    current: number;
    /**
     * The minimum number of crew members required to maintain the ship.
     */
    required: number;
    /**
     * The maximum number of crew members the ship can support.
     */
    capacity: number;
    /**
     * The rotation of crew shifts. A stricter shift improves the ship's performance. A more relaxed shift improves the crew's morale.
     */
    rotation: ShipCrew.rotation;
    /**
     * A rough measure of the crew's morale. A higher morale means the crew is happier and more productive. A lower morale means the ship is more prone to accidents.
     */
    morale: number;
    /**
     * The amount of credits per crew member paid per hour. Wages are paid when a ship docks at a civilized waypoint.
     */
    wages: number;
};
export namespace ShipCrew {
    /**
     * The rotation of crew shifts. A stricter shift improves the ship's performance. A more relaxed shift improves the crew's morale.
     */
    export enum rotation {
        STRICT = 'STRICT',
        RELAXED = 'RELAXED',
    }
}

