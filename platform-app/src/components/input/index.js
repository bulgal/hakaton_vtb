import React from "react";
import { connect } from "react-redux";
import { updateFieldForm, dynamicUpdateState } from "../../redux/actions";
import "./index.css";

const mapDispatchToProps = (dispatch) => {
  return {
    updateFieldForm: (path, value) => {
      dispatch(updateFieldForm(path, value));
    },
    dynamicUpdateState: (path, value) => {
      dispatch(dynamicUpdateState(path, value));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    purchase: state.user.purchase,
    form: state.form,
    formula: state.formula,
  };
};

class Input extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.purchase !== this.props.purchase) {
      this.putPurchanseInForm();
    }

    if (prevProps.form !== this.props.form) {
      this.updateForm();
    }

    if (prevProps.formula !== this.props.formula) {
      this.updateFormula();
    }

    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value,
      });
    }
  }

  updateForm = () => {
    const buttonSubmit = document.querySelector("card-button[action=submit]");
    let store = JSON.parse(buttonSubmit.getAttribute("store"));
    store["data"] = this.props.form.data;
    store["ip"] = this.props.form.ip;
    buttonSubmit.setAttribute("store", JSON.stringify(store));
  };

  updateFormula = () => {
    const buttonSubmit = document.querySelector("card-button[action=submit]");
    let store = JSON.parse(buttonSubmit.getAttribute("store"));
    store["formula"] = { ...this.props.formula };
    buttonSubmit.setAttribute("store", JSON.stringify(store));
  };

  putPurchanseInForm = () => {
    const buttonSubmit = document.querySelector("card-button[action=submit]");
    let store = JSON.parse(buttonSubmit.getAttribute("store"));
    store["purchase"] = this.props.purchase;
    buttonSubmit.setAttribute("store", JSON.stringify(store));
  };

  handleOnChange = (event) => {
    let valueEvent = event.target.value;
    this.setState(
      {
        value: valueEvent,
      },
      () => {
        this.props.dynamicUpdateState(this.props.path, this.state.value);
      }
    );
  };

  render() {
    const {
      label,
      type,
      placeholder,
      disabled,
      min,
      absoluteWidth,
    } = this.props;
    const classNameInput = absoluteWidth
      ? "form__input form__input__width-absolute"
      : "form__input";
    return (
      <label className="form__label">
        <span className="form__label-title"> {label}</span>
        <input
          min={min}
          onChange={this.handleOnChange}
          disabled={disabled}
          type={type}
          value={this.state.value}
          placeholder={placeholder}
          className={classNameInput}
        />
      </label>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
