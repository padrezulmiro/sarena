import {
    Creep,
    StructureSpawn,
    type SpawnCreepResult
} from "game/prototypes"
import {
    UnitProfession,
    minerBlueprint,
    soldierBlueprint,
    UnitBlueprint,
    unitBlueprints,
    Unit
} from "./unit"
import {
    RESOURCE_ENERGY
} from "game/constants"
import {
    CONFIG,
    memory
} from "./state"


export interface Looper {
    loop(): void
}

function spawnLoop(this: StructureSpawn) : void {
    let whatToSpawn: UnitBlueprint | null = null
    let whatToSpawnProfession: UnitProfession | null = null
    if (memory.amountOfMiners < CONFIG.MINER_QUOTA) {
        whatToSpawn = minerBlueprint
        whatToSpawnProfession = UnitProfession.MINER
    } else if (memory.amountOfSoldiers < CONFIG.SOLDIER_QUOTA) {
        whatToSpawn = soldierBlueprint
        whatToSpawnProfession = UnitProfession.SOLDIER
    }
    const shouldSpawn: boolean =
        whatToSpawn != null &&
        this.store.getUsedCapacity(RESOURCE_ENERGY)! >= whatToSpawn.spawnCost &&
        this.spawning == null

    // FIXME(azul) The ! type assertion is unadvised; will look at this later
    let spawnRet: SpawnCreepResult | null = null
    if (shouldSpawn) {
        spawnRet = this.spawnCreep(whatToSpawn!.bodyParts)
        const spawnee: Creep = spawnRet!.object!
        // FIXME
        // memory.creepProfessionMap.set(spawnee.id, whatToSpawnProfession)
    }
}
StructureSpawn.prototype.loop = spawnLoop

function spawnCreep(
    this: StructureSpawn,
    profession: UnitProfession
): SpawnCreepResult {
    const res = this._spawnCreep(unitBlueprints.get(profession).bodyParts)
    if (res.error != null) {
        // TODO(azul) Spawn has failed and needs to return immediately

    }

    // FIXME
    // const spawningUnit = new Unit()

    return res
}
