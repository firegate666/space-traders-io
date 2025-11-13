/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipNavRouteWaypoint } from './ShipNavRouteWaypoint';
/**
 * The routing information for the ship's most recent transit or current location.
 */
export type ShipNavRoute = {
    destination: ShipNavRouteWaypoint;
    origin: ShipNavRouteWaypoint;
    /**
     * The date time of the ship's departure.
     */
    departureTime: string;
    /**
     * The date time of the ship's arrival. If the ship is in-transit, this is the expected time of arrival.
     */
    arrival: string;
};

