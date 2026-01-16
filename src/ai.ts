import { RESOURCE_ENERGY } from "game/constants"
import type { Creep, GameObject } from "game/prototypes"
import type { BTNode } from "./behaviourTree"

export type AI = {
    blackboard: Record<string, any>
    bTrees?: Record<string, BTNode>

    run(agent: GameObject): void
}

export enum AIType {
    HarvesterCreep,
    SoldierCreep,
    Spawn
}

export const harvesterAI: AI = {
    blackboard: {
        state: "harvest"
    },

    run(agent: Creep) {
        if (this.blackboard["state"] == "harvest" &&
                agent.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            this.blackboard["state"] = "deposit"
            this.bTrees![this.blackboard["state"]]
        } else if (this.blackboard["state"] == "deposit" &&
                agent.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            this.blackboard["state"] = "harvest"
            this.bTrees![this.blackboard["state"]]
        }
    }
}
