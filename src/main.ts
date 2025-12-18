import {
    Creep,
    OwnedStructure,
    StructureSpawn,
} from "game/prototypes";

import {
    getObjectsByPrototype
} from "game/utils";

export function loop() {
    const myCreeps = getObjectsByPrototype(Creep).filter((creep) => creep.my)
    const myStructures = getObjectsByPrototype(OwnedStructure)
        .filter((structure) => structure.my)

    for (let creep of myCreeps) {
        creep.loop()
    }

    for (let structure of myStructures) {
        structure.loop()
    }

    const spawn: StructureSpawn | undefined =
        getObjectsByPrototype(StructureSpawn)[0]
    spawn?.loop()
}

