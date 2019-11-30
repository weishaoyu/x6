import * as util from '../util'
import { Graph } from '.'
import { Disposable } from '../common'
import { Geometry } from './geometry'
import { Style } from '../types'
import { Overlay, Point, Rectangle } from '../struct'

export class Cell extends Disposable {
  public id?: string | null
  public data: any
  public style: Style
  public visible: boolean
  public render: Cell.Renderer | null
  public geometry: Geometry | null
  public overlays: Overlay[] | null

  public parent: Cell | null
  public children: Cell[] | null
  public edges: Cell[] | null
  public collapsed: boolean

  public source: Cell | null
  public target: Cell | null

  private node?: boolean
  private edge?: boolean

  constructor(data?: any, geometry?: Geometry, style: Style = {}) {
    super()
    this.data = data || null
    this.style = style
    this.geometry = geometry || null
    this.visible = true
  }

  // #region edge

  isEdge() {
    return this.edge === true
  }

  asEdge(v: boolean = true) {
    this.edge = v
  }

  getTerminal(isSource?: boolean) {
    return isSource ? this.source : this.target
  }

  setTerminal(terminal: Cell | null, isSource?: boolean) {
    if (isSource) {
      this.source = terminal
    } else {
      this.target = terminal
    }

    return terminal
  }

  removeFromTerminal(isSource?: boolean) {
    const terminal = this.getTerminal(isSource)
    if (terminal != null) {
      terminal.removeEdge(this, isSource)
    }
  }

  // #endregion

  // #region node

  isNode() {
    return this.node != null
  }

  asNode(v: boolean = true) {
    this.node = v
  }

  getEdges() {
    return this.edges
  }

  eachEdge(
    iterator: (edge: Cell, index: number, edges: Cell[]) => void,
    context?: any
  ) {
    return util.forEach(this.edges, iterator, context)
  }

  getEdgeCount() {
    return this.edges == null ? 0 : this.edges.length
  }

  getEdgeIndex(edge: Cell) {
    return util.indexOf(this.edges, edge)
  }

  getEdgeAt(index: number) {
    return this.edges == null ? null : this.edges[index]
  }

  insertEdge(edge: Cell, isOutgoing?: boolean) {
    if (edge != null) {
      edge.removeFromTerminal(isOutgoing)
      edge.setTerminal(this, isOutgoing)

      if (
        this.edges == null ||
        edge.getTerminal(!isOutgoing) !== this ||
        util.indexOf(this.edges, edge) < 0
      ) {
        if (this.edges == null) {
          this.edges = []
        }

        this.edges.push(edge)
      }
    }

    return edge
  }

  removeEdge(edge: Cell, isOutgoing?: boolean) {
    if (edge != null) {
      if (edge.getTerminal(!isOutgoing) !== this && this.edges != null) {
        const index = this.getEdgeIndex(edge)
        if (index >= 0) {
          this.edges.splice(index, 1)
        }
      }

      edge.setTerminal(null, isOutgoing)
    }

    return edge
  }

  isCollapsed() {
    return !!this.collapsed
  }

  setCollapsed(collapsed: boolean) {
    this.collapsed = collapsed
  }

  collapse() {
    return this.setCollapsed(true)
  }

  expand() {
    return this.setCollapsed(false)
  }

  toggleCollapse() {
    return this.collapsed ? this.expand() : this.collapse()
  }

  // #endregion

  // #region parent

  getParent() {
    return this.parent
  }

  setParent(parent: Cell | null) {
    this.parent = parent
  }

  removeFromParent() {
    if (this.parent != null) {
      const index = this.parent.getChildIndex(this)
      this.parent.removeChildAt(index)
    }
  }

  isOrphan() {
    return this.parent == null
  }

  isAncestor(descendant: Cell | null) {
    if (descendant == null) {
      return false
    }

    let des: Cell | null = descendant
    while (des && des !== this) {
      des = des.parent
    }

    return des === this
  }

  getAncestors() {
    const ancestors: Cell[] = []
    let parent = this.parent

    while (parent != null) {
      ancestors.push(parent)
      parent = parent.parent
    }

    return ancestors
  }

  getDescendants() {
    const descendants: Cell[] = []
    if (this.children) {
      this.eachChild(child => {
        descendants.push(child)
        descendants.push(...child.getDescendants())
      })
    }
    return descendants
  }

  // #endregion

  // #region children

  getChildren() {
    return this.children
  }

  getChildCount() {
    return this.children == null ? 0 : this.children.length
  }

  getChildIndex(child: Cell) {
    return util.indexOf(this.children, child)
  }

  getChildAt(index: number) {
    return this.children == null ? null : this.children[index]
  }

  insertChild(child: Cell, index?: number) {
    if (child != null) {
      let pos = index
      if (pos == null) {
        pos = this.getChildCount()
        if (child.getParent() === this) {
          pos -= 1
        }
      }

      child.removeFromParent()
      child.setParent(this)

      if (this.children == null) {
        this.children = []
        this.children.push(child)
      } else {
        this.children.splice(pos, 0, child)
      }
    }

    return child
  }

  removeChild(child: Cell) {
    const index = this.getChildIndex(child)
    return this.removeChildAt(index)
  }

  removeChildAt(index: number) {
    let child = null

    if (this.children != null && index >= 0) {
      child = this.getChildAt(index)
      if (child != null) {
        child.setParent(null)
        this.children.splice(index, 1)
      }
    }

    return child
  }

  eachChild(
    iterator: (child: Cell, index: number, children: Cell[]) => void,
    context?: any
  ) {
    return util.forEach(this.children, iterator, context)
  }

  // #endregion

  // #region visible

  isVisible() {
    return this.visible
  }

  setVisible(visible: boolean) {
    this.visible = visible
  }

