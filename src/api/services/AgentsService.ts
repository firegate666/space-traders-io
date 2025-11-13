/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { AgentEvent } from '../models/AgentEvent';
import type { Meta } from '../models/Meta';
import type { PublicAgent } from '../models/PublicAgent';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AgentsService {
    /**
     * List all public agent details.
     * List all public agent details.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Successfully fetched agents details.
     * @throws ApiError
     */
    public static getAgents(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<PublicAgent>;
        meta: Meta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agents',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Get public details for a specific agent.
     * Get public details for a specific agent.
     * @param agentSymbol The agent symbol
     * @returns any Default Response
     * @throws ApiError
     */
    public static getAgent(
        agentSymbol: string,
    ): CancelablePromise<{
        data: PublicAgent;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agents/{agentSymbol}',
            path: {
                'agentSymbol': agentSymbol,
            },
        });
    }
    /**
     * Get Agent
     * Fetch your agent's details.
     * @returns any Successfully fetched agent details.
     * @throws ApiError
     */
    public static getMyAgent(): CancelablePromise<{
        data: Agent;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/agent',
        });
    }
    /**
     * Get Agent Events
     * Get recent events for your agent.
     * @returns any Default Response
     * @throws ApiError
     */
    public static getMyAgentEvents(): CancelablePromise<{
        data: Array<AgentEvent>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/agent/events',
        });
    }
}
