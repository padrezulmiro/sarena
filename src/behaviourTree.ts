import { OK, RESOURCE_ENERGY } from "game/constants";
import {
    Creep,
    Source,
    StructureSpawn,
    type GameObject,
} from "game/prototypes";
import { getObjectsByPrototype, getRange } from "game/utils";

export type BTreeType =
    "depositEnergy" |
    "harvestEnergy"

export type BTNodeType =
    "sequence" |
    "select" |
    "negate" |
    "action"

export type BTActionType =
    "harvest" |
    "deposit" |
    "adjacentTo" |
    "moveTo"

type BTNodeJSON = {
    id: string;
    name: BTNodeType
    title: string;
    description: string;
    properties: Record<string, string>;
    child?: string;
    children?: string[];
}

export type BTreeJSON = {
    root: string
    title: BTreeType
    properties: Record<string, string>
    nodes: Record<string, BTNodeJSON>
}

export type BTreesJSON = {
    trees: BTreeJSON[]
}

type BTExecuteFn = (agent: GameObject) => boolean

export type BTNode = {
    _children: BTNode[];
    id: string;
    execute: BTExecuteFn;
}

const BTExecuteFnMap: Record<string, BTExecuteFn> = {
    "harvest": harvest,
    "deposit": deposit,
    "adjacentTo": adjacentTo,
    "moveTo": moveTo
}

export function BTreesFromJSON(json: BTreesJSON):
Partial<Record<BTreeType, BTNode>> {
    const trees: Partial<Record<BTreeType, BTNode>> = {}
    for (let treeJSON of json.trees) {
        let transversalStack = [treeJSON.root]
        const builtNodes = new Map<string, BTNode>()

        while (transversalStack.length != 0) {
            const currentNodeJSON: BTNodeJSON = treeJSON.nodes[
                transversalStack[transversalStack.length-1]!
            ]!

            // Children aren't built, push to stack and iterate again
            if (!childrenBuilt(currentNodeJSON, builtNodes)) {
                if (currentNodeJSON.child) {
                    transversalStack.push(currentNodeJSON.child)
                } else if (currentNodeJSON.children) {
                    transversalStack = transversalStack
                        .concat(currentNodeJSON.children)
                }
                continue
            }

            // Node is ready to be built
            const btNode = buildBTNode(currentNodeJSON, builtNodes)
            builtNodes.set(currentNodeJSON.id, btNode)
            transversalStack.pop()
        }

        trees[treeJSON.title] = builtNodes.get(treeJSON.root)!
    }

    return trees
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

function buildBTNode(nodeJSON: BTNodeJSON,
                     builtNodes: Map<string, BTNode>): BTNode {
    let executeFn: BTExecuteFn = () => {return false}
    switch (nodeJSON.name) {
        case "sequence":
            executeFn = sequenceBTNodeExecute
            break
        case "select":
            executeFn = selectorBTNodeExecute
            break
        case "negate":
            executeFn = negateBTNodeExecute
            break
        case "action":
            executeFn = BTExecuteFnMap[nodeJSON.properties["fn"]!]!
            // executeFn = log as BTExecuteFn
            break

    }

    const children: BTNode[] = []
    if (nodeJSON.child) {
        children.push(builtNodes.get(nodeJSON.child)!)
    } else if (nodeJSON.children) {
        for (let child of nodeJSON.children) {
            children.push(builtNodes.get(child)!)
        }
    }

    return {
        _children: children,
        id: nodeJSON.id,
        execute: executeFn
    }
}

function sequenceBTNodeExecute(this: BTNode, agent: GameObject): boolean {
    let ret = false
    for (let child of this._children) {
        ret = child.execute(agent)
        if (!ret) {
            break
        }
    }
    return ret
}

function selectorBTNodeExecute(this: BTNode, agent: GameObject): boolean {
    let ret = false
    for (let child of this._children) {
        ret = child.execute(agent)
        if (ret) {
            break
        }
    }
    return ret
}

function negateBTNodeExecute(this: BTNode, agent: GameObject): boolean {
    const ret = this._children[0]!.execute(agent)
    return !ret
}

/*************************************/
/* SECTION: Behaviour trees' actions */
/*************************************/

function harvest(agent: GameObject): boolean {
    let ret = false
    if (agent instanceof Creep) {
        const sources = getObjectsByPrototype(Source)
        ret = agent.harvest(agent.findClosestByPath(sources)!) == OK
    }
    return ret
}

function isStoreFull(agent: GameObject): boolean {
    let ret = false
    if (agent instanceof Creep) {
        ret = agent.store.getFreeCapacity(RESOURCE_ENERGY) == 0
    }
    return ret
}

function isStoreEmpty(agent: GameObject): boolean {
    let ret = false
    if (agent instanceof Creep) {
        ret = agent.store.getUsedCapacity(RESOURCE_ENERGY) == 0
    }
    return ret
}

function adjacentTo(agent: GameObject): boolean {
    const ret = getRange(agent, agent.aiContext["target"]) == 1
    return ret
}

function deposit(agent: GameObject): boolean {
    let ret = false
    if (agent instanceof Creep) {
        const source = agent
            .findClosestByPath(getObjectsByPrototype(StructureSpawn))!
        ret = agent.transfer(source, RESOURCE_ENERGY) == OK
    }
    return ret
}

function moveTo(agent: GameObject): boolean {
    let ret = false
    if (agent instanceof Creep) {
        ret = agent.moveTo(agent.aiContext["target"]) == OK
    }
    return ret
}