  show() {
    return this.setVisible(true)
  }

  hide() {
    return this.setVisible(false)
  }

  toggleVisible() {
    return this.isVisible() ? this.hide() : this.show()
  }

  // #endregion

  getRender() {
    return this.render
  }

  setRender(renderer: Cell.Renderer | null) {
    this.render = renderer
  }

  getId() {
    return this.id
  }

  setId(id?: string | null) {
    this.id = id
  }

  getData() {
    return this.data
  }

  setData(data: any) {
    this.data = data
  }

  getStyle() {
    return this.style
  }

  setStyle(style: Style) {
    this.style = style
  }

  getGeometry() {
    return this.geometry
  }

  setGeometry(geometry: Geometry) {
    this.geometry = geometry
  }

  getOverlays() {
    return this.overlays
  }

  setOverlays(overlays: Overlay[] | null) {
    this.overlays = overlays
  }

  clone() {
    const clone = util.clone<Cell>(this, Cell.ignoredKeysWhenClone)!
    clone.setData(this.cloneData())
    return clone
  }

  protected cloneData() {
    let data = this.getData()
    if (data != null) {
      if (util.isFunction(data.clone)) {
        data = data.clone()
      } else if (!isNaN(data.nodeType)) {
        data = data.cloneNode(true)
      }
    }

    return data
  }

  @Disposable.aop()
  dispose() {
    // node
    this.eachChild(child => child.dispose())
    this.eachEdge(edge => edge.dispose())
    this.removeFromParent()

    // edge
    this.removeFromTerminal(true)
    this.removeFromTerminal(false)
  }
}

export namespace Cell {
  export const ignoredKeysWhenClone = [
    'id',
    'data',
    'parent',
    'source',
    'target',
    'children',
    'edges',
  ]

  export type Renderer = (
    this: Graph,
    elem: HTMLElement | SVGElement,
    cell: Cell
  ) => void

  interface CreationOptions {
    id?: string | null
    data?: any
    style?: Style
    visible?: boolean
    overlays?: Overlay[]
    render?: Renderer | null
  }

  export interface CreateNodeOptions extends CreationOptions {
    /**
     * Specifies the x-coordinate of the node. For relative geometries, this
     * defines the percentage x-coordinate relative the parent width, which
     * value should be within `0-1`. For absolute geometries, this defines the
     * absolute x-coordinate in the graph.
     */
    x?: number
    /**
     * Specifies the y-coordinate of the node. For relative geometries, this
     * defines the percentage y-coordinate relative the parent height, which
     * value should be within `0-1`. For absolute geometries, this defines the
     * absolute y-coordinate in the graph.
     */
    y?: number
    width?: number
    height?: number
    /**
     * Specifies if the coordinates in the geometry are to be interpreted
     * as relative coordinates. If this is `true`, then the coordinates are
     * relative to the origin of the parent cell.
     */
    relative?: boolean
    /**
     * For relative geometries, this defines the absolute offset from the
     * point defined by the relative coordinates. For absolute geometries,
     * this defines the offset for the label.
     */
    offset?: Point | Point.PointLike

    collapsed?: boolean

    /**
     * Stores alternate values for x, y, width and height in a rectangle.
     */
    alternateBounds?: Rectangle | Rectangle.RectangleLike
  }

  export interface CreateEdgeOptions extends CreationOptions {
    /**
     * The source `Point` of the edge. This is used if the corresponding
     * edge does not have a source node. Otherwise it is ignored.
     */
    sourcePoint?: Point | Point.PointLike
    /**
     * The target `Point` of the edge. This is used if the corresponding
     * edge does not have a target node. Otherwise it is ignored.
     */
    targetPoint?: Point | Point.PointLike
    /**
     * Specifies the control points along the edge. These points are the
     * intermediate points on the edge, for the endpoints use `targetPoint`
     * and `sourcePoint` or set the terminals of the edge to a non-null value.
     */
    points?: (Point | Point.PointLike | Point.PointData)[]
    offset?: Point | Point.PointLike
  }

  export function createNode(options: CreateNodeOptions = {}): Cell {
    const geo = new Geometry(
      options.x,
      options.y,
      options.width,
      options.height
    )

    geo.relative = options.relative != null ? options.relative : false

    if (options.offset != null) {
      geo.offset = Point.clone(options.offset)
    }

    if (options.alternateBounds != null) {
      geo.alternateBounds = Rectangle.clone(options.alternateBounds)
    }

    const node = new Cell(options.data, geo, options.style)
    if (options.collapsed != null) {
      node.setCollapsed(options.collapsed)
    }

    return applyCommonOptions(node, options, true)
  }

  export function createEdge(options: CreateEdgeOptions): Cell {
    const geom = new Geometry()
    geom.relative = true

    if (options.sourcePoint != null) {
      geom.sourcePoint = Point.clone(options.sourcePoint)
    }

    if (options.targetPoint != null) {
      geom.targetPoint = Point.clone(options.targetPoint)
    }

    if (options.offset != null) {
      geom.offset = Point.clone(options.offset)
    }

    if (options.points != null) {
      options.points.forEach(p => geom.addPoint(p))
    }

    const edge = new Cell(options.data, geom, options.style)
    return applyCommonOptions(edge, options, false)
  }

  function applyCommonOptions(
    node: Cell,
    options: CreationOptions,
    isNode: boolean
  ) {
    node.setId(options.id)

    if (isNode) {
      node.asNode(true)
    } else {
      node.asEdge(true)
    }

    if (options.visible != null) {
      node.setVisible(options.visible)
    } else {
      node.setVisible(true)
    }

    if (options.overlays != null) {
      node.setOverlays(options.overlays)
    }

    if (options.render) {
      node.setRender(options.render)
    }

    return node
  }
}