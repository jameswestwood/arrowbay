import type {Dog} from "../ui.jsx";

export const ADD_DOG = 'ADD_DOG';
export const EDIT_DOG = 'EDIT_DOG';

export function addDog(newDog:Dog) {
  return { type: ADD_DOG, newDog:newDog }
}

export function editDog(updatedDog:Dog) {
  return { type: EDIT_DOG, updatedDog:updatedDog }
}
