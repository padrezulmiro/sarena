import {
    Creep,
    OwnedStructure,
    StructureSpawn,
} from "game/prototypes";

import {
    getObjectsByPrototype
} from "game/utils";
import {
    gameState,
    updateGameState
} from "./state";
import {} from "./spawn";
import {
    BTreesFromJSON,
    type BTNode,
    type BTreesJSON,
    type BTreeType
} from "./behaviourTree";
import { type AI, type AIType } from "./ai";
import { B_TREES_JSON } from "./btrees/btrees";
import {
    ATTACK,
    CARRY,
    MOVE,
    RESOURCE_ENERGY,
    WORK
} from "game/constants";
import { CreepBlueprint } from "./creep";

export let bTrees: Partial<Record<BTreeType, BTNode>>
export let ais: Partial<Record<AIType, AI>>
export let blueprints: Partial<Record<string, CreepBlueprint>>

function initDecls(): void {
    // Behaviour Tree declarations
    bTrees = BTreesFromJSON(B_TREES_JSON as BTreesJSON)

    // AI declarations
    const harvesterAI: AI = {
        type: "harvester",
        context: {
            state: "harvest"
        },

        bTrees: {
            harvestEnergy: bTrees.harvestEnergy!,
            depositEnergy: bTrees.depositEnergy!
        },

        run(harvester: Creep) {
            if (
                this.context["state"] == "harvest" &&
                harvester.store.getFreeCapacity(RESOURCE_ENERGY) == 0
            ) {
                this.context["state"] = "deposit"
            } else if (
                this.context["state"] == "deposit" &&
                harvester.store.getUsedCapacity(RESOURCE_ENERGY) == 0
            ) {
                this.context["state"] = "harvest"
            }

            switch (this.context["state"]) {
                case "harvest":
                    this.bTrees!.harvestEnergy!.execute(this.context, harvester)
                    break
                case "deposit":
                    this.bTrees!.depositEnergy!.execute(this.context, harvester)
                    break
            }
        }
    }

    const soldierAI: AI & { state: "attack" | "move" } = {
        type: "soldier",
        state: "move",
        context: {},

        run(soldier: Creep) {
            // Choose direction when far from targets
            // Maybe there's a more efficient heuristic to choose a direction without
            // iterating over the weighted ranges to every enemy target

            // const inRangeToClosestTarget = findClosestByPath(fromPos, positions)
        }
    }

    ais = {
        harvester: harvesterAI
    }

    blueprints = {
        harvester: new CreepBlueprint([MOVE, CARRY, WORK]),
        soldier: new CreepBlueprint([MOVE, ATTACK, ATTACK])
    }
}

initDecls()

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
