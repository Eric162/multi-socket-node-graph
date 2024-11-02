import type {
  MultiSocketNodeGraph,
  NodeEdge,
  NodeType,
  SocketType,
} from "./xyflow.ts";

/////////////
// Sockets //
/////////////

export enum IOType {
  INPUT = 0,
  OUTPUT = 1,
}

export enum SocketsEnum {
  STRING = "STRING",
}

export type SocketTypesMap = {
  [T in SocketsEnum]: {
    [SocketsEnum.STRING]: string;
  }[T];
};
export type SocketTypes = typeof SocketsEnum;

export interface Socket<T extends SocketsEnum> extends
  SocketType<
    SocketTypes,
    SocketTypesMap,
    T,
    MMGraphNode,
    MMGraphEdge,
    MMGraph
  > {
  ioType: IOType;
}

///////////
// Nodes //
///////////

export enum NodesEnum {
  STRING_FILTER_INPUT = "STRING_FILTER_INPUT",
}
export type NodeTypes = typeof NodesEnum;

type NodeIO = {
  [key: string]: MMGraphSocket;
};

export type GraphNode<
  T extends NodesEnum,
  TInputs extends NodeIO,
  TOutputs extends NodeIO,
> = NodeType<NodeTypes, T, MMGraphSocket, MMGraph, TInputs, TOutputs> & {
  degree?: number;
  evaluate: ({ url }: { url: URL }) => Promise<void>;
  viewProperties?: ViewProperties<RenderersEnum>;
};

export interface MMGraph extends
  MultiSocketNodeGraph<
    SocketTypes,
    NodeTypes,
    SocketTypesMap,
    MMGraphSocket,
    MMGraphNode,
    MMGraphEdge,
    MMGraph
  > {
}

// Composed Types
export type MMGraphSocket = Socket<SocketsEnum>;
export type MMGraphNode = GraphNode<NodesEnum, NodeIO, NodeIO>;
export type MMGraphEdge = NodeEdge<MMGraphSocket, MMGraphNode>;

