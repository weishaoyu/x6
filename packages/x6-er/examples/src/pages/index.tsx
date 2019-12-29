import React from 'react';
import styles from './index.css';
import ERGraph from '../../../dist/index';

const data = {
  nodes: [
    {
      id: 'node-0',
      x: 40,
      y: 40,
      width: 300,
      height: 200,
      render: () => {
        return <div>hello node-0</div>;
      },
    },
    {
      id: 'node-1',
      x: 140,
      y: 40,
      width: 300,
      height: 200,
      render: () => {
        return (
          <div
            onClick={() => {
              console.log('node-1');
            }}
          >
            hello node-1
          </div>
        );
      },
    },
  ],
  edges: [
    {
      source: 'node-0',
      target: 'node-1',
    },
  ],
};
export default function() {
  return (
    <div className={styles.normal}>
      <ERGraph data={data} />
    </div>
  );
}
