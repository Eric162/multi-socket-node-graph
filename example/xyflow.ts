import type {
	MultiSocketNodeGraphBase,
	NodeEdgeBase,
	NodeNamedIO,
	NodeTypeBase,
	NodeTypeEnumKeyToNodeTypeMap,
	SocketTypeBase,
	SocketTypeEnumKeyToSocketTypeMap,
	StringEnum,
	TypeMap,
} from "@multi-socket-node-graph/types";

export interface SocketType<
	TSocketsEnum extends StringEnum,
	TMap extends TypeMap<TSocketsEnum>,
	TSocketType extends keyof TSocketsEnum,
	TNodes,
	TEdges,
	TNodeGraph,
> extends
	SocketTypeBase<
		TSocketsEnum,
		TMap,
		TSocketType,
		TNodes,
		TEdges,
		TNodeGraph
	> {
	id: string;
	renderId: number;
}

export interface NodeType<
	TNodesEnum extends StringEnum,
	TNodeType extends keyof TNodesEnum,
	TSockets,
	TNodeGraph,
	TInputs extends NodeNamedIO<TSockets>,
	TOutputs extends NodeNamedIO<TSockets>,
> extends
	NodeTypeBase<
		TNodesEnum,
		TNodeType,
		TSockets,
		TNodeGraph,
		TInputs,
		TOutputs
	> {
	id: string;
	renderId: number;
	name: string;

	// imaginary xyflow positioning
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface NodeEdge<TSockets, TNodes>
	extends NodeEdgeBase<TSockets, TNodes> {
	id: string;
	renderId: string;
}

export interface MultiSocketNodeGraph<
	TSocketsEnum extends StringEnum,
	TNodesEnum extends StringEnum,
	TMap extends TypeMap<TSocketsEnum>,
	TSockets extends SocketTypeEnumKeyToSocketTypeMap<
		TSocketsEnum,
		TSockets
	>[keyof TSocketsEnum],
	TNodes extends NodeTypeEnumKeyToNodeTypeMap<
		TNodesEnum,
		TSockets,
		TNodeGraph
	>[keyof TNodesEnum],
	TEdges extends NodeEdgeBase<TSockets, TNodes>,
	TNodeGraph extends MultiSocketNodeGraph<
		TSocketsEnum,
		TNodesEnum,
		TMap,
		TSockets,
		TNodes,
		TEdges,
		TNodeGraph
	>,
> extends
	MultiSocketNodeGraphBase<
		TSocketsEnum,
		TNodesEnum,
		TMap,
		TSockets,
		TNodes,
		TEdges,
		TNodeGraph
	> {
	addNode: (node: TNodes) => void;
	addEdge: (edge: TEdges) => void;
	addSocket: (socket: TSockets) => void;
}
