import { FontStyle } from './struct'
import { Route } from './route'
import { Perimeter } from './perimeter'

export type Dialect = 'svg' | 'html'
export type Align = 'left' | 'center' | 'right'
export type VAlign = 'top' | 'middle' | 'bottom'
export type LabelPosition = 'left' | 'center' | 'right'
export type LabelVerticalPosition = 'top' | 'middle' | 'bottom'
export type Direction = 'north' | 'south' | 'east' | 'west'
export type LineCap = 'butt' | 'round' | 'square'
export type LineJoin = 'miter' | 'round' | 'bevel'
export type WritingDirection = '' | 'auto' | 'ltr' | 'rtl'

export interface Size {
  width: number
  height: number
}

export interface Margin {
  top: number
  right: number
  bottom: number
  left: number
}

interface ShapeStyle {
  shape?: string
  className?: string
  pointerEvents?: boolean

  cursor?: string
  opacity?: number
  rotation?: number

  fill?: string
  fillOpacity?: number
  gradientColor?: string
  gradientDirection?: Direction

  stroke?: string
  strokeWidth?: number
  strokeOpacity?: number
  dashed?: boolean
  dashPattern?: string
  fixDash?: boolean

  flipH?: boolean
  flipV?: boolean
  glass?: boolean
  shadow?: boolean

  /**
   * This specifies if the aspect ratio of the cell will be
   * maintained when resizing.
   */
  aspect?: boolean

  /**
   * This style specifies if a only the background of a cell
   * should be painted when it is highlighted.
   */
  backgroundOutline?: boolean
}

interface LabelStyle {
  /**
   * If this is true then no label is visible for a given cell.
   */
  noLabel?: boolean
  htmlLabel?: boolean
  horizontal?: boolean
  fontSize?: number
  fontColor?: string
  fontStyle?: FontStyle
  fontFamily?: string
  textOpacity?: number
  textDirection?: WritingDirection
  align?: Align
  verticalAlign?: VAlign
  overflow?: 'fill' | 'width' | 'visible' | 'hidden'
  whiteSpace?: 'nowrap' | 'wrap'
  labelBackgroundColor?: string
  labelBorderColor?: string
  labelClassName?: string
  labelWidth?: number
  labelPadding?: number
  spacing?: number
  spacingTop?: number
  spacingRight?: number
  spacingBottom?: number
  spacingLeft?: number

  /**
   * The horizontal label position of vertices. Possible values are
   * `left`, `center`, `right`.
   *
   * Default is `center`.
   *
   * `left` means the entire label bounds is placed completely just
   * to the left of the node, `right` means adjust to the right and
   * `center` means the label bounds are vertically aligned with the
   * bounds of the node.
   *
   * Note this style doesn't affect the positioning of label within the
   * label bounds, to move the label horizontally within the label bounds,
   * use `align` style.
   */
  labelPosition?: LabelPosition

  /**
   * The vertical label position of vertices. Possible values are
   * `top`, `middle`, `bottom`.
   *
   * Default is `middle`.
   *
   * `top` means the entire label bounds is placed completely just
   * on the top of the node, `bottom` means adjust on the bottom
   * and `middle` means the label bounds are horizontally aligned
   * with the bounds of the vertex.
   *
   * Note this value doesn't affect the positioning of label within the
   * label bounds, to move the label vertically within the label bounds,
   * use `verticalAlign` style.
   */
  labelVerticalPosition?: LabelVerticalPosition
}

interface EdgeStyle {
  edge?: string | Route.Router | null
  perimeter?: string | Perimeter.PerimeterFunction | null

  /**
   * If this is true then no edge style is applied for a given edge.
   */
  noEdgeStyle?: boolean

  sourcePort?: string
  targetPort?: string
  portConstraint?: string
  portConstraintRotation?: number
  sourcePortConstraint?: string
  targetPortConstraint?: string

  perimeterSpacing?: number
  sourcePerimeterSpacing?: number
  targetPerimeterSpacing?: number

  /**
   * The horizontal relative coordinate connection point of an edge with
   * its source terminal.
   */
  exitX?: number

  /**
   * The vertical relative coordinate connection point of an edge with
   * its source terminal.
   */
  exitY?: number

  /**
   * The horizontal offset of the connection point of an edge with its
   * source terminal.
   */
  exitDx?: number

  /**
   * The vertical offset of the connection point of an edge with its
   * source terminal.
   */
  exitDy?: number

  /**
   * The horizontal relative coordinate connection point of an edge with
   * its target terminal.
   */
  entryX?: number

