import type {Dog} from "../ui.jsx";

export const ADD_DOG = 'ADD_DOG';

export function addDog(newDog:Dog) {
  return { type: ADD_DOG, newDog:newDog }
}
