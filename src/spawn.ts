import {
    Creep,
    StructureSpawn,
    type SpawnCreepResult
} from "game/prototypes"
import {
    RESOURCE_ENERGY,
    type BodyPartConstant
} from "game/constants"
import {
    CONFIG,
    gameState,
} from "./state"
import { type CreepBlueprint } from "./creep"
import { type AIContext, type AIType } from "./ai"
import { blueprints } from "./main"


declare module "game/prototypes" {
    interface StructureSpawn {
        _spawnCreep(body: BodyPartConstant[]): SpawnCreepResult
        spawnCreep(blueprint: CreepBlueprint, aiType: AIType): SpawnCreepResult
        loop(): void
    }
}

export function spawnLoop(this: StructureSpawn) : void {
    let whatToSpawn: CreepBlueprint | null = null
    if (gameState.amountOfMiners < CONFIG.MINER_QUOTA) {
        whatToSpawn = blueprints["harvester"]!
    } else if (gameState.amountOfSoldiers < CONFIG.SOLDIER_QUOTA) {
        whatToSpawn = blueprints["soldier"]!
    }

    const shouldSpawn: boolean =
        whatToSpawn != null &&
        this.store.getUsedCapacity(RESOURCE_ENERGY)! >= whatToSpawn.spawnCost &&
        this.spawning == null


    let spawnRet: SpawnCreepResult | null = null
    if (shouldSpawn) {
        spawnRet = this.spawnCreep(whatToSpawn!, "harvester")
    }
}
StructureSpawn.prototype.loop = spawnLoop

function spawnCreep(
    this: StructureSpawn,
    blueprint: CreepBlueprint,
    aiType: AIType
): SpawnCreepResult {
    const res = this._spawnCreep(blueprint.bodyParts)
    if (res.error != null) {
        return res
    }

    const creep = res.object!
    creep.aiType = aiType
    creep.aiContext = {}
    // initCreepAIContext(creep)

    return res
}
StructureSpawn.prototype._spawnCreep = StructureSpawn.prototype.spawnCreep
// HACK (azul) Has to be ignored due to an open issue with interface function
// overloads
// @ts-ignore
StructureSpawn.prototype.spawnCreep = spawnCreep

function initCreepAIContext(creep: Creep): void {
    const aiContext: AIContext = {}
    switch (creep.aiType) {
        case "harvester":
            aiContext["state"] = "harvester"
            break
        case "soldier":
            aiContext["state"] = "idle"
            break
    }
    creep.aiContext = aiContext
}
