/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A cooldown is a period of time in which a ship cannot perform certain actions.
 */
export type Cooldown = {
    /**
     * The symbol of the ship that is on cooldown
     */
    shipSymbol: string;
    /**
     * The total duration of the cooldown in seconds
     */
    totalSeconds: number;
    /**
     * The remaining duration of the cooldown in seconds
     */
    remainingSeconds: number;
    /**
     * The date and time when the cooldown expires in ISO 8601 format
     */
    expiration?: string;
};

