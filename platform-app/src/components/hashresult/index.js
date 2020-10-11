import React from "react";
import "./index.css";
import HashResultItem from "./hasresultitem";

export default function HashResult({ hashResults }) {
  return (
    <div className="hash-result">
      {hashResults.map((hashResult, index) => (
        <HashResultItem key={index + 1} hashResult={hashResult} />
      ))}
    </div>
  );
}
