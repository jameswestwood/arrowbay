/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import { connect, dispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import history from '../../history'

import { Button, Input } from 'reactstrap';

import { addDog } from '../../actions';
//import type { Dog } from "../ui.jsx";
import { Dog } from "../ui.jsx";

type State = {
  name:string,
  valid:boolean
}

class Create extends React.Component<Props, State>
{
  constructor(props:Props){

    super(props);

    this.state = {
      name: '',
      valid: false
    }
  }

  // TODO - check for other cases such as only spaces, numbers, punctuation etc
  handleChange(event) {

    this.setState({name: event.target.value}, () => {

      if(this.state.name.length === 0
        && this.state.valid === true){

        this.setState({valid: false});

      }else if(this.state.name.length > 0
              && this.state.valid === false){

        this.setState({valid: true});
      }
    });
  }

  setNewDog(){
    // create new dog
    const newDog:Dog = new Dog(this.state.name);

    this.props.dispatchNewDog(newDog);

    history.push('/dog/' + newDog.path);
  }

  render(){
    return (
      <div className="create">
        <h2>Add a new dog</h2>
        <div className="form-group">
          <label for="dog-name">Dog Breed</label>
          <Input type="text" className="form-control" id="dog-name" placeholder="Dog Breed" value={this.state.name} onChange={(e) => this.handleChange(e)} />
          <small className="form-text text-muted">The name of the breed.</small>
        </div>
        <Button disabled={!this.state.valid} className="actions__action" color="danger" onClick={() => this.setNewDog()}>Save</Button>
        <Button className="actions__action" color="danger" onClick={() => history.push('/')}>Cancel</Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchNewDog: (newDog) => dispatch(addDog(newDog)),
  }
}


export default connect(
  null,
  mapDispatchToProps
)(Create)
