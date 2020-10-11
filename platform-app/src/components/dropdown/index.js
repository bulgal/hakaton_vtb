import React from "react";

export default class DropDown extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpenned: false,
    };
  }

  toggleArrow = () => {
    this.setState({ isOpenned: !this.state.isOpenned });
  };

  render() {
    const { title, scrollHorizontal } = this.props;
    const { isOpenned } = this.state;
    const arrowClassName = isOpenned
      ? "arrow arrow-state_open"
      : "arrow arrow-state_close";

    const classNameBlock = scrollHorizontal
      ? "block block_scroll wrapper component-styling"
      : "block wrapper component-styling";
    return (
      <section className={classNameBlock}>
        <div className="block__wrapper-title">
          <h2 className="block__title">{title}</h2>
          <div onClick={this.toggleArrow} className={arrowClassName}></div>
        </div>
        {isOpenned && <>{this.props.children}</>}
      </section>
    );
  }
}
