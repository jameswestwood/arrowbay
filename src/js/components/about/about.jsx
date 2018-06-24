/* @flow */

import * as React from 'react';
import { render } from 'react-dom';

import { Button, Input } from 'reactstrap';

import type {Dog} from "../ui.jsx";

type Props = {
  dog:Array<Dog>,
  create:boolean
}

type State = {
  edit:boolean, // are the field editable?
  create:boolean // is this a new item?
}

class About extends React.Component<Props, State>
{
  constructor(props)
  {
    super(props);

    this.state = {
      edit: false,
      create: false
    }
  }

  componentDidMount()
  {
    if(this.props.create === true)
    {
      this.setState({
        create: true,
        edit: true
      })
    }
  }

  toggleEditMode()
  {
    const newState:boolean = !this.state.edit;

    this.setState({
      edit:newState
    })
  }

  renderActions(edit:boolean, create:boolean):Array<React.Element>
  {
    let elements:Array<HTMLElement> = [];

    switch(edit)
    {
      case false:

      elements.push(<Button className="actions__action" color="danger" onClick={this.toggleEditMode.bind(this)}>Edit</Button>);

      break;

      // edit mode
      case true:

      elements.push(<Button className="actions__action" color="danger" onClick={this.toggleEditMode.bind(this)}>Save</Button>)

      //
      if(create === false)
      {
        elements.push(<Button className="actions__action" color="danger" onClick={this.toggleEditMode.bind(this)}>Cancel</Button>);
      }

      break;
    }

    return elements;
  }

  renderContent(dog:Dog, edit:boolean, create:boolean):Array<React.Element>
  {
    let elements:Array<HTMLElement> = [];

    // title

    switch(create)
    {
      case true:

      elements.push(<div class="form-group">
                      <label for="dog-name">Dog Breed</label>
                      <Input type="text" class="form-control" id="dog-name" placeholder="Dog Breed" />
                      <small class="form-text text-muted">{dog.name.descriptor}</small>
                    </div>);

      break;

      case false:

      elements.push(<h2>{dog.name.value}</h2>);

      break;
    }

    // sections

    for (let key:string in dog.info) {

      if (dog.info.hasOwnProperty(key)) {

        let section:React.Element;

        switch(this.state.edit)
        {
          case true:

          section = <div class="form-group">
                      <label for={key}>{key}</label>
                      <Input type="textarea" class="form-control" id="dog-name" id={key}  value={dog.info[key].value} />
                      <small class="form-text text-muted">{dog.info[key].descriptor}</small>
                    </div>;

          break;

          case false:

          section = <React.Fragment>
                      <h3>{key}</h3>
                      <span>{dog.info[key].value}</span>;
                    </React.Fragment>;

          break;
        }

        elements.push(<section class="about__section">{section}</section>);
      }
    }

    return elements;
  }

  render(){
    const dog:Dog = this.props.dog[0];

    return (
      <div className="about content">
        { this.renderContent(dog, this.state.edit, this.state.create) }
        <div className="about__actions">
          { this.renderActions(this.state.edit, this.state.create) }
        </div>
      </div>
    );
  }
}

About.defaultProps = { create: false };

export default About;
