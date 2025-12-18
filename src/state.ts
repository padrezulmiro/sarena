import type { Unit } from "./unit"

/**
 * AI configuration parameters
 * @property CITY_FRONTIER - The distance from the spawn that the AI considers
 * its spawn to be under attack
 * @property MINER_QUOTA - Amount of miners to be maintained
 * @property SOLDIER_QUOTA - Amount of soldiers to be maintained
 */
export const CONFIG = {
    CITY_FRONTIER: 50,
    MINER_QUOTA: 2,
    SOLDIER_QUOTA: 5
}

export const memory = {
    amountOfMiners: 0,
    amountOfSoldiers: 0,

}

export const gameState: {
    units: Unit[],
    amountOfMiners: number,
    amountOfSoldiers: number
} = {
    units: [],
    amountOfMiners: 0,
    amountOfSoldiers: 0
}
