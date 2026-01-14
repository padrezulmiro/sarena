import {
    OK,
    RESOURCE_ENERGY,
    BODYPART_COST,
    MOVE,
    CARRY,
    WORK,
    type BodyPartConstant,
} from "game/constants"
import { GameObject, Source, type Creep } from "game/prototypes"
import { getObjectsByPrototype } from "game/utils"
import { BTreeFromJSON, type BTNode } from "./behaviourTree"
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

type BTAction = (creep: Creep, ...rest: any[]) => boolean

const BTActionMap: Record<string, BTAction> = {
    "harvest": harvest,
    "isStoreEmpty": isStoreEmpty,
    "isStoreFull": isStoreFull,
    "deposit": deposit,
    "adjacentTo": adjacentTo,
}

// REVIEW(azul) I was thinking that maybe the profession should include the
// blueprint, the AI logic (BTs or otherwise), etc
export class CreepProfession {
    _name: CreepProfessionType
    _blueprint: CreepBlueprint
    _behaviourTrees: BTNode[]
    _actions: Map<string, BTAction>

    constructor(
        name: CreepProfessionType,
        blueprint: CreepBlueprint,
        behaviourTrees: BTNode[]
    ) {
        this._name = name
        this._blueprint = blueprint
        this._behaviourTrees = behaviourTrees
        // FIXME Maybe change behaviourTree??
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
        BTreeFromJSON(miningJSON)
    )
)

// SECTION: Behaviour trees' actions

function harvest(creep: Creep): boolean {
    const ret = creep.harvest(creep.findClosestByPath(getObjectsByPrototype(Source))!)
    return ret == OK
}

function isStoreFull(creep: Creep): boolean {
    return creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0
}

function isStoreEmpty(creep: Creep): boolean {
    return creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0
}

function adjacentTo(creep: Creep, target: GameObject): boolean {

    return false // TODO
}

function deposit(creep: Creep): boolean {

}
