import type {
	MultiSocketNodeGraphBase,
	NodeEdgeBase,
	NodeTypeBase,
	SocketTypeBase,
} from "./index.ts";

enum TestSocketTypesEnum {
	STRING = "STRING",
	STRING_ARRAY = "STRING_ARRAY",
	NUMBER = "NUMBER",
}

type TestSocketTypes = typeof TestSocketTypesEnum;

enum TestNodeTypesEnum {
	STRING_FILTER = "STRING_FILTER",
	NUMBER_TO_STRING = "NUMBER_TO_STRING",
	STRING_ARRAY_PROVIDER = "STRING_ARRAY_PROVIDER",
	STRING_ARRAY_RENDERER = "STRING_ARRAY_RENDERER",
}

type TestNodeTypes = typeof TestNodeTypesEnum;

type MyAppSocketTypesMap = {
	[T in TestSocketTypesEnum]: {
		[TestSocketTypesEnum.STRING]: string;
		[TestSocketTypesEnum.NUMBER]: number;
		[TestSocketTypesEnum.STRING_ARRAY]: string[];
	}[T];
};

//////////////////
// Socket Types //
//////////////////

type MyAppSocket<T extends TestSocketTypesEnum> = SocketTypeBase<
	TestSocketTypes,
	MyAppSocketTypesMap,
	T,
	MyAppNodeTypes,
	MyAppEdgeTypes,
	MyNodeTree
>;

type StringSocket = MyAppSocket<TestSocketTypesEnum.STRING>;
type StringArraySocket = MyAppSocket<TestSocketTypesEnum.STRING_ARRAY>;
type NumberSocket = MyAppSocket<TestSocketTypesEnum.NUMBER>;

type MyAppNodeNamedIO = {
	[key: string]: MyAppSocketTypes;
};

type MyAppSocketTypes = MyAppSocket<TestSocketTypesEnum>;
type MyAppNodeTypes = MyAppNodes<
	TestNodeTypesEnum,
	MyAppNodeNamedIO,
	MyAppNodeNamedIO
>;
type MyAppEdgeTypes = NodeEdgeBase<MyAppSocketTypes, MyAppNodeTypes>;

////////////////
// Node Types //
////////////////

type MyAppNodes<
	T extends TestNodeTypesEnum,
	U extends MyAppNodeNamedIO,
	V extends MyAppNodeNamedIO,
> = NodeTypeBase<TestNodeTypes, T, MyAppSocketTypes, MyNodeTree, U, V> & {
	id: string;
};

type StringFilterNode = MyAppNodes<
	TestNodeTypesEnum.STRING_FILTER,
	{ input: StringArraySocket },
	{ output: StringArraySocket }
>;

type NumberToStringNode = MyAppNodes<
	TestNodeTypesEnum.NUMBER_TO_STRING,
	{ input: NumberSocket },
	{ output: StringSocket }
>;

type StringArrayProviderNode = MyAppNodes<
	TestNodeTypesEnum.STRING_ARRAY_PROVIDER,
	Record<string, never>,
	{ output: StringArraySocket }
>;

type StringArrayRendererNode = MyAppNodes<
	TestNodeTypesEnum.STRING_ARRAY_RENDERER,
	{ input: StringArraySocket },
	Record<string, never>
>;

/////////////////////
// TypeCheck tests //
/////////////////////

const stringSocketInvalidValue: StringSocket = {
	// @ts-expect-error -- should error
	defaultValue: 2,
};

// @ts-expect-error -- missing keys
const stringSocket: StringSocket = {
	defaultValue: "test",
};

// @ts-expect-error -- missing keys
const stringArraySocket: StringArraySocket = {
	defaultValue: [],
}; // @ts-expect-error -- missing keys
const stringFilterOutputSocket: StringArraySocket = {
	defaultValue: [],
};

// @ts-expect-error -- missing keys
const stringArrayProviderSocket: StringArraySocket = {
	defaultValue: ["t", "e", "s", "t"],
};

// @ts-expect-error -- missing keys
const numberSocket: NumberSocket = {
	defaultValue: 2,
};

// @ts-expect-error - missing keys
const stringFilterNode: StringFilterNode = {
	nodeType: TestNodeTypesEnum.STRING_FILTER,
	inputs: {
		input: stringArraySocket,
	},
	outputs: {
		output: stringArraySocket,
		// technically this should be a different one
	},
};

// @ts-expect-error - missing keys
const stringProviderNode: StringArrayProviderNode = {
	inputs: {},
	outputs: {
		output: stringArrayProviderSocket,
	},
};

// @ts-expect-error - missing keys
const numberToStrNode: NumberToStringNode = {
	inputs: {
		input: numberSocket,
	},
	outputs: {
		output: stringSocket,
	},
};

// @ts-expect-error - missing keys
const strArrayRendererNode: StringArrayRendererNode = {
	inputs: {
		input: stringArraySocket,
	},
	outputs: {},
};

/////////////////////////////////////
// TypeCheck Full Integration test //
/////////////////////////////////////

type MyNodeTree =
	& MultiSocketNodeGraphBase<
		TestSocketTypes,
		TestNodeTypes,
		MyAppSocketTypesMap,
		MyAppSocketTypes,
		MyAppNodeTypes,
		MyAppEdgeTypes,
		MyNodeTree
	>
	& {
		addNode: (node: MyAppNodeTypes) => void;
	};

// In reality, this node graph would be built as a class, where nodes instantiate their sockets etc.
export const mnt: MyNodeTree = {
	sockets: new Map<string, MyAppSocketTypes>([
		["1", stringSocketInvalidValue],
		["2", stringSocket],
		["3", stringArraySocket],
		["4", numberSocket],
		["5", stringArrayProviderSocket],
		["6", stringFilterOutputSocket],
	]),
	nodes: new Map<string, MyAppNodeTypes>([
		["node-id-0", stringProviderNode],
		["node-id-1", stringFilterNode],
		["node-id-2", numberToStrNode],
	]),
	edges: new Map<string, MyAppEdgeTypes>([
		[
			"edge-1",
			{
				sourceNode: stringFilterNode,
				sourceSocket: stringArrayProviderSocket,
				targetNode: strArrayRendererNode,
				targetSocket: numberSocket,
			},
		],
	]),

	addNode(node) {
		node.id = `node-${Math.random()}`;
		this.nodes.set(node.id, node);
	},
};
