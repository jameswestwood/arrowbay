/* @flow */

import * as React from 'react';
import { render } from 'react-dom';

import { Button } from 'reactstrap';
import Nav from '../nav/nav.jsx';
import history from '../../history'

import styles from './landing.css';

class Landing extends React.Component<Props>
{
  render(){
    return (
      <section className="landing">
        <Nav paths={this.props.links} specifier="landing__nav" />
        <div className="landing__intro content">
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>

          <Button className="actions__action" color="primary" onClick={() => history.push('/dog/new')}>New</Button>
        </div>

      </section>
    );
  }
}

export default Landing;
