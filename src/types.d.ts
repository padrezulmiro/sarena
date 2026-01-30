import type { AIType, AIContext } from "./ai"

declare module "game/prototypes" {
    interface GameObject {
        aiType: AIType
        aiContext: AIContext
    }
}
