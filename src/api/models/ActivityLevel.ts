/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The activity level of a trade good. If the good is an import, this represents how strong consumption is. If the good is an export, this represents how strong the production is for the good. When activity is strong, consumption or production is near maximum capacity. When activity is weak, consumption or production is near minimum capacity.
 */
export enum ActivityLevel {
    WEAK = 'WEAK',
    GROWING = 'GROWING',
    STRONG = 'STRONG',
    RESTRICTED = 'RESTRICTED',
}
