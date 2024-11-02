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
import type { SvelteComponent } from "svelte";

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
    XYGraphNode,
    XYGraphEdge,
    XYGraph
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
  [key: string]: XYGraphSocket;
};

export type GraphNode<
  T extends NodesEnum,
  TInputs extends NodeIO,
  TOutputs extends NodeIO,
> = NodeType<NodeTypes, T, XYGraphSocket, XYGraph, TInputs, TOutputs> & {
  degree?: number;
  // viewProperties?: ViewProperties<RenderersEnum>;
};

export interface XYGraph extends
  MultiSocketNodeGraph<
    SocketTypes,
    NodeTypes,
    SocketTypesMap,
    XYGraphSocket,
    XYGraphNode,
    XYGraphEdge,
    XYGraph
  > {
}

// Composed Types
export type XYGraphSocket = Socket<SocketsEnum>;
export type XYGraphNode = GraphNode<NodesEnum, NodeIO, NodeIO>;
export type XYGraphEdge = NodeEdge<XYGraphSocket, XYGraphNode>;

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

// export const COMPONENT_MAP: Record<RenderersEnum, SvelteComponent> = {
//   CHECKBOX: Checkbox,
//   COLOR: Color,
//   CUBICBEZIER: CubicBezier,
//   IMAGE: Image,
//   INTERVALSLIDER: IntervalSlider,
//   POINT: Point,
//   RING: Ring,
//   ROTATIONEULER: RotationEuler,
//   ROTATIONQUATERNION: RotationQuaternion,
//   SLIDER: Slider,
//   STEPPER: Stepper,
//   TEXT: Text,
//   TEXTAREA: Textarea,
//   WHEEL: Wheel,
// };
