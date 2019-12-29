import dagre from 'dagre'

interface Options {
  /** 节点大小 */
  nodeSize?: [number, number]
  /**  节点水平间距(px) */
  nodesep?: number
  /** 每一层节点之间间距 */
  ranksep?: number
}
const defaultNodeSize = [350, 250]

const layout = (data: any, options: Options) => {
  const { nodes, edges } = data
  //创建一个有向分层图
  var g = new dagre.graphlib.Graph()
  // Set an object for the graph label
  g.setGraph({
    rankdir: 'LR',
  })
  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(function() {
    return {}
  })
  // 设置节点
  data.nodes.forEach((node: any) => {
    const { id, style } = node
    /**  */
    const nodeWidth =
      (style && style.width) ||
      (options.nodeSize && options.nodeSize[0]) ||
      defaultNodeSize[0]
    const nodeHeight =
      (style && style.height) ||
      (options.nodeSize && options.nodeSize[1]) ||
      defaultNodeSize[1]
    const nodesep = options.nodesep || 0
    const ranksep = options.ranksep || 0
    const nodeSize: number[] = [nodeWidth + nodesep, nodeHeight + ranksep]
    g.setNode(id, { label: id, width: nodeSize[0], height: nodeSize[1] })
  })
  /** 设置边 */
  data.edges.forEach((edge: any) => {
    const { source, target } = edge
    g.setEdge(source, target)
  })
  // layout
  dagre.layout(g)

  // 将布局信息回填到数据中

  // 设置节点的xy坐标信息
  g.nodes().forEach((node: any, index: number) => {
    const coord = g.node(node)
    if (coord) {
      nodes[index].x = coord.x
      nodes[index].y = coord.y
    }
  })
  // 设置边的控制点
  // g.edges().forEach((edge: any, index: number) => {
  //   const coord = g.edge(edge);
  //   edges[index].startPoint = coord.points[0];
  //   edges[index].endPoint = coord.points[coord.points.length - 1];
  // });
  return {
    nodes,
    edges,
  }
}

export default layout
