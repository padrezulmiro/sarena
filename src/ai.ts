import { RESOURCE_ENERGY } from "game/constants"
import type { Creep, GameObject } from "game/prototypes"

export type AI = {
    blackboard: Record<string, any>
    bTrees?: Record<>
    run(agent: GameObject): void
}

export const minerAI: AI = {
    blackboard: {
        state: "harvest"
    },

    run(agent: Creep) {
        if (this.blackboard["state"] == "harvest" &&
            agent.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            this.blackboard["state"] = "deposit"
        } else if (this.blackboard["state"] == "deposit" &&
            agent.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            this.blackboard["state"] = "harvest"
        }

        // TODO Call behaviour trees
    }
}
