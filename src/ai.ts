import { RESOURCE_ENERGY } from "game/constants"
import type { Creep, GameObject } from "game/prototypes"
import type { BTActionType, BTNode, BTreeType } from "./behaviourTree"
import { bTrees } from "./main"

export type AIType =
    "harvester" |
    "soldier" |
    "spawn"

export type AI = {
    type: AIType
    context: Record<string, any>
    bTrees?: Partial<Record<BTreeType, BTNode>>

    run(agent: GameObject): void
}

export const harvesterAI: AI = {
    type: "harvester",
    context: {
        state: "harvest"
    },

    bTrees: {
        harvestEnergy: bTrees.harvestEnergy!,
        depositEnergy: bTrees.depositEnergy!
    },

    run(harvester: Creep) {
        if (this.context["state"] == "harvest" && harvester.store
                .getFreeCapacity(RESOURCE_ENERGY) == 0) {
            this.context["state"] = "deposit"
        } else if (this.context["state"] == "deposit" && harvester.store
                .getUsedCapacity(RESOURCE_ENERGY) == 0) {
            this.context["state"] = "harvest"
        }

        switch (this.context["state"]) {
            case "harvest":
                this.bTrees!.harvestEnergy!.execute(this.context, harvester)
                break
            case "deposit":
                this.bTrees!.depositEnergy!.execute(this.context, harvester)
                break
        }
    }
}

export const ais: Partial<Record<AIType, AI>> = {
    harvester: harvesterAI
}
