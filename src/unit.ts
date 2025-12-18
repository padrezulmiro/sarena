import { Creep } from "game/prototypes";
import { BTree } from "./behaviourTree";
import { getObjectById } from "game/utils";
import type { Id } from "game/prototypes";
import {
    BODYPART_COST,
    MOVE,
    CARRY,
    WORK,
    ATTACK,
    type BodyPartConstant,
} from "game/constants"

// XXX Probably all of this should be replaced to changes to the Creep's
// prototype

export enum UnitProfession {
    MINER,
    SOLDIER
}

export class UnitBlueprint {
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

export interface IUnit {
    creepId: Id<Creep>
    profession: UnitProfession
    behaviourTree: BTree
    creep(): Creep
}

export class Unit implements IUnit {
    creepId: Id<Creep>
    profession: UnitProfession
    behaviourTree: BTree;

    constructor(
        creepId: Id<Creep>,
        profession: UnitProfession,
        behaviourTree: BTree
    ) {
        this.creepId = creepId
        this.profession = profession
        this.behaviourTree = behaviourTree
    }

    creep() {
        return getObjectById(this.creepId) as Creep
    }
}

export const unitBlueprints = new Map()
unitBlueprints.set(UnitProfession.MINER, new UnitBlueprint([MOVE, CARRY, WORK]))
unitBlueprints.set(
    UnitProfession.SOLDIER,
    new UnitBlueprint([MOVE, MOVE, ATTACK, ATTACK])
)

export const minerBlueprint = new UnitBlueprint([MOVE, CARRY, WORK])
export const soldierBlueprint = new UnitBlueprint([MOVE, MOVE, ATTACK, ATTACK])
