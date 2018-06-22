/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import anime from 'animejs';

import Utilities from '../classes/utilities.js';

import Header from './header/header.jsx';
import Footer from './footer/footer.jsx';

// views
import Landing from './landing/landing.jsx';
import About from './about/about.jsx';

import styles from './ui.css';

export type Dog = {
  name:string,
  id:string,
  info: {
    appearance:string,
    exercise:string,
    personality:string,
    feeding:string,
    grooming:string
  },
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
          id: "spaniel",
          info: {
            appearance: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            exercise: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            personality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            feeding: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            grooming: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          },
          updated: 1529659454,
          added: 1529659454
        },
        {
          name: "German Shepherd",
          id: "german-shepherd",
          info: {
            appearance: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            exercise: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            personality: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            feeding: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            grooming: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          },
          updated: 1529663054,
          added: 1529663054
        },
        {
          name: "Poodle",
          id: "poodle",
          info: {
            appearance: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            exercise: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            personality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            feeding: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            grooming: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          },
          updated: 1529665804,
          added: 1529665804
        },
        {
          name: "Dachshund",
          id: "dachshund",
          info: {
            appearance: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            exercise: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            personality: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            feeding: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            grooming: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          },
          updated: 1529752204,
          added: 1529752204
        }
      ]
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
      <div className="ui">
        <Header specifier="ui" />
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
                       /////////////////////////
                      // landing
                      <Route exact={true}
                             path="/"
                             render={() => {
                               return <Landing links={
                                        this.data.dogs.map((dog) => {
                                           return {
                                               name: dog.name,
                                               path: dog.id
                                           };
                                        })
                                      } />}} />
                       /////////////////////////
                      // about
                      <Route exact={true}
                             path="/dog/:id"
                             render={({match}) => {

                                const thisDog:Dog = this.data.dogs.filter(function(dog) {
                                  return dog.id === match.params.id;
                                });

                                return <About dog={thisDog} />
                             }
                            } />
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
