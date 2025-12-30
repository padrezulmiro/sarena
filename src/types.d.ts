export interface Looper {
    loop(): void
}

declare module "game/prototypes" {
    interface OwnedStructure extends Looper {}
}
