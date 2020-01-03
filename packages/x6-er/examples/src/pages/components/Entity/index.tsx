import React, { PureComponent } from 'react';
import styles from './index.css';
import { Icon, Popover, message } from 'antd';

const array = [
  'property1',
  'property2',
  'property3',
  'property4',
  'property5',
  'property6很长很长很长很长很长很长很长很长很长的属性',
  'property7',
  'property8',
  'property9',
  'property10',
  'property11',
  'property12',
  'property13',
];

interface Props {
  type: string;
}

export default class Entity extends PureComponent<Props, {}> {
  handleFatherDivClick = () => {
    // @ts-ignore
    console.log('这是父亲div的响应事件');
  };

  handleDeleteBtnClick = (e: any) => {
    console.log(`点击了模型的删除按钮-${this.props.type}`);
    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    return (
      <div className={styles.entityContainer} onClick={this.handleFatherDivClick}>
        <div className={this.props.type === 'FACT' ? styles.headFACT : styles.headDIM}>
          {this.props.type === 'FACT' ? '事实表' : '维度表'}
          <Icon
            type="delete"
            style={{ cursor: 'pointer', paddingRight: '0px', backgroundColor: '#00ff00' }}
            onClick={this.handleDeleteBtnClick}
          />
        </div>
        <div className={styles.body}>
          {array.map((item: string, index: number) => {
            return (
              <div className={styles.bodyItem} key={index}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
