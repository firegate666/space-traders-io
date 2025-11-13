/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConstructionMaterial } from './ConstructionMaterial';
/**
 * The construction details of a waypoint.
 */
export type Construction = {
    /**
     * The symbol of the waypoint.
     */
    symbol: string;
    /**
     * The materials required to construct the waypoint.
     */
    materials: Array<ConstructionMaterial>;
    /**
     * Whether the waypoint has been constructed.
     */
    isComplete: boolean;
};