  /**
   * The vertical relative coordinate connection point of an edge with
   * its target terminal.
   */
  entryY?: number

  /**
   * The horizontal offset of the connection point of an edge with its
   * target terminal.
   */
  entryDx?: number

  /**
   * The vertical offset of the connection point of an edge with its
   * target terminal.
   */
  entryDy?: number

  /**
   * Defines if the perimeter should be used to find the exact entry point
   * along the perimeter of the source.
   *
   * Default is `true`.
   */
  exitPerimeter?: boolean

  /**
   * Defines if the perimeter should be used to find the exact entry point
   * along the perimeter of the target.
   *
   * Default is `true`.
   */
  entryPerimeter?: boolean

  /**
   * Defines if the connection points on either end of the edge should be
   * computed so that the edge is vertical or horizontal if possible and
   * if the point is not at a fixed location.
   */
  orthogonal?: boolean

  /**
   * This style defines how the three segment orthogonal edge style
   * leaves its terminal vertices. The vertical style leaves the
   * terminal vertices at the top and bottom sides.
   */
  elbow?: 'horizontal' | 'vertical'

  segment?: number
  endSize?: number
  endArrow?: string
  endFilled?: boolean
  startSize?: number
  startArrow?: string
  startFilled?: boolean
}

interface ImageStyle {
  image?: string
  imageWidth?: number
  imageHeight?: number
  imageBackgroundColor?: string
  imageBorderColor?: string
  imageAlign?: Align
  imageVerticalAlign?: VAlign
  imageFlipH?: boolean
  imageFlipV?: boolean
  /**
   * Specify whether keep image aspect or not.
   */
  imageAspect?: boolean
}

interface IndicatorStyle {
  indicatorShape?: string
  indicatorImage?: string
  indicatorColor?: string
  indicatorStrokeColor?: string
  indicatorGradientColor?: string
  indicatorSpacing?: number
  indicatorWidth?: number
  indicatorHeight?: number
  indicatorDirection?: Direction
}

interface CustomStyle {
  [key: string]: any
}

interface CustomCSS {
  css?: {
    [selector: string]: Partial<CSSStyleDeclaration>
  }
}

export interface Style
  extends ShapeStyle,
    LabelStyle,
    EdgeStyle,
    ImageStyle,
    IndicatorStyle,
    CustomStyle,
    CustomCSS {
  direction?: Direction

  /**
   * This style specifies whether the line between the title
   * regio of a swimlane should be visible.
   */
  swimlaneLine?: boolean
  swimlaneFillColor?: string
  separatorColor?: string
  margin?: number

  rounded?: boolean
  curved?: boolean
  arcSize?: number
  absoluteArcSize?: boolean

  /**
   * This style defines if the direction style should be taken into
   * account when computing the fixed point location for connected edges.
   */
  anchorPointDirection?: boolean

  locked?: boolean

  /**
   * This specifies if a cell should be resized automatically if
   * the value has changed.
   */
  autosize?: boolean

  /**
   * This style specifies if a cell is foldable using a folding icon.
   */
  foldable?: boolean

  /**
   * This style specifies if the value of a cell can be edited
   * using the in-place editor.
   */
  editable?: boolean

  /**
   * This style specifies if the control points of an edge can be moved.
   */
  bendable?: boolean

  /**
   * This style specifies if a cell can be moved.
   */
  movable?: boolean

  /**
   * This style specifies if a cell can be rotated.
   */
  rotatable?: boolean

  /**
   * This style specifies if a cell can be cloned.
   */
  cloneable?: boolean

  /**
   * This style specifies if a cell can be connected.
   */
  connectable?: boolean

  /**
   * This style specifies if a cell can be deleted.
   */
  deletable?: boolean

  /**
   * This style specifies if a cell can be resized.
   */
  resizable?: boolean

  /**
   * This style specifies if a cell's width is resized if the parent is
   * resized. If this is `true` then the width will be resized even if
   * the cell's geometry is relative. If this is `false` then the cell's
   * width will not be resized.
   */
  resizeWidth?: boolean

  /**
   * This style specifies if a cell's height if resize if the parent is
   * resized. If this is `true` then the height will be resized even if
   * the cell's geometry is relative. If this is `false` then the cell's
   * height will not be resized.
   */
  resizeHeight?: boolean

  /**
   * Jetty size is the minimum length of the orthogonal segment
   * before it attaches to a shape.
   */
  jettySize?: number | 'auto'
  sourceJettySize?: number | 'auto'
  targetJettySize?: number | 'auto'
  loopStyle?: string
  orthogonalLoop?: boolean
  routingCenterX?: number
  routingCenterY?: number
}