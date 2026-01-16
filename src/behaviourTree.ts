import { OK, RESOURCE_ENERGY } from "game/constants";
import { Source, type Creep, type GameObject } from "game/prototypes";
import { getObjectsByPrototype } from "game/utils";

type BTNodeJSON = {
    id: string;
    name: "sequence" | "selector" | "action";
    title: string;
    description: string;
    properties: Record<string, string>;
    child?: string;
    children?: string[];
}

export type BTreeJSON = {
    root: string;
    properties: Record<string, string>;
    nodes: Record<string, BTNodeJSON>;
}

export type BTreesJSON = {
    trees: BTreeJSON[]
}

type BTAction = (creep: Creep, ...rest: any[]) => boolean

export type BTNode = {
    _children: BTNode[];
    execute(target: GameObject): boolean;
}

const BTActionMap: Record<string, BTAction> = {
    "harvest": harvest,
    "isStoreEmpty": isStoreEmpty,
    "isStoreFull": isStoreFull,
    "deposit": deposit,
    "adjacentTo": adjacentTo,
}

export function BTreesFromJSON(json: BTreesJSON): Record<string, BTNode> {
    for (let tree of json.trees) {

        const transversalStack = [tree.root]
        const builtNodes = new Map<string, BTNode>()

        while (transversalStack.length != 0) { // FIXME
            const currentNodeJSON =
                tree.nodes[transversalStack.pop()!] as BTNodeJSON

            // Children aren't built, push to stack and iterate again
            if (!childrenBuilt(currentNodeJSON, builtNodes)) {
                if (currentNodeJSON.child) {
                    transversalStack.push(currentNodeJSON.child)
                } else if (currentNodeJSON.children) {
                    transversalStack.concat(currentNodeJSON.children)
                }
                continue
            }

            // Node is ready to be built
            const btNode = {

            }
        }
    }

    // @ts-ignore
    return {}
}

function childrenBuilt(currentNodeJSON: BTNodeJSON,
                       builtNodes: Map<string, BTNode>): boolean {
    let built = true

    if (currentNodeJSON.child) {
        built = builtNodes.has(currentNodeJSON.child)
    } else if (currentNodeJSON.children) {
        for (let child of currentNodeJSON.children) {
            if (!builtNodes.has(child)) {
                built = false
                break
            }
        }
    }

    return built
}

function buildBTNode(nodeJSON: BTNodeJSON, builtNodes: Map<string, BTNode>) {
    let executeFn
    switch (nodeJSON.name) {
        case "sequence":
            executeFn = sequenceBTNodeExecute
            break
        case "selector":
            executeFn = selectorBTNodeExecute
            break
        case "action":
            executeFn = sequenceBTNodeExecute // FIXME
            break
    }
}

function sequenceBTNodeExecute(this: BTNode, creep: Creep): boolean {
    let ret = false
    for (let child of this._children) {
        ret = child.execute(creep)
        if (!ret) {
            break
        }
    }
    return ret
}

function selectorBTNodeExecute(this: BTNode, creep: Creep): boolean {
    let ret = false
    for (let child of this._children) {
        ret = child.execute(creep)
        if (ret) {
            break
        }
    }
    return ret
}

/*************************************/
/* SECTION: Behaviour trees' nodes */
/*************************************/



/*************************************/
/* SECTION: Behaviour trees' actions */
/*************************************/

function harvest(creep: Creep): boolean {
    const sources = getObjectsByPrototype(Source)
    const ret = creep.harvest(creep.findClosestByPath(sources)!)
    return ret == OK
}

function isStoreFull(creep: Creep): boolean {
    return creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0
}

function isStoreEmpty(creep: Creep): boolean {
    return creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0
}

function adjacentTo(creep: Creep, target: GameObject): boolean {

    return false // TODO
}

function deposit(creep: Creep): boolean {

}
