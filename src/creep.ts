import {
    ATTACK,
    BODYPART_COST,
    CARRY,
    MOVE,
    WORK,
    type BodyPartConstant
} from "game/constants"
import type { AIType } from "./ai"

declare module "game/prototypes" {
    interface Creep {
        aiType: AIType
    }
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

export const blueprints: Partial<Record<string, CreepBlueprint>> = {
    harvester: new CreepBlueprint([MOVE, CARRY, WORK]),
    soldier: new CreepBlueprint([MOVE, ATTACK, ATTACK])
}
