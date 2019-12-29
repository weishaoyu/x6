import React from 'react'
import { Graph, Shape, MiniMap } from '@antv/x6'
import { ReactShape } from '@antv/x6-react-shape'
import dagre from './layout/dagre'

Shape.register('react', ReactShape, true)
interface Node {
  id: string
  x?: number
  y?: number
  render: () => any
  [key: string]: any
}
interface Edge {
  source: string
  target: string
  [key: string]: any
}
interface Props {
  data: {
    nodes: Node[]
    edges: Edge[]
  }
}
class ERGraph extends React.Component<Props> {
  private container!: HTMLDivElement
  private graph!: Graph
  nodes: any
  edges: any

  constructor(props: Props) {
    super(props)
  }
  componentDidMount() {
    this.graph = new Graph(this.container, {
      infinite: false,
      connection: {
        enabled: true,
        hotspotable: false,
      },
      anchor: {
        inductiveSize: 16,
      },
    })
    this.renderGraph()
  }

  renderGraph = () => {
    /** layout */
    const data = dagre(this.props.data, {
      /**  节点水平间距(px) */
      nodesep: 0,
      /** 每一层节点之间间距 */
      ranksep: 0,
    })

    this.graph.batchUpdate(() => {
      this.nodes = data.nodes.map((node: any) => {
        const { render, id, x, y, width, height } = node
        return this.graph.addNode({
          id,
          x,
          y,
          width,
          height,
          /** default options */
          label: false, // no label
          stroke: 'none',
          shape: 'react',
          resizable: false,
          component: render(this.props),
        })
      })
      this.edges = data.edges.map((edge: any) => {
        const { source, target } = edge
        const sourceNode = this.nodes.find((node: any) => node.id === source)
        const targetNode = this.nodes.find((node: any) => node.id === target)
        this.graph.addEdge({
          source: sourceNode,
          target: targetNode,
          label: 'Label',
        })
      })

      console.log(this.nodes, this.edges)
    })
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  render() {
    return (
      <div
        ref={this.refContainer}
        className="graph"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '500px',
        }}
      />
    )
  }
}

export default ERGraph
