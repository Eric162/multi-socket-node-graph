import type { Writable } from "svelte/store";
import type { XYGraph as XYGraphType } from "../lib/example-xyflow.ts";
import type { Edge as XYFlowEdge, Node as XYFlowNode } from "@xyflow/svelte";
import { toStore } from "svelte/store";

export class XYFlowTweakPaneGraph implements XYGraphType {
	sockets = $state(new Map());
	nodes = $state(new Map());
	edges = $state(new Map());

	private _nodesStore: Writable<XYFlowNode[]>;
	private _edgesStore: Writable<XYFlowEdge[]>;

	constructor() {
		this._edgesStore = toStore(() => {
			return [...this.edges.values()];
		}, (edges) => {
			this.edges = new Map(...edges.map((edge) => [edge.id, edge]));
		});
		this._nodesStore = toStore(() => {
			return [...this.nodes.values()];
		}, (nodes) => {
			this.edges = new Map(...nodes.map((node) => [node.id, node]));
		});
	}

	addEdge() { }
	addNode() { }
	addSocket() { }
	get nodesStore() {
		return this._nodesStore;
	}
	get edgesStore() {
		return this._edgesStore;
	}
}

