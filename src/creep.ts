import type { BTNode } from "./behaviourTree"
import { Creep } from "game/prototypes"
import type { Looper } from "./types"
import type { CreepProfession } from "./professions"

declare module "game/prototypes" {
    interface Creep extends Looper {
        profession: CreepProfession,
        behaviourTree: BTNode
    }
}

function creepLoop(this: Creep) {
    console.log("Running loop for creep:")
    this.profession.work()
}
Creep.prototype.loop = creepLoop
