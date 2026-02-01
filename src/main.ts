import {
    Creep,
    OwnedStructure,
    Source,
    StructureSpawn,
} from "game/prototypes";

import {
    findClosestByRange,
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

        bTrees: {
            harvestEnergy: bTrees.harvestEnergy!,
            depositEnergy: bTrees.depositEnergy!
        },

        run(harvester: Creep) {
            if (!harvester.aiContext["state"]) {
                harvester.aiContext["state"] = "harvest"
                harvester.aiContext["target"] =
                    findClosestByRange(harvester, getObjectsByPrototype(Source))
            }

            const harvestToDepositTransition =
                harvester.aiContext["state"] == "harvest" &&
                harvester.store.getFreeCapacity(RESOURCE_ENERGY) == 0
            const depositToHavestTransition =
                harvester.aiContext["state"] == "deposit" &&
                harvester.store.getUsedCapacity(RESOURCE_ENERGY) == 0

            if (harvestToDepositTransition) {
                harvester.aiContext["state"] = "deposit"
                harvester.aiContext["target"] = findClosestByRange(
                    harvester, getObjectsByPrototype(StructureSpawn))
            } else if (depositToHavestTransition) {
                harvester.aiContext["state"] = "harvest"
                harvester.aiContext["target"] =
                    findClosestByRange(harvester, getObjectsByPrototype(Source))
            }

            switch (harvester.aiContext["state"]) {
                case "harvest":
                    this.bTrees!.harvestEnergy!.execute(harvester)
                    break
                case "deposit":
                    this.bTrees!.depositEnergy!.execute(harvester)
                    break
            }
        }
    }

    const soldierAI: AI & { state: "attack" | "move" } = {
        type: "soldier",
        state: "move",

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
