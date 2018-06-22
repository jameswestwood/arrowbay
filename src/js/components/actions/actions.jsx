/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import styles from './actions.css';

type Props = {

}

class Actions extends React.Component<Props>
{
  render(){
    return (
      <section className="actions">
        <Button className="actions__action" color="danger">Edit</Button>
        <Button className="actions__action" color="danger">Save</Button>
        <Button className="actions__action" color="danger">Create</Button>
        <Button className="actions__action" color="danger">Cancel</Button>
      </section>
    );
  }
}

export default Actions;
