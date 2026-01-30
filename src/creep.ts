import {
    BODYPART_COST,
    type BodyPartConstant
} from "game/constants"
import type { AIContext, AIType } from "./ai"

declare module "game/prototypes" {
    interface Creep {
        aiType: AIType
        aiContext: AIContext
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
