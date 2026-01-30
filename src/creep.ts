import {
    BODYPART_COST,
    type BodyPartConstant
} from "game/constants"

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
