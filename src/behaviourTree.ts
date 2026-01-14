import { OK, RESOURCE_ENERGY } from "game/constants";
import { Source, type Creep, type GameObject } from "game/prototypes";
import { getObjectsByPrototype } from "game/utils";

type BTAction = (creep: Creep, ...rest: any[]) => boolean

export type BTNode = {
    _actions: Map<string, BTAction>
    _children: BTNode[];
    execute(target: GameObject): boolean;
}

export type BTreeJSON = {
    root: string;
    properties: Record<string, string>;
    nodes: Record<string, BTNodeJSON>;
}

type BTNodeJSON = {
    id: string;
    name: string;
    title: string;
    description: string;
    properties: Record<string, string>;
    child?: string;
    children?: string[];
}

const BTActionMap: Record<string, BTAction> = {
    "harvest": harvest,
    "isStoreEmpty": isStoreEmpty,
    "isStoreFull": isStoreFull,
    "deposit": deposit,
    "adjacentTo": adjacentTo,
}


export function BTreeFromJSON(json: BTreeJSON): BTNode {
    const transversalStack = [json.root]
    const builtNodes = new Map<string, BTNode>()
    while (transversalStack.length != 0) { // FIXME
        const currentNodeJSON =
            json.nodes[transversalStack.pop()!] as BTNodeJSON

        if (currentNodeJSON.child) {
            transversalStack.push(currentNodeJSON.child)
        } else if (currentNodeJSON.children){
            transversalStack.concat(currentNodeJSON.children)
        } else {
            // TODO
        }
    }

    // @ts-ignore
    return {}
}

/*************************************/
/* SECTION: Behaviour trees' actions */
/*************************************/

function harvest(creep: Creep): boolean {
    const ret = creep.harvest(creep.findClosestByPath(getObjectsByPrototype(Source))!)
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
