/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WaypointSymbol } from './WaypointSymbol';
/**
 * The chart of a system or waypoint, which makes the location visible to other agents.
 */
export type Chart = {
    waypointSymbol: WaypointSymbol;
    /**
     * The agent that submitted the chart for this waypoint.
     */
    submittedBy: string;
    /**
     * The time the chart for this waypoint was submitted.
     */
    submittedOn: string;
};

