import type { AI } from "./ai"

declare module "game/prototypes" {
    interface Creep {
        ai: AI
    }
}
