import { OK, RESOURCE_ENERGY } from "game/constants"
import { GameObject, Source, type Creep } from "game/prototypes"
import { getObjectsByPrototype } from "game/utils"

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

function deposit(creep: Creep) {

}
