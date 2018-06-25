/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { Button, Input } from 'reactstrap';

import { addDog, editDog } from '../../actions';
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
    const dog:Dog = this.props.dog[0];

    if(dog != null
      && dog.info != null)
      {
        const initialFieldState:{} = {};

        // add state dynamically for form fields
        for (let key:string in dog.info) {

          if (dog.info.hasOwnProperty(key)) {

            initialFieldState[key] = dog.info[key].value;
          }
        }

        // add name field
        initialFieldState.name = dog.name.value;

        this.setState(initialFieldState);

    } else {

      throw new Error("dog was not defined on mount");
    }

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

      elements.push(<Button className="actions__action" color="danger" onClick={() => this.setState({edit:true})}>Edit</Button>);

      break;

      // edit mode
      case true:

      elements.push(<Button className="actions__action" color="danger" onClick={() => this.setUpdatedDog(this.getUpdatedDog())}>Save</Button>)

      //
      if(create === false){

        elements.push(<Button className="actions__action" color="danger" onClick={() => this.setState({edit:false})}>Cancel</Button>);
      }

      break;
    }

    return elements;
  }

  handleChange(key:string, event) {

    const updatedValue:{} = {};
    updatedValue[key] = event.target.value;

    this.setState(updatedValue);
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
                      <Input type="text" class="form-control" id="dog-name" placeholder="Dog Breed" value={this.state.name} onChange={(e) => this.handleChange('name', e)} />
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
                      <Input type="textarea" class="form-control" id="dog-name" id={key} value={this.state[key]} onChange={(e) => this.handleChange(key, e)} />
                      <small class="form-text text-muted">{dog.info[key].descriptor}</small>
                    </div>;

          break;

          case false:

          section = <React.Fragment>
                      <h3>{key}</h3>
                      <span>{this.state[key]}</span>;
                    </React.Fragment>;

          break;
        }

        elements.push(<section class="about__section">{section}</section>);
      }
    }

    return elements;
  }

  getUpdatedDog():Dog
  {
    // clone current dog object
    let updatedDog:Dog = Object.assign({}, this.props.dog[0]);

    updatedDog.name.value = this.state.name;

    // update new dog object with form field values
    for (let key:string in updatedDog.info) {

      if (updatedDog.info.hasOwnProperty(key)) {

        updatedDog.info[key].value = this.state[key];
      }
    }

    return updatedDog;
  }

  async setUpdatedDog(updatedDog:Dog)
  {
    editDog(this.getUpdatedDog());

    // wait for response

    this.setState({
      edit:false
    })
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

// set default props
About.defaultProps = { create: false };

export default About;
