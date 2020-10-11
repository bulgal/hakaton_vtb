import React from "react";
import WebComponent from "../webcomponent";
import "./index.css";
import Input from "../input";

export default function SideBar({ formula }) {
  let formulaClassName = "";
  if (formula) {
    formulaClassName =
      formula.result.status === "posititve"
        ? "formula-result-table__percents formula-result-table__percents-status_positive"
        : "formula-result-table__percents formula-result-table__percents-status_negative";
  }
  const computeResult = (value) => {
    if (!value) {
      return "0";
    } else {
      return parseInt(value) / 100;
    }
  };

  return (
    <aside className="side-bar wrapper component-styling">
      <h1 className="side-bar title">Среднее арифметическое взвешенное</h1>
      <section className="block">
        {formula && (
          <form className="formula-form">
            <div className="formula-form__row">
              <h2 className="block__title">Отпечаток пользователя</h2>
              <Input
                type="number"
                min={1}
                absoluteWidth={true}
                placeholder="0"
                label="Вес"
                value={formula.criteria.fingerprint.weight}
                path={"formula.criteria.fingerprint.weight"}
              />
              <div className="formula-form__result-text">
                Результат:
                <span>{formula.criteria.fingerprint.result}</span>
              </div>
            </div>

            <div className="formula-form__row">
              <h2 className="block__title">Геопозиция</h2>
              <Input
                type="number"
                min={1}
                absoluteWidth={true}
                placeholder="0"
                label="Вес"
                value={formula.criteria.country.weight}
                path={"formula.criteria.country.weight"}
              />
              <div className="formula-form__result-text">
                Результат:
                <span>{formula.criteria.country.result}</span>
              </div>
            </div>

            <div className="formula-form__row">
              <h2 className="block__title">Покупка</h2>
              <Input
                type="number"
                min={1}
                absoluteWidth={true}
                placeholder="0"
                label="Вес"
                value={formula.criteria.purchase.weight}
                path={"formula.criteria.purchase.weight"}
              />
              <div className="formula-form__result-text">
                Результат:
                <span>{computeResult(formula.criteria.purchase.result)}</span>
              </div>
            </div>

            <div className="formula-form__row">
              <div className="formula-result-table">
                <div className="formula-result-table__info">
                  <div className={formulaClassName}>
                    {formula.result.value ? formula.result.value : "0"}%
                  </div>
                  <div className="formula-result-table__label">Набрано</div>
                </div>

                <div className="formula-result-table__info">
                  <div className="formula-result-table__percents formula-result-table__percents-status_disabled">
                    {formula.result.need}%
                  </div>
                  <div className="formula-result-table__label">
                    Необходимо набрать
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </section>
      <section className="block">
        <h2 className="block__title">Информация о карте</h2>
        <WebComponent />
      </section>
    </aside>
  );
}
