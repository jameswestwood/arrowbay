/* @flow */

import * as React from 'react'
import { render } from 'react-dom'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group'
import { addDog } from '../actions'
import anime from 'animejs'

import Utilities from '../classes/utilities.js'

import Header from './header/header.jsx'
import Footer from './footer/footer.jsx'

// views
import Landing from './landing/landing.jsx'
import About from './about/about.jsx'
import Create from './create/create.jsx'

import styles from './ui.css'

export type Dog = {
  name:string,
  id:number,
  path:string,
  info: {
    appearance:string,
    exercise:string,
    personality:string,
    feeding:string,
    grooming:string
  }
}

// dog constructor
export function Dog(name:string,
                    appearance:string,
                    exercise:string,
                    personality:string,
                    feeding:string,
                    grooming:string):Dog
{
  this.id = + new Date();

  this.name = name;

  this.path;

  if(name != null){

    this.path = name.replace(' ', '-').toLowerCase();
  }

  this.info = {};

  this.info.appearance = {
    value: appearance,
    descriptor:"The appearance of the dog."
  };

  this.info.exercise = {
    value: appearance,
    descriptor:"What is the dog's exercise routine?"
  };

  this.info.personality = {
    value: appearance,
    descriptor:"Describe the dogs temperament."
  };

  this.info.feeding = {
    value: appearance,
    descriptor:"What does the dog eat? How often does it eat?"
  };

  this.info.grooming = {
    value: appearance,
    descriptor:"How involved is the dogs grooming regeme?"
  };
}

class UI extends React.Component<{}>
{
  currentSection:HTMLElement;
  transitionDuration:number = 300;

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
                                        this.props.dogs.map((dog) => {
                                           return {
                                               name: dog.name,
                                               path: dog.path
                                           }
                                        })
                                      } />}} />


                      /////////////////////////
                     // new

                     <Route exact={true}
                            path="/dog/new"
                            render={() => {

                              return <Create />
                            }
                           } />

                       /////////////////////////
                      // about

                      <Route exact={true}
                             path="/dog/:id"
                             render={({match}) => {

                               // get dog from store
                               const thisDog:Dog = this.props.dogs.filter(function(dog) {
                                  return dog.path === match.params.id;
                               });

                               return <About dog={thisDog} />
                             }
                            } />

                    </Switch>
                </CSSTransition>
            </TransitionGroup>)}/>
        </main>
        <Footer specifier="ui__footer" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { dogs: state.dogs };
}
// wrapping with withRouter prevents issue described here - https://github.com/ReactTraining/react-router/issues/4671
export default withRouter(connect(mapStateToProps)(UI))
