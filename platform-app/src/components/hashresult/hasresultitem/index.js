import React from "react";
import "./index.css";

export default function HashResultItem({ hashResult }) {
  const getClass = (status) => {
    let className = "";
    switch (status) {
      case "positive":
        className = "indicator indicator-status_positive";
        break;
      case "negative":
        className = "indicator indicator-status_negative";
        break;
      case "disabled":
        className = "indicator indicator-status_disabled";
        break;
      default:
        className = "indicator";
    }

    return className;
  };

  const isDisable = hashResult.status === "disabled";

  const statusClassName = getClass(hashResult.status);
  return (
    <div className="hash-result__item">
      <div className="hash-result-wrapper">
        <div className={statusClassName}>
          <div className="indicator__decoration"></div>
        </div>
        <div className="hash-value">
          {hashResult.value} {isDisable && "Не расcчитано"}
        </div>
      </div>
    </div>
  );
}
