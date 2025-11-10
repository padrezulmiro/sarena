import {
    ATTACK,
    BODYPART_COST,
    CARRY,
    MOVE,
    RESOURCE_ENERGY,
    WORK,
    type BodyPartConstant
} from "game/constants";

import {
    Creep,
    StructureSpawn,
    type SpawnCreepResult,
} from "game/prototypes";

import { getObjectsByPrototype } from "game/utils";

interface Looper {
    loop(): void
}

declare module "game/prototypes" {
    interface StructureSpawn {
        loop(): void
    }
}
StructureSpawn.prototype.loop = spawnLoop

declare module "game/prototypes" {
    interface Creep {
        loop(): void
    }
}
Creep.prototype.loop = spawnLoop // FIXME(azul) not spawnLoop

enum CreepProfession {
    Miner,
    Soldier
}

class SpawnBlueprint {
    #bodyParts: BodyPartConstant[]

    constructor(bodyParts: BodyPartConstant[]) {
        this.#bodyParts = bodyParts
    }

    get bodyParts() {
        return this.#bodyParts
    }

    get spawnCost() {
        let costSum = 0
        for (let part of this.#bodyParts) {
            costSum += BODYPART_COST[part]
        }
        return costSum
    }
}

/**
 * AI configuration parameters
 * @property CITY_FRONTIER - The distance from the spawn that the AI considers
 * its spawn to be under attack
 * @property MINER_QUOTA - Amount of miners to be maintained
 * @property SOLDIER_QUOTA - Amount of soldiers to be maintained
 */
const CONFIG = {
    CITY_FRONTIER: 50,
    MINER_QUOTA: 2,
    SOLDIER_QUOTA: 5
}

const memory = {
    amountOfMiners: 0,
    amountOfSoldiers: 0,
    creepProfessionMap: new Map()
}

const minerBlueprint = new SpawnBlueprint([MOVE, CARRY, WORK])
const soldierBlueprint = new SpawnBlueprint([MOVE, MOVE, ATTACK, ATTACK])


export function loop() {
    const spawn: StructureSpawn | undefined =
        getObjectsByPrototype(StructureSpawn)[0]
    spawn?.loop()
}

function spawnLoop(this: StructureSpawn) : void {
    let whatToSpawn: SpawnBlueprint | null = null
    let whatToSpawnProfession: CreepProfession | null = null
    if (memory.amountOfMiners < CONFIG.MINER_QUOTA) {
        whatToSpawn = minerBlueprint
        whatToSpawnProfession = CreepProfession.Miner
    } else if (memory.amountOfSoldiers < CONFIG.SOLDIER_QUOTA) {
        whatToSpawn = soldierBlueprint
        whatToSpawnProfession = CreepProfession.Soldier
    }
    const shouldSpawn: boolean =
        whatToSpawn != null &&
        this.store.getUsedCapacity(RESOURCE_ENERGY)! >= whatToSpawn.spawnCost &&
        this.spawning == null

    // FIXME(azul) The ! type assertion is unadvised; will look at this later
    let spawnRet: SpawnCreepResult | null = null
    if (shouldSpawn) {
        console.log("here")
        spawnRet = this.spawnCreep(whatToSpawn!.bodyParts)
        const spawnee: Creep = spawnRet!.object!
        memory.creepProfessionMap.set(spawnee.id, whatToSpawnProfession)
    }
}

function minerLoop(this: Creep) {

}
