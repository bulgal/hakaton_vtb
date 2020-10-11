import React from "react";
import Content from "./components/content";
import SideBar from "./components/sidebar";
import { connect } from "react-redux";
import "./App.css";

const mapStateToProps = (state) => {
  return {
    form: state.form,
    currents: state.currents,
    actuals: state.actuals,
    statics: state.statics,
    user: state.user,
    formula: state.formula,
  };
};

class App extends React.Component {
  render() {
    const { form, currents, actuals, statics, user, formula } = this.props;
    return (
      <div className="page">
        <div className="container-app">
          {form && (
            <Content
              currents={currents}
              actuals={actuals}
              statics={statics}
              form={form}
              user={user}
            />
          )}
          <SideBar formula={formula} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(App);
