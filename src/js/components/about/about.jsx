/* @flow */

import * as React from 'react';
import { render } from 'react-dom';

import { Button } from 'reactstrap';

import type {Dog} from "../ui.jsx";

type Props = {
  dog:Array<Dog>
}

type State = {
  edit:boolean
}

class About extends React.Component<Props, State>
{
  constructor(props)
  {
    super(props);

    this.state = {
      edit: false
    }
  }

  toggleEditMode()
  {
    const newState:boolean = !this.state.edit;

    this.setState({
      edit:newState
    })
  }

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
        <div className="about__actions">
          {(() => {

            switch(this.state.edit)
            {
              case false:

              return <Button className="actions__action" color="danger" onClick={this.toggleEditMode.bind(this)}>Edit</Button>;

              case true:

              return [<Button className="actions__action" color="danger" onClick={this.toggleEditMode.bind(this)}>Save</Button>, <Button className="actions__action" color="danger" onClick={this.toggleEditMode.bind(this)}>Cancel</Button>];
            }

          })()};

        </div>
      </div>
    );
  }
}

export default About;
