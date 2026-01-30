import { OK, RESOURCE_ENERGY } from "game/constants";
import {
    Creep,
    Source,
    type GameObject,
    type Position
} from "game/prototypes";
import { getObjectsByPrototype } from "game/utils";

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

type BTExecuteFn = (context: Record<string, any>, agent: GameObject) => boolean

export type BTNode = {
    _children: BTNode[];
    execute: BTExecuteFn
}

const BTExecuteFnMap: Record<string, BTExecuteFn> = {
    "harvest": harvest,
    "store-empty": isStoreEmpty,
    "store-full": isStoreFull,
    "deposit": deposit,
    "adjacent-to": adjacentTo,
    "move-to": moveTo
}

export function BTreesFromJSON(json: BTreesJSON):
Partial<Record<BTreeType, BTNode>> {
    const trees: Partial<Record<BTreeType, BTNode>> = {}
    for (let treeJSON of json.trees) {
        const transversalStack = [treeJSON.root]
        const builtNodes = new Map<string, BTNode>()

        while (transversalStack.length != 0) { // FIXME
            const currentNodeJSON: BTNodeJSON =
                treeJSON.nodes[transversalStack.pop()!]!

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
            const btNode = buildBTNode(currentNodeJSON, builtNodes)
            builtNodes.set(currentNodeJSON.id, btNode)
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
            executeFn = sequenceBTNodeExecute as BTExecuteFn
            break
        case "select":
            executeFn = selectorBTNodeExecute as BTExecuteFn
            break
        case "action":
            // executeFn = BTActionMap[nodeJSON.properties["fn"]!]! as BTExecuteFn
            executeFn = log as BTExecuteFn
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
        execute: executeFn
    }
}

function sequenceBTNodeExecute(this: BTNode, context: Record<string, any>,
                               target: GameObject): boolean {
    let ret = false
    for (let child of this._children) {
        ret = child.execute(context, target)
        if (!ret) {
            break
        }
    }
    return ret
}

function selectorBTNodeExecute(this: BTNode, context: Record<string, any>,
                               creep: GameObject): boolean {
    let ret = false
    for (let child of this._children) {
        ret = child.execute(context, creep)
        if (ret) {
            break
        }
    }
    return ret
}

/*************************************/
/* SECTION: Behaviour trees' actions */
/*************************************/

function harvest(context: Record<string, any>, agent: GameObject): boolean {
    let fnRet = false
    if (agent instanceof Creep) {
        const sources = getObjectsByPrototype(Source)
        const ret = agent.harvest(agent.findClosestByPath(sources)!)
        fnRet = ret == OK
    }
    return fnRet
}

function isStoreFull(context: Record<string, any>, agent: GameObject): boolean {
    let ret = false
    if (agent instanceof Creep) {
        ret = agent.store.getFreeCapacity(RESOURCE_ENERGY) == 0
    }
    return ret
}

function isStoreEmpty(context: Record<string, any>, agent: GameObject): boolean {
    let ret = false
    if (agent instanceof Creep) {
        ret = agent.store.getUsedCapacity(RESOURCE_ENERGY) == 0
    }
    return ret
}

function adjacentTo(context: Record<string, any>, agent: GameObject): boolean {
    return false // TODO
}

function deposit(context: Record<string, any>, agent: GameObject): boolean {
    return false // TODO
}

function moveTo(context: Record<string, any>, agent: GameObject): boolean {
    let ret = false
    if (agent instanceof Creep) {
        ret = agent.moveTo(context["target"]) == OK
    }
    return ret
}

function log(context: Record<string, any>, agent: GameObject): boolean {
    console.log("Executing BTAction")
    return false
}
