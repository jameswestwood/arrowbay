/* @flow */
import * as React from 'react';
import { render } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import anime from 'animejs';

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

  render(){
    const { match, location, history } = this.props

    return (
      <nav className={"nav" + (this.props.specifier !== undefined ? ' ' + this.props.specifier : '')}>
        {
          this.props.paths.map((path) =>
            <Link to={"/dog/" + (path.path)} className="nav__link">{path.name}</Link>
          )
        }
      </nav>
    );
  }
}

export default withRouter(Nav);
