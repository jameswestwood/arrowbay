/* @flow */
import * as React from 'react';
import { render } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import { FormGroup, Label, Input, ListGroup, ListGroupItem  } from 'reactstrap';
import PropTypes from 'prop-types';
import anime from 'animejs';
import history from '../../history'

import styles from './nav.css';

type Props = {
  paths:Array<{}>,
  specifier:string,
  match:withRouter.Match | void,
  location:withRouter.Location | void,
  history:withRouter.History | void
}

class Nav extends React.Component<Props>
{
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  handleChange(event) {

    history.push(event.target.value)
  }

  render(){
    const { match, location, history } = this.props

    return (
      <nav className={"nav" + (this.props.specifier !== undefined ? ' ' + this.props.specifier : '')}>
        <ListGroup className="nav__desktop">
          {this.props.paths.map((path) =>
            <ListGroupItem action>
              <Link key={path.path} to={"/dog/" + (path.path)}>{path.name}</Link>
            </ListGroupItem>
        )}
        </ListGroup>
        <FormGroup className="nav__touch">
          <Input defaultValue="" type="select" name="select" id="exampleSelect" onChange={(e) => this.handleChange(e)}>
            <option value="" disabled hidden>Select a dog</option>
            {this.props.paths.map((path) =>
              <option key={path.path} value={"/dog/" + (path.path)}>{path.name}</option>
            )}
          </Input>
        </FormGroup>
      </nav>
    );
  }
}

export default withRouter(Nav);
