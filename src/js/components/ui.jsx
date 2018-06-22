/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import anime from 'animejs';

import Utilities from '../classes/utilities.js';

import Header from './header/header.jsx';
import Nav from './nav/nav.jsx';
import Actions from './actions/actions.jsx';
import Footer from './footer/footer.jsx';

import styles from './ui.css';

type Dog = {
  name:string,
  appearance:string,
  exercise:string,
  personality:string,
  feeding:string,
  grooming:string,
  updated:number,
  added:number
}

type Props = {
  breakpoint:number
}

type State = {
  flat:boolean
}

class UI extends React.Component<Props, State>
{
  currentSection:HTMLElement;
  transitionDuration:number = 300;

  state:State = {
    flat: true
  };

  data: {
    "dogs":Array<Dog>
  } = {
    "dogs" : [
        {
          name: "Spaniel",
          path: "spaniel",
          appearance: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          exercise: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          personality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          feeding: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          grooming: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          updated: 1529659454,
          added: 1529659454
        },
        {
          name: "German Shepherd",
          path: "german-shepherd",
          appearance: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          exercise: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          personality: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          feeding: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          grooming: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          updated: 1529663054,
          added: 1529663054
        }
      ]
    }

  componentDidMount()
  {
    // initial layout
    this.manageLayout(Utilities.getWidth(document));

    // update layout on resize if required
    window.addEventListener('resize', (event:EventListener) => {

      this.manageLayout(Utilities.getWidth(document));
    });
  }

  manageLayout(currentSize:number)
  {
    if(this.state.flat === false
      && currentSize <= this.props.breakpoint){

      this.setState({
        flat: true
      });
    }
    else if(this.state.flat === true
            && currentSize > this.props.breakpoint){

      this.setState({
        flat: false
      });
    };
  }

  async transitionSections(nextSection:HTMLElement){

    // initially hide new section while old transitions out
    anime({
      targets: nextSection,
      opacity: 0,
      scale:1.1,
      duration:0,
    });

    if(this.currentSection != null
      && nextSection != null)
    {
      //  take next section out of page flow temporarily while current section is transitioned out
      nextSection.style.display = "none";

      // transition out current section
      const exitComplete:anime = anime({
                                    targets: this.currentSection,
                                    opacity: 0,
                                    scale: 0.9,
                                    easing: 'easeInQuad',
                                    duration: this.transitionDuration
                                  });

      await exitComplete.finished;

      // remove transitioned section from page flow, otherwise the scroll bar will jump as both sections are briefly present
      this.currentSection.style.display = "none";
      nextSection.style.removeProperty('display');
    }

    // transition in next section
    anime({
      targets: nextSection,
      opacity: 1,
      scale: 1,
      duration: this.transitionDuration,
      easing: 'easeOutQuad',
      delay:100
    });

    this.currentSection = nextSection;
  }

  render(){
    return (
      <div className={"ui" + (!this.state.flat ? ' ui--layered' : '')}>
        <Header specifier="ui" paths={this.paths} />
        <Actions />
        <main className="ui__content">
          <Route render={({ location }) => (
              <TransitionGroup component="div"
                               className="ui__container"
                               appear={true}>
                <CSSTransition key={location.pathname}
                               transitionAppear={true}
                               classNames="ui__section-"
                               onEnter={(el:HTMLElement) => {this.transitionSections(el);}}
                               timeout={this.transitionDuration}>
                    <Switch location={location}>
                      // landing
                      <Route exact={true}
                             path="/"
                             render={() => {
                               return <Nav paths={
                                        this.data.dogs.map((dog) => {
                                           return {
                                               name: dog.name,
                                               path: dog.path
                                           };
                                        })
                                      } />}} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>)}/>;
        </main>
        <Footer specifier="ui__footer" />
      </div>
    );
  }
}

export default UI;
