import React from 'react'
import { Graph, Shape, MiniMap } from '@antv/x6'
import { ReactShape } from '@antv/x6-react-shape'
// import dagre from './layout/dagre'

Shape.register('react', ReactShape, true)

/** 节点数据模型 */
export interface Node {
  id: string // 节点id
  x?: number // 节点x坐标
  y?: number // 节点y坐标
  render: () => any // 节点自定义样式
  [key: string]: any // 节点额外信息
}

/** 连线数据模型 */
export interface Edge {
  source: string // 连线source
  target: string // 连线target
  [key: string]: any // 连线额外信息
}

interface Props {
  data: {
    nodes: Node[] // nodes数据
    edges: Edge[] // edges数据
  }
  // 画布配置选项
  canvasOptions?: {
    infinite?: boolean // 是否无限画布
    mouseWheel?: boolean // 是否响应滚轮事件
    minScale?: number // 画布缩放最小比例
    maxScale?: number // 画布缩放最大比例
  }
  // node选中样式配置选项
  nodeSelectionPreview?: {
    stroke?: string
    strokeWidth?: number
    dashed?: boolean
  }
  // edge配置选项
  edgeOption?: {
    label?: string
    edge?: string
  }
}

class ERGraph extends React.Component<Props> {
  private container!: HTMLDivElement
  private minimapContainer!: HTMLDivElement
  private graph!: Graph

  nodes: any
  edges: any

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this.graph = new Graph(this.container, {
      ...this.props.canvasOptions,
      resize: false,
      allowDanglingEdges: false, // 连线禁止移动 & 没有连接到目标节点则连线失败
      edgeLabelsMovable: false, // 连线label禁止移动
      selectionPreview: this.props.nodeSelectionPreview
        ? this.props.nodeSelectionPreview
        : {
            strokeWidth: 2,
            dashed: false,
            stroke: '#1890ff',
          },
      keyboard: {
        enabled: true,
      },
      guide: {
        enabled: true,
      },
      rubberband: {
        enabled: true,
      },
      connection: {
        enabled: true,
        hotspotable: false,
      },
      getAnchors(cell) {
        if (cell != null && this.model.isNode(cell)) {
          return [
            [0, 0],
            [0.5, 0],
            [1, 0],

            [0, 0.5],
            [1, 0.5],

            [0, 1],
            [0.5, 1],
            [1, 1],
          ]
        }
        return null
      },
    })
    this.renderGraph()
  }

  renderGraph = () => {
    /** layout */
    // const data = dagre(this.props.data, {
    //   /**  节点水平间距(px) */
    //   nodesep: 0,
    //   /** 每一层节点之间间距 */
    //   ranksep: 0,
    // })

    const data = this.props.data

    this.graph.batchUpdate(() => {
      this.nodes = data.nodes.map((node: Node) => {
        const { render, id, x, y, width, height } = node
        return this.graph.addNode({
          id,
          x,
          y,
          width,
          height,
          /** default options */
          label: false, // no label
          stroke: '#597EF7',
          shape: 'react',
          // resizable: false,
          // @ts-ignore
          component: render(this.props),
        })
      })

      this.edges = data.edges.map((edge: Edge) => {
        const { source, target } = edge
        const sourceNode =
          this.nodes && this.nodes.find((node: any) => node.id === source)
        const targetNode =
          this.nodes && this.nodes.find((node: any) => node.id === target)
        this.graph.addEdge({
          source: sourceNode,
          target: targetNode,
          label: this.props.edgeOption?.label,
          curved: true,
          rounded: true,
          edge: this.props.edgeOption?.edge,
        })
      })
    })

    new MiniMap(this.graph, {
      container: this.minimapContainer,
      viewport: { strokeColor: '#ff00ff' },
    })

    this.handleEvent()
  }

  handleEvent = () => {
    // 节点或者连线拖拽移动的回调
    this.graph.on('cells:moved', ({ cells, dx, dy }) => {
      console.log('cells', cells)
      console.log('dx', dx)
      console.log('dy', dy)
    })

    // 节点或者连线被选中的回调
    this.graph.on('selection:changed', ({ selected }) => {
      if (selected && selected.length === 0) return
      if (selected && selected[0].isNode) {
        console.log('选中的是节点')
      } else if (selected && selected[0].isEdge) {
        console.log('选中的是边')
      } else {
      }
    })

    // 连线完成的回调
    this.graph.on('cell:connected', ({ edge, isSource }) => {
      // console.log('edge:', edge)
      // console.log('isSpurce', isSource)
      // console.log('anchor', anchor)
      console.log('这里走几次呢？？？')
    })
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  refMinimapContainer = (container: HTMLDivElement) => {
    this.minimapContainer = container
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div ref={this.refContainer} />
        <div
          ref={this.refMinimapContainer}
          style={{
            position: 'absolute',
            top: 26,
            right: 144,
            width: 150,
            height: 130,
            border: '1px solid #ff0000',
            zIndex: 999,
          }}
        />
      </div>
    )
  }
}

export default ERGraph
