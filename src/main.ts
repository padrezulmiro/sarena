import {
    Creep,
    OwnedStructure,
    StructureSpawn,
} from "game/prototypes";

import {
    getObjectsByPrototype
} from "game/utils";
import { gameState, updateGameState } from "./state";
import {} from "./spawn";

export function loop() {
    updateGameState()
    console.log(gameState)

    const myCreeps = getObjectsByPrototype(Creep).filter((creep) => creep.my)
    const myStructures = getObjectsByPrototype(OwnedStructure)
        .filter((structure) => structure.my)

    for (let creep of myCreeps) {
        creep.loop()
    }

    // TODO
    // for (let structure of myStructures) {
    //     structure.loop()
    // }

    const spawn: StructureSpawn | undefined =
        getObjectsByPrototype(StructureSpawn)[0]
    spawn?.loop()
}
