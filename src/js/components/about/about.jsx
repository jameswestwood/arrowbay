/* @flow */

import * as React from 'react';
import { render } from 'react-dom';

import type {Dog} from "../ui.jsx";

type Props = {
  dog:Array<Dog>
}

class About extends React.Component<Props, State>
{
  render(){
    const dog:Dog = this.props.dog[0];

    return (
      <div className="about content">
        <h2>{dog.name}</h2>
        <img class="about__image" src={"https://loremflickr.com/320/240/" + (dog.name)} alt={dog.name} />

        {(() => {

          let sections:Array<React.Element> = [];

          for (let key:string in dog.info) {

              if (dog.info.hasOwnProperty(key)) {

                  sections.push(<section class="about__section">
                                  <h3>{key}</h3>
                                  {dog.info[key]}
                                </section>);
              }
          }

          return sections;

        })()};

      </div>
    );
  }
}

export default About;
