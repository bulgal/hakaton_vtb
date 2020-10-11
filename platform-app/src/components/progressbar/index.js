import React from "react";
import "./index.css";

export default function ProgressBar({ value }) {
  return (
    <div className="progress-bar">
      <div className="progress-bar__value">
        <div>{value}%</div>
        <div className="progress-bar__title">Процент одобрения</div>
      </div>
    </div>
  );
}
