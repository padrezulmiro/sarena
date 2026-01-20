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
import { BTreesFromJSON, type BTreesJSON } from "./behaviourTree";
import bTreesJSON from "../btrees/sarena-btrees.json"
import { ais } from "./ai";

export const bTrees = BTreesFromJSON(bTreesJSON as BTreesJSON)

export function loop() {
    updateGameState()
    console.log(gameState)

    const myCreeps = getObjectsByPrototype(Creep).filter((creep) => creep.my)
    const myStructures = getObjectsByPrototype(OwnedStructure)
        .filter((structure) => structure.my)

    for (let creep of myCreeps) {
        ais[creep.aiType]!.run(creep)
    }

    // TODO
    // for (let structure of myStructures) {
    //     structure.loop()
    // }

    const spawn = getObjectsByPrototype(StructureSpawn)[0]
    spawn?.loop()
}
