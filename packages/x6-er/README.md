## @antv/x6-er

`x6-er` 是一个基于 `x6` 与 `x6-react-shape` 封装的 ER 图组件，支持 React 组件渲染节点，支持常见的 ER 图编辑与分析交互，内置布局算法，为用户提供开箱即用的方案。

## Install 安装

```bash
npm install @antv/x6-er --save
```

## Usage 用法

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import ERGraph from '@antv/x6-er';

const data = {
  nodes: [
    {
      // 唯一标示ID，与edge的source或者target相对应
      id: 'node-0',
      // width：节点的容器的宽
      width: 200,
      // height：节点的容器的高
      height: 300,
      // render 是节点渲染函数，传入节点的React组件即可，参数 graph 是ERGraph 抛出的x6实例。
      render: (graph: any) => <CustomNode graph={graph} />,
    },
    {
      id: 'node-1',
      width: 200,
      height: 300,
      render: (graph: any) => <CustomNode graph={graph} />,
    },
  ],
  edges: [
    {
      // 对应 开始节点
      source: 'node-0',
      // 对应 结束节点
      target: 'node-1',
      // 边的类型，内置x6的边类型
      type: 'cubic',
      // 边的label信息
      label: 'this is label',
    },
  ],
};

ReactDOM.render(<ERGraph data={data} />, document.getElementById('root'));
```

## Docs 文档

- `data` 数据结构

`data` 负责定义 ERGraph 的节点与边的数据模型，data 由 nodes 和 edges 组成，nodes 代表节点的数据，edges 代表边的数据。节点与边的 `增 add`,`删 delete`,`改 update` 均可以通过操作 `data` 来完成。

- `options` 配置说明

`ERGraph`内部的配置来源 X6 的 option 配置
