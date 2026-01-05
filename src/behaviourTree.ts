import type { GameObject } from "game/prototypes";

export type BTNode = {
    children: BTNode[];
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
            // FIXME
        }
    }

    // FIXME
    // @ts-ignore
    return {}
}

// /**
//  * An game object that can be controlled by an AI using a behaviour tree
//  **/
// interface BTAgent {}
//
// interface BTreeJSON {
//     id: string
//     title: string
//     description: string
//     root: string
//     properties: Record<string, string>
//     nodes: Record<string, BTNodeJSON>
// }
//
// interface BTNodeJSON {
//     id: string
//     name: string
//     description: string
//     properties: Record<string, string>
//     children: string[] | null
//     child: string | null
// }
//
// interface BTNode {
//     execute(): boolean
//     fromJSON(json: BTNodeJSON): BTNode
// }
//
// class Tree<NodeType> {
//     root: NodeType
// }
//
// class Node<NodeType> {
//     value: NodeType
//     children: NodeType[]
// }
//
// export class BTree {
//     _id: string
//     _title: string
//     _description: string
//     _root: BTNode
//     _properties: Record<string, string>
//     _nodes: Record<string, BTNode>
// }
//
// class BTNode {
//     id: string
//     name: string
//     properties: Record<string, string>
//     children: BTNode[]
//
// }
//
// // function buildNodeTreeFromJSON(root: string, nodesJSON: Record<string, BTNodeJSON>):
// // Tree<BTNode> {
// //     const nodePool: Record<string, BTNode> = {}
// //     for (let nodeJSON of Object.values(nodesJSON)) {
// //         const btNode = new BTNode()
// //         btNode.id = nodeJSON.id
// //         btNode.name = nodeJSON.name
// //         btNode.properties = nodeJSON.properties
// //         nodePool[nodeJSON.id] = btNode
// //     }
// //
// //     for (let node of Object.values(nodePool)) {
// //         for (let childStr of nodesJSON[node.id]!.children!) {
// //
// //         }
// //     }
// //
// // }
//
// // function fromJSONToBTree(json: BTreeJSON): BTree {
// //     const bTree = new BTree()
// //     bTree._id = json.id
// //     bTree._title = json.title
// //     bTree._description = json.description
// //
// //     const nodeStringTree = new Tree<string>()
// //     nodeStringTree.root = json.root
// //
// //     const nodeMap = new Map<string, BTNode>()
// //     for (let nodeJSON of Object.values(json.nodes)) {
// //         const node = fromJSONToBTNode(nodeJSON)
// //         nodeMap.set(node._id, node)
// //     }
// //
// //     // Now that all nodes are created, the tree structure can be organized
// //
// // }
// //
// // function fromJSONToBTNode(json: BTNodeJSON): BTNode {
// //     const node = new BTNode()
// //     node._id = json.id
// //     node._name = json.name
// //     node._properties = json.properties
// //
// //     if (json.hasOwnProperty("children")) {
// //         node._children = json.children!
// //     } else if (json.hasOwnProperty("child")) {
// //         node._children = [json.child!]
// //     } else {
// //         node._children = []
// //     }
// //
// //     return node
// // }
// //
// // class SelectNode {}
// //
// // class MineNode {}
