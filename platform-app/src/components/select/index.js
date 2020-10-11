import React from "react";
import { connect } from "react-redux";
import { dynamicUpdateState } from "../../redux/actions";
import "./index.css";

const mapDispatchToProps = (dispatch) => {
  return {
    dynamicUpdateState: (path, value) => {
      dispatch(dynamicUpdateState(path, value));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    purchase: state.user.purchase,
    form: state.form,
  };
};

class Select extends React.Component {
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
  putPurchanseInForm = () => {
    const buttonSubmit = document.querySelector("card-button[action=submit]");
    let store = JSON.parse(buttonSubmit.getAttribute("store"));
    store["purchase"] = this.props.purchase;
    buttonSubmit.setAttribute("store", JSON.stringify(store));
  };

  handleOnChange = (event) => {
    this.setState(
      {
        value: event.target.value,
      },
      () => {
        this.props.dynamicUpdateState(this.props.path, this.state.value);
      }
    );
  };

  render() {
    const { options, label, value } = this.props;

    return (
      <label className="form__label">
        <span className="form__label-title">{label}</span>
        <select onChange={this.handleOnChange} className="form__select">
          {options.map((option, index) => (
            <option
              selected={value === option.value}
              key={index + 1}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Select);
