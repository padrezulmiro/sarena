import {
    BODYPART_COST,
    MOVE,
    CARRY,
    WORK,
    type BodyPartConstant,
} from "game/constants"
import { BTreesFromJSON, type BTNode } from "./behaviourTree"
import miningJSON from "../btrees/mining.json"

enum CreepProfessionType {
    Miner = "MinerCreep",
    Soldier = "SoldierCreep"
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

// REVIEW(azul) I was thinking that maybe the profession should include the
// blueprint, the AI logic (BTs or otherwise), etc
export class CreepProfession {
    _name: CreepProfessionType
    _blueprint: CreepBlueprint
    _behaviourTrees: BTNode[]

    constructor(
        name: CreepProfessionType,
        blueprint: CreepBlueprint,
        behaviourTrees: BTNode[]
    ) {
        this._name = name
        this._blueprint = blueprint
        this._behaviourTrees = behaviourTrees
        // FIXME Change above to load tree from file
    }

    work() {

    }
}

export const creepProfessionsMap = new Map()
creepProfessionsMap.set(
    CreepProfessionType.Miner,
    new CreepProfession(
        CreepProfessionType.Miner,
        new CreepBlueprint([MOVE, CARRY, WORK]),
        BTreesFromJSON(miningJSON)
    )
)
