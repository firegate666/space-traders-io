/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Details of the ship's fuel tanks including how much fuel was consumed during the last transit or action.
 */
export type ShipFuel = {
    /**
     * The current amount of fuel in the ship's tanks.
     */
    current: number;
    /**
     * The maximum amount of fuel the ship's tanks can hold.
     */
    capacity: number;
    /**
     * An object that only shows up when an action has consumed fuel in the process. Shows the fuel consumption data.
     */
    consumed?: {
        /**
         * The amount of fuel consumed by the most recent transit or action.
         */
        amount: number;
        /**
         * The time at which the fuel was consumed.
         */
        timestamp: string;
    };
};

