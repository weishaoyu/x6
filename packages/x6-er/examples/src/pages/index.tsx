import React from 'react';
import styles from './index.css';
import ERGraph from '../../../dist/index';
import Entity from './components/Entity/index';

const data = {
  nodes: [
    {
      id: 'node-0',
      x: 20,
      y: 220,
      width: 200,
      height: 240,
      render: () => {
        return <Entity type="FACT" />;
      },
    },
    {
      id: 'node-1',
      x: 360,
      y: 60,
      width: 200,
      height: 240,
      render: () => {
        return <Entity type="DIM" />;
      },
    },
    {
      id: 'node-2',
      x: 360,
      y: 460,
      width: 200,
      height: 240,
      render: () => {
        return <Entity type="DIM" />;
      },
    },
    {
      id: 'node-3',
      x: 700,
      y: 360,
      width: 200,
      height: 240,
      render: () => {
        return <Entity type="FACT" />;
      },
    },
    {
      id: 'node-4',
      x: 700,
      y: 660,
      width: 200,
      height: 240,
      render: () => {
        return <Entity type="DIM" />;
      },
    },
    {
      id: 'node-5',
      x: 700,
      y: 960,
      width: 200,
      height: 240,
      render: () => {
        return <Entity type="FACT" />;
      },
    },
  ],
  edges: [
    {
      source: 'node-0',
      target: 'node-1',
    },
    {
      source: 'node-0',
      target: 'node-2',
    },
  ],
};

export default function() {
  return (
    <div className={styles.normal}>
      <ERGraph
        data={data}
        canvasOptions={{
          infinite: true,
          mouseWheel: true,
          minScale: 0.5,
          maxScale: 1.5,
          gridStyle: 'Dot',
        }}
        nodeSelectionPreview={{ stroke: '#ff0000', strokeWidth: 3, dashed: false }}
        edgeOption={{ label: 'N:1', edge: 'elbow' }}
      />
    </div>
  );
}
