const UPLOAD_FORM = "UPLOAD_FORM";
const UPDATE_FIELD_FORM = "UPDATE_FIELD_FORM";
const DYNAMIC_UPDATE_STATE = "DYNAMIC_UPDATE_STATE";

export function uploadForm(form) {
  return {
    type: UPLOAD_FORM,
    form,
  };
}

export function updateFieldForm(path, value) {
  return {
    type: UPDATE_FIELD_FORM,
    path,
    value,
  };
}

export function dynamicUpdateState(path, value) {
  return {
    type: DYNAMIC_UPDATE_STATE,
    path,
    value,
  };
}
