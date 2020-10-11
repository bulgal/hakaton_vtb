import { INITIAL_STATE } from "./initialState";
import * as immutable from "object-path-immutable";

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPLOAD_FORM":
      return Object.assign({}, state, {
        form: action.form,
      });

    case "UPDATE_FIELD_FORM":
      return Object.assign({}, state, {
        form: immutable.set(state.form, action.path, action.value),
      });
    case "DYNAMIC_UPDATE_STATE":
      return Object.assign({}, state, {
        ...immutable.set(state, action.path, action.value),
      });
    default:
      return state;
  }
}
