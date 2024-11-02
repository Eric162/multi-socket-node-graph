import {
  Checkbox,
  Color,
  CubicBezier,
  type CubicBezierValue,
  Image,
  type ImageValue,
  IntervalSlider,
  Point,
  type PointValue2d,
  type PointValue3d,
  type PointValue4d,
  Ring,
  RotationEuler,
  type RotationEulerValue,
  RotationQuaternion,
  type RotationQuaternionValue,
  Slider,
  Stepper,
  Text,
  Textarea,
  Wheel,
} from "svelte-tweakpane-ui";
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
  BOOLEAN = "BOOLEAN",
  NUMBER = "NUMBER",
  COLOR = "COLOR",
  CUBIC_BEZIER = "CUBIC_BEZIER",
  IMAGE = "IMAGE",
  INTERVAL = "INTERVAL",
  POINT_2D = "POINT_2D",
  POINT_3D = "POINT_3D",
  POINT_4D = "POINT_4D",
  ROTATION_EULER = "ROTATION_EULER",
  ROTATION_QUATERNION = "ROTATION_QUATERNION",
  // Too Dynamic (for now)
  // LIST
  // RADIO_GROUP
}

export type SocketTypesMap = {
  [T in SocketsEnum]: {
    [SocketsEnum.STRING]: string;
    [SocketsEnum.COLOR]: `#${string}`;
    [SocketsEnum.BOOLEAN]: boolean;
    [SocketsEnum.NUMBER]: number;
    [SocketsEnum.INTERVAL]: [number, number];
    [SocketsEnum.IMAGE]: ImageValue;
    [SocketsEnum.POINT_2D]: PointValue2d;
    [SocketsEnum.POINT_3D]: PointValue3d;
    [SocketsEnum.POINT_4D]: PointValue4d;
    [SocketsEnum.CUBIC_BEZIER]: CubicBezierValue;
    [SocketsEnum.ROTATION_EULER]: RotationEulerValue;
    [SocketsEnum.ROTATION_QUATERNION]: RotationQuaternionValue;
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
  // viewProperties?: ViewProperties<RenderersEnum>;
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

/////////////////////////////
////// Rendering Nodes //////
/////////////////////////////

export interface ViewProperties<T extends RenderersEnum> {
  component: T;
  props: ConstructorParameters<RENDERERS_MAP[T]>[0]["props"];
}

export enum RenderersEnum {
  Checkbox = "CHECKBOX",
  Color = "COLOR",
  CubicBezier = "CUBICBEZIER",
  Image = "IMAGE",
  IntervalSlider = "INTERVALSLIDER",
  Point = "POINT",
  Ring = "RING",
  RotationEuler = "ROTATIONEULER",
  RotationQuaternion = "ROTATIONQUATERNION",
  Slider = "SLIDER",
  Stepper = "STEPPER",
  Text = "TEXT",
  Textarea = "TEXTAREA",
  Wheel = "WHEEL",
}

type RENDERERS_MAP = {
  [x in RenderersEnum]: {
    [RenderersEnum.Checkbox]: typeof Checkbox;
    [RenderersEnum.Color]: typeof Color;
    [RenderersEnum.CubicBezier]: typeof CubicBezier;
    [RenderersEnum.Image]: typeof Image;
    [RenderersEnum.IntervalSlider]: typeof IntervalSlider;
    [RenderersEnum.Point]: typeof Point;
    [RenderersEnum.Ring]: typeof Ring;
    [RenderersEnum.RotationEuler]: typeof RotationEuler;
    [RenderersEnum.RotationQuaternion]: typeof RotationQuaternion;
    [RenderersEnum.Slider]: typeof Slider;
    [RenderersEnum.Stepper]: typeof Stepper;
    [RenderersEnum.Text]: typeof Text;
    [RenderersEnum.Textarea]: typeof Textarea;
    [RenderersEnum.Wheel]: typeof Wheel;
  }[x];
};

export const COMPONENT_MAP: Record<RenderersEnum, ComponentType> = {
  [RenderersEnum.Checkbox]: Checkbox,
  [RenderersEnum.Color]: Color,
  [RenderersEnum.CubicBezier]: CubicBezier,
  [RenderersEnum.Image]: Image,
  [RenderersEnum.IntervalSlider]: IntervalSlider,
  [RenderersEnum.Point]: Point,
  [RenderersEnum.Ring]: Ring,
  [RenderersEnum.RotationEuler]: RotationEuler,
  [RenderersEnum.RotationQuaternion]: RotationQuaternion,
  [RenderersEnum.Slider]: Slider,
  [RenderersEnum.Stepper]: Stepper,
  [RenderersEnum.Text]: Text,
  [RenderersEnum.Textarea]: Textarea,
  [RenderersEnum.Wheel]: Wheel,
};
