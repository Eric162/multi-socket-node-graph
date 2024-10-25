// This is the base structure of a typed multi-socket-node-graph

/**
 * Represents an enum where the values are strings. Ideally, the keys are also strings which match
 * the values of the enum
 */
export interface StringEnum {
	[id: string]: string;
	[nu: number]: string;
	[sy: symbol]: string;
}

export type TypeMap<TSocketsEnum extends StringEnum> = {
	[T in keyof TSocketsEnum]: unknown;
};

export interface SocketTypeBase<
	TSocketsEnum extends StringEnum,
	TMap extends TypeMap<TSocketsEnum>,
	TSocketType extends keyof TSocketsEnum,
	TNodes,
	TEdges,
	TNodeGraph,
> {
	ownerNode: TNodes;
	ownerGraph: TNodeGraph;
	linkedEdges: Map<string, TEdges>;
	defaultValue: TMap[TSocketType];
	value: TMap[TSocketType];
	typeName: TSocketType;
}

export type SocketTypeEnumKeyToSocketTypeMap<
	TSocketsEnum extends StringEnum,
	TSockets,
> = {
	[x in keyof TSocketsEnum]: TSockets;
};

export interface NodeNamedIO<TSockets> {
	[key: string]: TSockets;
}

export type NodeTypeEnumKeyToNodeTypeMap<
	TNodesEnum extends StringEnum,
	TSockets,
	TNodeGraph,
> = {
	[T in keyof TNodesEnum]: NodeTypeBase<
		TNodesEnum,
		T,
		TSockets,
		TNodeGraph,
		NodeNamedIO<TSockets>,
		NodeNamedIO<TSockets>
	>;
};

export interface NodeTypeBase<
	TNodesEnum extends StringEnum,
	TNodeType extends keyof TNodesEnum,
	TSockets,
	TNodeGraph,
	TInputs extends NodeNamedIO<TSockets>,
	TOutputs extends NodeNamedIO<TSockets>,
> {
	inputs: TInputs;
	outputs: TOutputs;
	owner: TNodeGraph;
	nodeType: TNodeType;
}

// As far as I can tell, there's not a good way to tie the types of the source and target sockets
// together. We can use a distributive conditional type, but it doesn't work for simple object
// definitions when adding edges.
//
// It's most likely cleaner and easier to do runtime checking of the source/target socket types
// when adding edges.
export interface NodeEdgeBase<TSockets, TNodes> {
	sourceNode: TNodes;
	sourceSocket: TSockets;
	targetNode: TNodes;
	targetSocket: TSockets;
}

/** */
export interface MultiSocketNodeGraphBase<
	TSocketsEnum extends StringEnum,
	TNodeEnum extends StringEnum,
	TMap extends TypeMap<TSocketsEnum>,
	TSockets extends SocketTypeEnumKeyToSocketTypeMap<
		TSocketsEnum,
		TSockets
	>[keyof TSocketsEnum],
	TNodes extends NodeTypeEnumKeyToNodeTypeMap<
		TNodeEnum,
		TSockets,
		TNodeGraph
	>[keyof TNodeEnum],
	TEdges extends NodeEdgeBase<TSockets, TNodes>,
	TNodeGraph extends MultiSocketNodeGraphBase<
		TSocketsEnum,
		TNodeEnum,
		TMap,
		TSockets,
		TNodes,
		TEdges,
		TNodeGraph
	>,
> {
	sockets: Map<string, TSockets>;
	nodes: Map<string, TNodes>;
	edges: Map<string, TEdges>;
}
