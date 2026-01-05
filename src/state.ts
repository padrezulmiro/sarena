import { Creep } from "game/prototypes"
import { getObjectsByPrototype } from "game/utils"
import { CreepProfession } from "./creep"

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

export const gameState = {
    creepTotal: 0,
    amountOfMiners: 0,
    amountOfSoldiers: 0
}

export function updateGameState() {
    const myCreeps = getObjectsByPrototype(Creep).filter((creep) => creep.my)

    let amountOfMiners = 0
    let amountOfSoldiers = 0
    for (let creep of myCreeps) {
        switch (creep.profession) {
            case CreepProfession.MINER:
                ++amountOfMiners
                break
            case CreepProfession.SOLDIER:
                ++amountOfSoldiers
                break
        }
    }

    gameState.creepTotal = myCreeps.length
    gameState.amountOfMiners = amountOfMiners
    gameState.amountOfSoldiers = amountOfSoldiers
}
