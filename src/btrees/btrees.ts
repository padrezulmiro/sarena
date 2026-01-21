export const B_TREES_JSON = {
  "version": "0.3.0",
  "scope": "project",
  "selectedTree": "852d5db9-9b10-407e-8d09-30b9163fea45",
  "trees": [
    {
      "version": "0.3.0",
      "scope": "tree",
      "id": "ff1c04c0-348b-451a-94a8-8f930d01b241",
      "title": "harvestEnergy",
      "description": "The root of this tree.  The title of this node sets the title of the tree.  You must have one tree called \"Root\".  You can set tree-wide properties on this node and reference them in other places with the following template syntax: `{{key_name}}`.",
      "root": "b0c38839-c60a-49eb-b865-9ce1d5c9dd8b",
      "properties": {},
      "nodes": {
        "9af7cf7d-fb93-4dd1-b435-1bc8254a9f40": {
          "id": "9af7cf7d-fb93-4dd1-b435-1bc8254a9f40",
          "name": "sequence",
          "title": "Sequence",
          "description": "Takes multiple children and runs them from top to bottom (or left to right).  If any fail, this node fails, if all succeed, this node succeeds.",
          "properties": {},
          "display": {
            "x": -168,
            "y": 216
          },
          "children": [
            "70730d0e-668e-4afc-8390-075f90874c51",
            "a6dacf2e-2d03-4bad-807f-3c6331ce69e2"
          ]
        },
        "b0c38839-c60a-49eb-b865-9ce1d5c9dd8b": {
          "id": "b0c38839-c60a-49eb-b865-9ce1d5c9dd8b",
          "name": "select",
          "title": "Select",
          "description": "Takes multiple children and runs them from top to bottom (or left to right), succeeding when any one succeeds.  Fails if all fail.",
          "properties": {},
          "display": {
            "x": -12,
            "y": 84
          },
          "children": [
            "9af7cf7d-fb93-4dd1-b435-1bc8254a9f40",
            "f8d39945-9684-4c06-a29f-4492ffeb3a57"
          ]
        },
        "153abb1f-b10a-451b-8e2a-f249fd47af04": {
          "id": "153abb1f-b10a-451b-8e2a-f249fd47af04",
          "name": "action",
          "title": "Adjacent to <target>?",
          "description": "",
          "properties": {
            "fn": "adjacentTo",
            "target": "source"
          },
          "display": {
            "x": -276,
            "y": 480
          }
        },
        "a6dacf2e-2d03-4bad-807f-3c6331ce69e2": {
          "id": "a6dacf2e-2d03-4bad-807f-3c6331ce69e2",
          "name": "action",
          "title": "Move to <target>",
          "description": "",
          "properties": {
            "fn": "moveTo",
            "target": "source"
          },
          "display": {
            "x": -72,
            "y": 348
          }
        },
        "f8d39945-9684-4c06-a29f-4492ffeb3a57": {
          "id": "f8d39945-9684-4c06-a29f-4492ffeb3a57",
          "name": "action",
          "title": "Harvest",
          "description": "",
          "properties": {
            "fn": "harvest"
          },
          "display": {
            "x": 144,
            "y": 216
          }
        },
        "70730d0e-668e-4afc-8390-075f90874c51": {
          "id": "70730d0e-668e-4afc-8390-075f90874c51",
          "name": "negate",
          "title": "Negate",
          "description": "Takes one child.  If that child succeeds, this node fails, and vice versa.",
          "properties": {},
          "display": {
            "x": -276,
            "y": 348
          },
          "child": "153abb1f-b10a-451b-8e2a-f249fd47af04"
        }
      },
      "display": {
        "camera_x": 715.0000160120866,
        "camera_y": 120.99753129847991,
        "camera_z": 0.75,
        "x": -12,
        "y": -36
      }
    },
    {
      "version": "0.3.0",
      "scope": "tree",
      "id": "852d5db9-9b10-407e-8d09-30b9163fea45",
      "title": "depositEnergy",
      "description": "The root of this tree.  The title of this node sets the title of the tree.  You must have one tree called \"Root\".  You can set tree-wide properties on this node and reference them in other places with the following template syntax: `{{key_name}}`.",
      "root": "df583b6c-9710-41ab-8d27-134f08343b83",
      "properties": {},
      "nodes": {
        "200ed894-aada-45ee-864a-b58b79b65c65": {
          "id": "200ed894-aada-45ee-864a-b58b79b65c65",
          "name": "sequence",
          "title": "Sequence",
          "description": "Takes multiple children and runs them from top to bottom (or left to right).  If any fail, this node fails, if all succeed, this node succeeds.",
          "properties": {},
          "display": {
            "x": -156,
            "y": 252
          },
          "children": [
            "6fd67a9d-882e-4c14-85a5-cef60e05f84a",
            "9cfd67d0-b3ef-432f-b013-2e8eda49e65a"
          ]
        },
        "df583b6c-9710-41ab-8d27-134f08343b83": {
          "id": "df583b6c-9710-41ab-8d27-134f08343b83",
          "name": "select",
          "title": "Select",
          "description": "Takes multiple children and runs them from top to bottom (or left to right), succeeding when any one succeeds.  Fails if all fail.",
          "properties": {},
          "display": {
            "x": 0,
            "y": 120
          },
          "children": [
            "200ed894-aada-45ee-864a-b58b79b65c65",
            "c2a7634d-cf8b-460b-85bf-e25f1c8bc22e"
          ]
        },
        "039fb604-f3c1-42c6-8170-8f6cf7cad346": {
          "id": "039fb604-f3c1-42c6-8170-8f6cf7cad346",
          "name": "action",
          "title": "Adjacent to <target>?",
          "description": "",
          "properties": {
            "fn": "adjacentTo",
            "target": "store"
          },
          "display": {
            "x": -264,
            "y": 516
          }
        },
        "9cfd67d0-b3ef-432f-b013-2e8eda49e65a": {
          "id": "9cfd67d0-b3ef-432f-b013-2e8eda49e65a",
          "name": "action",
          "title": "Move to <target>",
          "description": "",
          "properties": {
            "fn": "moveTo",
            "target": "store"
          },
          "display": {
            "x": -60,
            "y": 384
          }
        },
        "c2a7634d-cf8b-460b-85bf-e25f1c8bc22e": {
          "id": "c2a7634d-cf8b-460b-85bf-e25f1c8bc22e",
          "name": "action",
          "title": "Deposit",
          "description": "",
          "properties": {
            "fn": "deposit"
          },
          "display": {
            "x": 156,
            "y": 252
          }
        },
        "6fd67a9d-882e-4c14-85a5-cef60e05f84a": {
          "id": "6fd67a9d-882e-4c14-85a5-cef60e05f84a",
          "name": "negate",
          "title": "Negate",
          "description": "Takes one child.  If that child succeeds, this node fails, and vice versa.",
          "properties": {},
          "display": {
            "x": -264,
            "y": 384
          },
          "child": "039fb604-f3c1-42c6-8170-8f6cf7cad346"
        }
      },
      "display": {
        "camera_x": 714.0000133434054,
        "camera_y": 128.00124003901243,
        "camera_z": 0.75,
        "x": 0,
        "y": 0
      }
    }
  ],
  "custom_nodes": [
    {
      "version": "0.3.0",
      "scope": "node",
      "name": "action",
      "category": "action",
      "title": "Action",
      "description": null,
      "properties": {}
    }
  ]
}
