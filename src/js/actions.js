import type {Dog} from "../ui.jsx";

export const ADD_DOG = 'ADD_DOG';
export const EDIT_DOG = 'EDIT_DOG';

/***

NOTE - Would call middleware to push changes to the server before verfiying and updating the store if successful ie.

export function store(data) {
  return dispatch =>
    fetch('http://xxxxxxxxxxxxxxxx', {
      ...
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {

        dispatch(addDog(response));

      } else {

        const error = new Error(response.statusText);
        error.response = response;
        dispatch(errorAction(error));
      }
    })
    .catch(error => { console.log('request failed', error); });
}

***/

// for the purposes of this mockup we just call the actions directly, pretending that they have been stored successfully

export function addDog(newDog:Dog) {
  return { type: ADD_DOG, newDog:newDog }
}

export function editDog(updatedDog:Dog) {
  return { type: EDIT_DOG, updatedDog:updatedDog }
}
