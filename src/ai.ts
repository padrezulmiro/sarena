import type { Creep, GameObject } from "game/prototypes"

export type AI = {
    blackboard: Record<string, any>
    run(target: GameObject): void
}

export const minerAI: AI = {
    blackboard: {
        state: "harvest"
    },

    run(target: Creep) {

    }
}
