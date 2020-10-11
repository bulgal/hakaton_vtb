import React from "react";
import "./index.css";

export default class Table extends React.Component {
  getTableRows() {
    const { data } = this.props;
    return (
      <>
        {data.map((item, index) => (
          <tr key={index + 1} className="table__row">
            <td className="table__cell">{item.category}</td>

            <td className="table__cell">{item.everageDate}</td>

            <td className="table__cell">{item.check}</td>

            <td className="table__cell">{item.lastDate}</td>
          </tr>
        ))}
      </>
    );
  }

  render() {
    return (
      <table className="table">
        <thead className="table__header">
          <tr>
            <th className="table__title">Категория покупки</th>
            <th className="table__title">Средний период покупки, дни</th>
            <th className="table__title">Средняя сумма, руб</th>
            <th className="table__title">Дата последней покупки</th>
          </tr>
        </thead>
        <tbody>{this.getTableRows()}</tbody>
      </table>
    );
  }
}
