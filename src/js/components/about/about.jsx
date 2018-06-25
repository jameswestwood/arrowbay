/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import { connect, dispatch } from 'react-redux';

import { Button, Input } from 'reactstrap';

import { editDog } from '../../actions';
import type { Dog } from "../app.jsx";

type Props = {
  dog:Array<Dog>
}

type State = {
  edit:boolean // are the field editable?
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

  componentDidMount()
  {
    if(this.props.dog[0] != null)
      {
        const dog:Dog = this.props.dog[0];
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

      elements.push(<Button className="actions__action" color="danger" onClick={() => this.setUpdatedDog(this.getDog())}>Save</Button>)
      elements.push(<Button className="actions__action" color="danger" onClick={() => this.setState({edit:false})}>Cancel</Button>)

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
    elements.push(<h2>{dog.name}</h2>);

    // sections

    for (let key:string in dog.info) {

      if (dog.info.hasOwnProperty(key)) {

        let section:React.Element;

        switch(this.state.edit)
        {
          case true:

          section = <div className="form-group">
                      <label for={key}>{key}</label>
                      <Input type="textarea" className="form-control" id="dog-name" id={key} value={this.state[key]} onChange={(e) => this.handleChange(key, e)} />
                      <small className="form-text text-muted">{dog.info[key].descriptor}</small>
                    </div>;

          break;

          case false:

          section = <React.Fragment>
                      <h3>{key}</h3>
                      <span>{this.state[key]}</span>;
                    </React.Fragment>;

          break;
        }

        elements.push(<section className="about__section">{section}</section>);
      }
    }

    return elements;
  }

  getDog():Dog
  {
    // clone current dog object
    let updatedDog:Dog = Object.assign({}, this.props.dog[0]);

    // update new dog object with form field values
    for (let key:string in updatedDog.info) {

      if (updatedDog.info.hasOwnProperty(key)) {

        updatedDog.info[key].value = this.state[key];
      }
    }

    return updatedDog;
  }

  setUpdatedDog(updatedDog:Dog)
  {
    this.props.dispatchEditedDog(updatedDog);

    // wait for response

    this.setState({
      edit:false
    })
  }

  render(){
    return (
      <div className="about content">
        { this.renderContent(this.props.dog[0], this.state.edit, this.state.create) }
        <div className="about__actions">
          { this.renderActions(this.state.edit, this.state.create) }
        </div>
      </div>
    );
  }
}

// set default props
About.defaultProps = { create: false };

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEditedDog: (updatedDog) => dispatch(editDog(updatedDog))
  }
}


export default connect(
  null,
  mapDispatchToProps
)(About)
