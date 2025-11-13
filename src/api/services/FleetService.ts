/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { Chart } from '../models/Chart';
import type { ChartTransaction } from '../models/ChartTransaction';
import type { Contract } from '../models/Contract';
import type { Cooldown } from '../models/Cooldown';
import type { Extraction } from '../models/Extraction';
import type { MarketTransaction } from '../models/MarketTransaction';
import type { Meta } from '../models/Meta';
import type { RepairTransaction } from '../models/RepairTransaction';
import type { ScannedShip } from '../models/ScannedShip';
import type { ScannedSystem } from '../models/ScannedSystem';
import type { ScannedWaypoint } from '../models/ScannedWaypoint';
import type { ScrapTransaction } from '../models/ScrapTransaction';
import type { Ship } from '../models/Ship';
import type { ShipCargo } from '../models/ShipCargo';
import type { ShipConditionEvent } from '../models/ShipConditionEvent';
import type { ShipFuel } from '../models/ShipFuel';
import type { ShipModificationTransaction } from '../models/ShipModificationTransaction';
import type { ShipModule } from '../models/ShipModule';
import type { ShipMount } from '../models/ShipMount';
import type { ShipNav } from '../models/ShipNav';
import type { ShipNavFlightMode } from '../models/ShipNavFlightMode';
import type { ShipType } from '../models/ShipType';
import type { ShipyardTransaction } from '../models/ShipyardTransaction';
import type { Siphon } from '../models/Siphon';
import type { Survey } from '../models/Survey';
import type { TradeSymbol } from '../models/TradeSymbol';
import type { Waypoint } from '../models/Waypoint';
import type { WaypointModifier } from '../models/WaypointModifier';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FleetService {
    /**
     * List Ships
     * Return a paginated list of all of ships under your agent's ownership.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Successfully listed ships.
     * @throws ApiError
     */
    public static getMyShips(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<Ship>;
        meta: Meta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Purchase Ship
     * Purchase a ship from a Shipyard. In order to use this function, a ship under your agent's ownership must be in a waypoint that has the `Shipyard` trait, and the Shipyard must sell the type of the desired ship.
     *
     * Shipyards typically offer ship types, which are predefined templates of ships that have dedicated roles. A template comes with a preset of an engine, a reactor, and a frame. It may also include a few modules and mounts.
     * @param requestBody
     * @returns any Purchased ship successfully.
     * @throws ApiError
     */
    public static purchaseShip(
        requestBody: {
            shipType: ShipType;
            /**
             * The symbol of the waypoint you want to purchase the ship at.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            ship: Ship;
            agent: Agent;
            transaction: ShipyardTransaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Ship
     * Retrieve the details of a ship under your agent's ownership.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully fetched ship.
     * @throws ApiError
     */
    public static getMyShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: Ship;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Create Chart
     * Command a ship to chart the waypoint at its current location.
     *
     * Most waypoints in the universe are uncharted by default. These waypoints have their traits hidden until they have been charted by a ship.
     *
     * Charting a waypoint will record your agent as the one who created the chart, and all other agents would also be able to see the waypoint's traits. Charting a waypoint gives you a one time reward of credits based on the rarity of the waypoint's traits.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully charted waypoint.
     * @throws ApiError
     */
    public static createChart(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            chart: Chart;
            waypoint: Waypoint;
            transaction: ChartTransaction;
            agent: Agent;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/chart',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Negotiate Contract
     * Negotiate a new contract with the HQ.
     *
     * In order to negotiate a new contract, an agent must not have ongoing or offered contracts over the allowed maximum amount. Currently the maximum contracts an agent can have at a time is 1.
     *
     * Once a contract is negotiated, it is added to the list of contracts offered to the agent, which the agent can then accept.
     *
     * The ship must be present at any waypoint with a faction present to negotiate a contract with that faction.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully negotiated a new contract.
     * @throws ApiError
     */
    public static negotiateContract(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            contract: Contract;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/negotiate/contract',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Get Ship Cooldown
     * Retrieve the details of your ship's reactor cooldown. Some actions such as activating your jump drive, scanning, or extracting resources taxes your reactor and results in a cooldown.
     *
     * Your ship cannot perform additional actions until your cooldown has expired. The duration of your cooldown is relative to the power consumption of the related modules or mounts for the action taken.
     *
     * Response returns a 204 status code (no-content) when the ship has no cooldown.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully fetched ship's cooldown.
     * @throws ApiError
     */
    public static getShipCooldown(
        shipSymbol: string,
    ): CancelablePromise<{
        data: Cooldown;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/cooldown',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Dock Ship
     * Attempt to dock your ship at its current location. Docking will only succeed if your ship is capable of docking at the time of the request.
     *
     * Docked ships can access elements in their current location, such as the market or a shipyard, but cannot do actions that require the ship to be above surface such as navigating or extracting.
     *
     * The endpoint is idempotent - successive calls will succeed even if the ship is already docked.
     * @param shipSymbol The symbol of the ship.
     * @returns any The ship has successfully docked at its current location.
     * @throws ApiError
     */
    public static dockShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            nav: ShipNav;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/dock',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Extract Resources
     * Extract resources from a waypoint that can be extracted, such as asteroid fields, into your ship. Send an optional survey as the payload to target specific yields.
     *
     * The ship must be in orbit to be able to extract and must have mining equipments installed that can extract goods, such as the `Gas Siphon` mount for gas-based goods or `Mining Laser` mount for ore-based goods.
     *
     * The survey property is now deprecated. See the `extract/survey` endpoint for more details.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully extracted resources.
     * @throws ApiError
     */
    public static extractResources(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            extraction: Extraction;
            cooldown: Cooldown;
            cargo: ShipCargo;
            modifiers?: Array<WaypointModifier>;
            events: Array<ShipConditionEvent>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/extract',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Extract Resources with Survey
     * Use a survey when extracting resources from a waypoint. This endpoint requires a survey as the payload, which allows your ship to extract specific yields.
     *
     * Send the full survey object as the payload which will be validated according to the signature. If the signature is invalid, or any properties of the survey are changed, the request will fail.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Successfully extracted resources.
     * @throws ApiError
     */
    public static extractResourcesWithSurvey(
        shipSymbol: string,
        requestBody?: Survey,
    ): CancelablePromise<{
        data: {
            extraction: Extraction;
            cooldown: Cooldown;
            cargo: ShipCargo;
            modifiers?: Array<WaypointModifier>;
            events: Array<ShipConditionEvent>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/extract/survey',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Jettison Cargo
     * Jettison cargo from your ship's cargo hold.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Jettison successful.
     * @throws ApiError
     */
    public static jettison(
        shipSymbol: string,
        requestBody: {
            symbol: TradeSymbol;
            /**
             * Amount of units to jettison of this good.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            cargo: ShipCargo;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/jettison',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Jump Ship
     * Jump your ship instantly to a target connected waypoint. The ship must be in orbit to execute a jump.
     *
     * A unit of antimatter is purchased and consumed from the market when jumping. The price of antimatter is determined by the market and is subject to change. A ship can only jump to connected waypoints
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Jump successful.
     * @throws ApiError
     */
    public static jumpShip(
        shipSymbol: string,
        requestBody: {
            /**
             * The symbol of the waypoint to jump to. The destination must be a connected waypoint.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            nav: ShipNav;
            cooldown: Cooldown;
            transaction: MarketTransaction;
            agent: Agent;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/jump',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Scan Systems
     * Scan for nearby systems, retrieving information on the systems' distance from the ship and their waypoints. Requires a ship to have the `Sensor Array` mount installed to use.
     *
     * The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully scanned for nearby systems.
     * @throws ApiError
     */
    public static createShipSystemScan(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: Cooldown;
            /**
             * List of scanned systems.
             */
            systems: Array<ScannedSystem>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/scan/systems',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Scan Waypoints
     * Scan for nearby waypoints, retrieving detailed information on each waypoint in range. Scanning uncharted waypoints will allow you to ignore their uncharted state and will list the waypoints' traits.
     *
     * Requires a ship to have the `Sensor Array` mount installed to use.
     *
     * The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully scanned for nearby waypoints.
     * @throws ApiError
     */
    public static createShipWaypointScan(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: Cooldown;
            /**
             * List of scanned waypoints.
             */
            waypoints: Array<ScannedWaypoint>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/scan/waypoints',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Scan Ships
     * Scan for nearby ships, retrieving information for all ships in range.
     *
     * Requires a ship to have the `Sensor Array` mount installed to use.
     *
     * The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully scanned for nearby ships.
     * @throws ApiError
     */
    public static createShipShipScan(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: Cooldown;
            /**
             * List of scanned ships.
             */
            ships: Array<ScannedShip>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/scan/ships',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Scrap Ship
     * Scrap a ship, removing it from the game and receiving a portion of the ship's value back in credits. The ship must be docked in a waypoint that has the `Shipyard` trait to be scrapped.
     * @param shipSymbol The symbol of the ship.
     * @returns any Ship scrapped successfully.
     * @throws ApiError
     */
    public static scrapShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            agent: Agent;
            transaction: ScrapTransaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/scrap',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Get Scrap Ship
     * Get the value of scrapping a ship. Requires the ship to be docked at a waypoint that has the `Shipyard` trait.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully retrieved the amount of value that will be returned when scrapping a ship.
     * @throws ApiError
     */
    public static getScrapShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            transaction: ScrapTransaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/scrap',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Navigate Ship
     * Navigate to a target destination. The ship must be in orbit to use this function. The destination waypoint must be within the same system as the ship's current location. Navigating will consume the necessary fuel from the ship's manifest based on the distance to the target waypoint.
     *
     * The returned response will detail the route information including the expected time of arrival. Most ship actions are unavailable until the ship has arrived at it's destination.
     *
     * To travel between systems, see the ship's Warp or Jump actions.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any The successful transit information including the route details and changes to ship fuel. The route includes the expected time of arrival.
     * @throws ApiError
     */
    public static navigateShip(
        shipSymbol: string,
        requestBody: {
            /**
             * The symbol of the waypoint to navigate/warp to.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            nav: ShipNav;
            fuel: ShipFuel;
            events: Array<ShipConditionEvent>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/navigate',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Warp Ship
     * Warp your ship to a target destination in another system. The ship must be in orbit to use this function and must have the `Warp Drive` module installed. Warping will consume the necessary fuel from the ship's manifest.
     *
     * The returned response will detail the route information including the expected time of arrival. Most ship actions are unavailable until the ship has arrived at its destination.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any The successful transit information including the route details and changes to ship fuel. The route includes the expected time of arrival.
     * @throws ApiError
     */
    public static warpShip(
        shipSymbol: string,
        requestBody: {
            /**
             * The symbol of the waypoint to navigate/warp to.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            nav: ShipNav;
            fuel: ShipFuel;
            events: Array<ShipConditionEvent>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/warp',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Orbit Ship
     * Attempt to move your ship into orbit at its current location. The request will only succeed if your ship is capable of moving into orbit at the time of the request.
     *
     * Orbiting ships are able to do actions that require the ship to be above surface such as navigating or extracting, but cannot access elements in their current waypoint, such as the market or a shipyard.
     *
     * The endpoint is idempotent - successive calls will succeed even if the ship is already in orbit.
     * @param shipSymbol
     * @returns any The ship has successfully moved into orbit at its current location.
     * @throws ApiError
     */
    public static orbitShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            nav: ShipNav;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/orbit',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Purchase Cargo
     * Purchase cargo from a market.
     *
     * The ship must be docked in a waypoint that has `Marketplace` trait, and the market must be selling a good to be able to purchase it.
     *
     * The maximum amount of units of a good that can be purchased in each transaction are denoted by the `tradeVolume` value of the good, which can be viewed by using the Get Market action.
     *
     * Purchased goods are added to the ship's cargo hold.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Purchased goods successfully.
     * @throws ApiError
     */
    public static purchaseCargo(
        shipSymbol: string,
        requestBody: {
            symbol: TradeSymbol;
            /**
             * The number of units of the good to purchase.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            cargo: ShipCargo;
            transaction: MarketTransaction;
            agent: Agent;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/purchase',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Ship Refine
     * Attempt to refine the raw materials on your ship. The request will only succeed if your ship is capable of refining at the time of the request. In order to be able to refine, a ship must have goods that can be refined and have installed a `Refinery` module that can refine it.
     *
     * When refining, 100 basic goods will be converted into 10 processed goods.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any The ship has successfully refined goods.
     * @throws ApiError
     */
    public static shipRefine(
        shipSymbol: string,
        requestBody: {
            /**
             * The type of good to produce out of the refining process.
             */
            produce: 'IRON' | 'COPPER' | 'SILVER' | 'GOLD' | 'ALUMINUM' | 'PLATINUM' | 'URANITE' | 'MERITIUM' | 'FUEL';
        },
    ): CancelablePromise<{
        data: {
            cargo: ShipCargo;
            cooldown: Cooldown;
            /**
             * Goods that were produced by this refining process.
             */
            produced: Array<{
                /**
                 * Symbol of the good.
                 */
                tradeSymbol: TradeSymbol;
                /**
                 * Amount of units of the good.
                 */
                units: number;
            }>;
            /**
             * Goods that were consumed during this refining process.
             */
            consumed: Array<{
                /**
                 * Symbol of the good.
                 */
                tradeSymbol: TradeSymbol;
                /**
                 * Amount of units of the good.
                 */
                units: number;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/refine',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Refuel Ship
     * Refuel your ship by buying fuel from the local market.
     *
     * Requires the ship to be docked in a waypoint that has the `Marketplace` trait, and the market must be selling fuel in order to refuel.
     *
     * Each fuel bought from the market replenishes 100 units in your ship's fuel.
     *
     * Ships will always be refuel to their frame's maximum fuel capacity when using this action.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Refueled successfully.
     * @throws ApiError
     */
    public static refuelShip(
        shipSymbol: string,
        requestBody?: {
            /**
             * The amount of fuel to fill in the ship's tanks. When not specified, the ship will be refueled to its maximum fuel capacity. If the amount specified is greater than the ship's remaining capacity, the ship will only be refueled to its maximum fuel capacity. The amount specified is not in market units but in ship fuel units.
             */
            units?: number;
            /**
             * Wether to use the FUEL thats in your cargo or not.
             */
            fromCargo?: (boolean | null);
        },
    ): CancelablePromise<{
        data: {
            agent: Agent;
            fuel: ShipFuel;
            cargo?: ShipCargo;
            transaction: MarketTransaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/refuel',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Repair Ship
     * Repair a ship, restoring the ship to maximum condition. The ship must be docked at a waypoint that has the `Shipyard` trait in order to use this function. To preview the cost of repairing the ship, use the Get action.
     * @param shipSymbol The symbol of the ship.
     * @returns any Ship repaired successfully.
     * @throws ApiError
     */
    public static repairShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            agent: Agent;
            ship: Ship;
            transaction: RepairTransaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/repair',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Get Repair Ship
     * Get the cost of repairing a ship. Requires the ship to be docked at a waypoint that has the `Shipyard` trait.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully retrieved the cost of repairing a ship.
     * @throws ApiError
     */
    public static getRepairShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            transaction: RepairTransaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/repair',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Sell Cargo
     * Sell cargo in your ship to a market that trades this cargo. The ship must be docked in a waypoint that has the `Marketplace` trait in order to use this function.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Cargo was successfully sold.
     * @throws ApiError
     */
    public static sellCargo(
        shipSymbol: string,
        requestBody: {
            symbol: TradeSymbol;
            /**
             * Amounts of units to sell of the selected good.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            cargo: ShipCargo;
            transaction: MarketTransaction;
            agent: Agent;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/sell',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Siphon Resources
     * Siphon gases or other resources from gas giants.
     *
     * The ship must be in orbit to be able to siphon and must have siphon mounts and a gas processor installed.
     * @param shipSymbol The symbol of the ship.
     * @returns any Siphon successful.
     * @throws ApiError
     */
    public static siphonResources(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            siphon: Siphon;
            cooldown: Cooldown;
            cargo: ShipCargo;
            events: Array<ShipConditionEvent>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/siphon',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Create Survey
     * Create surveys on a waypoint that can be extracted such as asteroid fields. A survey focuses on specific types of deposits from the extracted location. When ships extract using this survey, they are guaranteed to procure a high amount of one of the goods in the survey.
     *
     * In order to use a survey, send the entire survey details in the body of the extract request.
     *
     * Each survey may have multiple deposits, and if a symbol shows up more than once, that indicates a higher chance of extracting that resource.
     *
     * Your ship will enter a cooldown after surveying in which it is unable to perform certain actions. Surveys will eventually expire after a period of time or will be exhausted after being extracted several times based on the survey's size. Multiple ships can use the same survey for extraction.
     *
     * A ship must have the `Surveyor` mount installed in order to use this function.
     * @param shipSymbol The symbol of the ship.
     * @returns any Surveys has been created.
     * @throws ApiError
     */
    public static createSurvey(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: Cooldown;
            /**
             * Surveys created by this action.
             */
            surveys: Array<Survey>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/survey',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Transfer Cargo
     * Transfer cargo between ships.
     *
     * The receiving ship must be in the same waypoint as the transferring ship, and it must able to hold the additional cargo after the transfer is complete. Both ships also must be in the same state, either both are docked or both are orbiting.
     *
     * The response body's cargo shows the cargo of the transferring ship after the transfer is complete.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Cargo transferred successfully.
     * @throws ApiError
     */
    public static transferCargo(
        shipSymbol: string,
        requestBody: {
            tradeSymbol: TradeSymbol;
            /**
             * Amount of units to transfer.
             */
            units: number;
            /**
             * The symbol of the ship to transfer to.
             */
            shipSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            cargo: ShipCargo;
            targetCargo: ShipCargo;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/transfer',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Ship Cargo
     * Retrieve the cargo of a ship under your agent's ownership.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully fetched ship's cargo.
     * @throws ApiError
     */
    public static getMyShipCargo(
        shipSymbol: string,
    ): CancelablePromise<{
        data: ShipCargo;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/cargo',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Get Ship Modules
     * Get the modules installed on a ship.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully retrieved ship modules.
     * @throws ApiError
     */
    public static getShipModules(
        shipSymbol: string,
    ): CancelablePromise<{
        data: Array<ShipModule>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/modules',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Install Ship Module
     * Install a module on a ship. The module must be in your cargo.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Successfully installed the module on the ship.
     * @throws ApiError
     */
    public static installShipModule(
        shipSymbol: string,
        requestBody: {
            /**
             * The symbol of the module to install.
             */
            symbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: Agent;
            modules: Array<ShipModule>;
            cargo: ShipCargo;
            transaction: ShipModificationTransaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/modules/install',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove Ship Module
     * Remove a module from a ship. The module will be placed in cargo.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Successfully removed the module from the ship.
     * @throws ApiError
     */
    public static removeShipModule(
        shipSymbol: string,
        requestBody: {
            /**
             * The symbol of the module to remove.
             */
            symbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: Agent;
            modules: Array<ShipModule>;
            cargo: ShipCargo;
            transaction: ShipModificationTransaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/modules/remove',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Mounts
     * Get the mounts installed on a ship.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully retrieved ship mounts.
     * @throws ApiError
     */
    public static getMounts(
        shipSymbol: string,
    ): CancelablePromise<{
        data: Array<ShipMount>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/mounts',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Install Mount
     * Install a mount on a ship.
     *
     * In order to install a mount, the ship must be docked and located in a waypoint that has a `Shipyard` trait. The ship also must have the mount to install in its cargo hold.
     *
     * An installation fee will be deduced by the Shipyard for installing the mount on the ship.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Successfully installed the mount.
     * @throws ApiError
     */
    public static installMount(
        shipSymbol: string,
        requestBody: {
            /**
             * The symbol of the mount to install.
             */
            symbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: Agent;
            /**
             * List of installed mounts after the installation of the new mount.
             */
            mounts: Array<ShipMount>;
            cargo: ShipCargo;
            transaction: ShipModificationTransaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/mounts/install',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove Mount
     * Remove a mount from a ship.
     *
     * The ship must be docked in a waypoint that has the `Shipyard` trait, and must have the desired mount that it wish to remove installed.
     *
     * A removal fee will be deduced from the agent by the Shipyard.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Successfully removed the mount.
     * @throws ApiError
     */
    public static removeMount(
        shipSymbol: string,
        requestBody: {
            /**
             * The symbol of the mount to remove.
             */
            symbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: Agent;
            /**
             * List of installed mounts after the removal of the selected mount.
             */
            mounts: Array<ShipMount>;
            cargo: ShipCargo;
            transaction: ShipModificationTransaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/mounts/remove',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Ship Nav
     * Get the current nav status of a ship.
     * @param shipSymbol The symbol of the ship.
     * @returns any The current nav status of the ship.
     * @throws ApiError
     */
    public static getShipNav(
        shipSymbol: string,
    ): CancelablePromise<{
        data: ShipNav;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/nav',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Patch Ship Nav
     * Update the nav configuration of a ship.
     *
     * Currently only supports configuring the Flight Mode of the ship, which affects its speed and fuel consumption.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any Success response for updating the nav configuration of a ship.
     * @throws ApiError
     */
    public static patchShipNav(
        shipSymbol: string,
        requestBody?: {
            flightMode?: ShipNavFlightMode;
        },
    ): CancelablePromise<{
        data: {
            nav: ShipNav;
            fuel: ShipFuel;
            events: Array<ShipConditionEvent>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/my/ships/{shipSymbol}/nav',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
