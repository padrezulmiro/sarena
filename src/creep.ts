import type { AIType } from "./ai"

declare module "game/prototypes" {
    interface Creep {
        aiType: AIType
    }
}
