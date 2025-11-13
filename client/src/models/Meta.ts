/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Meta details for pagination.
 */
export type Meta = {
    /**
     * Shows the total amount of items of this kind that exist.
     */
    total: number;
    /**
     * A page denotes an amount of items, offset from the first item. Each page holds an amount of items equal to the `limit`.
     */
    page: number;
    /**
     * The amount of items in each page. Limits how many items can be fetched at once.
     */
    limit: number;
};

