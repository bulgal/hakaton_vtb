import React from "react";
import "./index.css";
import { connect } from "react-redux";
import { uploadForm, dynamicUpdateState } from "../../redux/actions";
import { API } from "../../system/api";

const mapDispatchToProps = (dispatch) => {
  return {
    uploadForm: (form) => {
      dispatch(uploadForm(form));
    },
    dynamicUpdateState: (path, value) => {
      dispatch(dynamicUpdateState(path, value));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    purchase: state.user.purchase,
    formula: state.formula,
    card: state.card,
  };
};

class WebComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      componentIsUploaded: false,
    };
    this.locationComponent = "http://bulgal.ru/component/index.js";
  }

  initWebComponentEventListiners = () => {
    const submitButtonCustomElement = document.querySelector(
      "card-button[action=submit]"
    );
    const updateButtonCustomElement = document.querySelector(
      "card-button[action=update]"
    );

    submitButtonCustomElement.addEventListener("payment", (event) => {
      this.props.dynamicUpdateState("user.purchase", event.detail.purchase);
      this.props.dynamicUpdateState(
        "currents.fingerPrint",
        event.detail.fingerprint
      );
      this.props.dynamicUpdateState("formula", event.detail.formula);
      this.updateFormula(event.detail.formula);
      const buttonSubmit = document.querySelector("card-button[action=submit]");
      let store = JSON.parse(buttonSubmit.getAttribute("store"));

      API.postRequest("/actual", { card: store.card }, (res) => {
        this.props.dynamicUpdateState("currents.country", event.detail.country);
        this.props.dynamicUpdateState("actuals.fingerprint", res.fingerprint);
        this.props.dynamicUpdateState(
          "actuals.purchaseHistory",
          res.purchaseHistory
        );
        this.props.dynamicUpdateState("actuals.country", res.country);
      });
    });

    updateButtonCustomElement.addEventListener("update", (event) => {
      const form = JSON.parse(submitButtonCustomElement.getAttribute("store"));
      API.postRequest("/actual", { card: form.card }, (res) => {
        this.props.dynamicUpdateState("actuals.fingerprint", res.fingerprint);
        this.props.dynamicUpdateState(
          "actuals.purchaseHistory",
          res.purchaseHistory
        );
        this.props.dynamicUpdateState("actuals.country", res.country);
      });
    });
  };

  updateFormula = (data) => {
    const buttonSubmit = document.querySelector("card-button[action=submit]");
    let store = JSON.parse(buttonSubmit.getAttribute("store"));
    store["formula"] = data;
    buttonSubmit.setAttribute("store", JSON.stringify(store));
  };

  putPurchanseInForm = () => {
    const buttonSubmit = document.querySelector("card-button[action=submit]");
    let store = JSON.parse(buttonSubmit.getAttribute("store"));
    store["purchase"] = this.props.purchase;
    buttonSubmit.setAttribute("store", JSON.stringify(store));
  };

  pullStoreFromAttribute = async () => {
    const buttonCustomElement = document.querySelector(
      "card-button[action=submit]"
    );
    const form = JSON.parse(buttonCustomElement.getAttribute("store"));

    await API.postRequest("/init", form, (res) => {
      this.props.uploadForm(form);
      this.props.dynamicUpdateState("statics.countries", res.countries);
      this.props.dynamicUpdateState("currents.country", {
        status: "positive",
        value: res.countries[0].label,
      });

      this.props.dynamicUpdateState("formula", res.formula);
      this.putPurchanseInForm();
      this.updateFormula(res.formula);
      this.props.dynamicUpdateState("form.ip", res.countries[0].value);
    });
    await API.postRequest("/actual", { card: form.card }, (res) => {
      this.props.dynamicUpdateState("actuals.fingerprint", res.fingerprint);
      this.props.dynamicUpdateState(
        "actuals.purchaseHistory",
        res.purchaseHistory
      );
      this.props.dynamicUpdateState("actuals.country", res.country);
    });
  };

  loadComponent = () => {
    const tag = document.createElement("script");
    const body = document.querySelector("body");
    const self = this;

    tag.async = true;
    tag.src = this.locationComponent;
    tag.onload = function () {
      self.pullStoreFromAttribute();
      self.initWebComponentEventListiners();
    };

    body.appendChild(tag);
  };

  componentDidMount() {
    this.loadComponent();
  }

  render() {
    return (
      <div className="web-component">
        <payment-form></payment-form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebComponent);
