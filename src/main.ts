import { Creep } from "game/prototypes";
import { getObjectsByPrototype } from "game/utils";

export function loop() {
    const creeps: Creep[] = getObjectsByPrototype(Creep)
    for (let creep of creeps) {
        console.log("My creep ID is " + creep.id)
    }
}
