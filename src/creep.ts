import {
    BODYPART_COST,
    MOVE,
    CARRY,
    WORK,
    ATTACK,
    type BodyPartConstant,
} from "game/constants"
import type { BTNode } from "./behaviourTree"
import { Creep } from "game/prototypes"
import type { Looper } from "./types"

declare module "game/prototypes" {
    interface Creep extends Looper {
        profession: CreepProfession,
        behaviourTree: BTNode
    }
}

export enum CreepProfession {
    MINER,
    SOLDIER
}

export class CreepBlueprint {
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

export const creepBlueprints = new Map()
creepBlueprints.set(
    CreepProfession.MINER,
    new CreepBlueprint([MOVE, CARRY, WORK])
)
creepBlueprints.set(
    CreepProfession.SOLDIER,
    new CreepBlueprint([MOVE, MOVE, ATTACK, ATTACK])
)

export const minerBlueprint = new CreepBlueprint([MOVE, CARRY, WORK])
export const soldierBlueprint = new CreepBlueprint([MOVE, MOVE, ATTACK, ATTACK])

function creepLoop(this: Creep) {
    console.log("Running loop for creep:")
    console.log(this)
    // FIXME
    // const ret = this.behaviourTree.execute(this)
}
Creep.prototype.loop = creepLoop
