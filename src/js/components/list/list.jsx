/* @flow */

import * as React from 'react';
import { render } from 'react-dom';

import styles from './list.css';

type Props = {
  paths:{}
}

class List extends React.Component<Props>
{
  render(){
    return (
      <ul className="list">

      </ul>
    );
  }
}

export default List;
