import type { GameObject } from "game/prototypes"
import { Looper } from "./spawn"
import { UnitProfession } from "./unit"
import type { BodyPartConstant } from "game/constants"
import type { BTree } from "./behaviourTree"


declare module "game/prototypes" {
    interface StructureSpawn extends Looper {
        _spawnCreep(body: BodyPartConstant[]): SpawnCreepResult
    }

    interface Creep extends Looper {
        profession: UnitProfession,
        behaviourTree: BTree
    }

    interface OwnedStructure extends Looper {}
}

