import type { GameObject } from "game/prototypes"
import type { BTNode, BTreeType } from "./behaviourTree"

export type AIType =
    "harvester" |
    "soldier" |
    "spawn"

export type AI = {
    type: AIType
    bTrees?: Partial<Record<BTreeType, BTNode>>

    run(agent: GameObject): void
}

export type AIContext = Record<string, any>
