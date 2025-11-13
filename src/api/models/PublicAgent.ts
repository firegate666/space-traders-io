/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Public agent details.
 */
export type PublicAgent = {
    /**
     * Symbol of the agent.
     */
    symbol: string;
    /**
     * The headquarters of the agent.
     */
    headquarters: string;
    /**
     * The number of credits the agent has available. Credits can be negative if funds have been overdrawn.
     */
    credits: number;
    /**
     * The faction the agent started with.
     */
    startingFaction: string;
    /**
     * How many ships are owned by the agent.
     */
    shipCount: number;
};

