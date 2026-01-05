import {
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
import {
    creepBlueprints,
    CreepProfession,
} from "./creep"
import type { Looper } from "./types"
import { BTreeFromJSON, type BTreeJSON } from "./behaviourTree"
import miningJSON from "../btrees/mining.json"


declare module "game/prototypes" {
    interface StructureSpawn extends Looper {
        _spawnCreep(body: BodyPartConstant[]): SpawnCreepResult
        spawnCreep(profession: CreepProfession): SpawnCreepResult
    }
}

export function spawnLoop(this: StructureSpawn) : void {
    let whatToSpawnProfession: CreepProfession | null = null
    if (gameState.amountOfMiners < CONFIG.MINER_QUOTA) {
        whatToSpawnProfession = CreepProfession.MINER
    } else if (gameState.amountOfSoldiers < CONFIG.SOLDIER_QUOTA) {
        whatToSpawnProfession = CreepProfession.SOLDIER
    }

    const shouldSpawn: boolean =
        whatToSpawnProfession != null &&
        this.store.getUsedCapacity(RESOURCE_ENERGY)! >= creepBlueprints
            .get(whatToSpawnProfession).spawnCost &&
        this.spawning == null

    let spawnRet: SpawnCreepResult | null = null
    if (shouldSpawn) {
        spawnRet = this.spawnCreep(whatToSpawnProfession!)
    }
}
StructureSpawn.prototype.loop = spawnLoop

function spawnCreep(this: StructureSpawn, profession: CreepProfession):
SpawnCreepResult {
    const res = this._spawnCreep(creepBlueprints.get(profession).bodyParts)

    if (res.error != null) {return res}

    res.object!.profession = profession
    switch (profession) {
        case CreepProfession.MINER:
            res.object!.behaviourTree = BTreeFromJSON(miningJSON)
            break
        case CreepProfession.SOLDIER:
            // @ts-ignore
            res.object!.behaviourTree = null
            break
        default:
            // @ts-ignore
            res.object!.behaviourTree = null
    }

    return res
}
StructureSpawn.prototype._spawnCreep = StructureSpawn.prototype.spawnCreep
// HACK (azul) Has to be ignored due to an open issue with interface function
// overloads
// @ts-ignore
StructureSpawn.prototype.spawnCreep = spawnCreep
