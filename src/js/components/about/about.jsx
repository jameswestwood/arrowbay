/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import { connect, dispatch } from 'react-redux';

import { Button, Input, Alert, FormGroup, Label } from 'reactstrap';

import { editDog } from '../../actions';
import type { Dog } from "../app.jsx";

import styles from './about.css';

type Props = {
  dog:Array<Dog>
}

type State = {
  edit:boolean,
  success:boolean // was the edit successful?
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

      elements.push(<Button key="edit-btn" className="actions__action" color="primary" onClick={() => this.setState({edit:true})}>Edit</Button>);

      break;

      // edit mode
      case true:

      elements.push(<Button key="save-btn" className="actions__action" color="primary" onClick={() => this.setUpdatedDog(this.getDog())}>Save</Button>)
      elements.push(<Button key="cancel-btn" className="actions__action" color="secondary" onClick={() => this.cancelEdit()}>Cancel</Button>)

      break;
    }

    return elements;
  }

  cancelEdit(){

    this.setState({edit:false});
    this.resetFields();
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
    elements.push(<h2 className="about__heading" key={"heading"}>{dog.name}</h2>);

    // sections
    for (let key:string in dog.info) {

      if (dog.info.hasOwnProperty(key)) {

        let section:React.Element;

        switch(this.state.edit)
        {
          case true:

          section = <FormGroup>
                      <Input type="textarea"
                             className="about__input form-control"
                             id={key}
                             value={this.state[key]}
                             onChange={(e) => this.handleChange(key, e)} />
                      <small className="about__description form-text">{dog.info[key].descriptor}</small>
                    </FormGroup>

          break;

          case false:

          section = <div>
                      {this.state[key]}
                    </div>

          break;
        }

        elements.push(<section className={"about__section" + (!this.state.edit ? " about__section--static" : "")} key={(key) + "-section"}>
                        <h3 className="about__sub-heading">{key}</h3>
                        {section}
                      </section>);
      }
    }

    return elements;
  }

  resetFields()
  {
    // clone current dog object
    let currentDog:Dog = Object.assign({}, this.props.dog[0]);
    let newInputState = {};

    // update new dog object with form field values
    for (let key:string in currentDog.info) {

      if (currentDog.info.hasOwnProperty(key)) {

        newInputState[key] = currentDog.info[key].value;
      }
    }

    this.setState(newInputState);
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

    // NOTE - wait here for response that was saved to server successfully

    this.setState({
      edit:false,
      success:true
    })
  }

  render(){
    return (
      <div className="about content">
        { this.state.success === true &&
        <Alert color="success">
          Your update was saved.
        </Alert>
        }

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
