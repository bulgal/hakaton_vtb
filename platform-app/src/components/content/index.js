import React from "react";
import Input from "../input";
import HashResult from "../hashresult";
import Select from "../select";
import DropDown from "../dropdown";
import ProgressBar from "../progressbar";
import Table from "../table";
import "./index.css";

export default function Content({ form, actuals, currents, statics, user }) {
  const userForm = form.data;

  return (
    <main className="content">
      <DropDown title="Отпечаток пользователя">
        <form className="form">
          <div className="form__row">
            <Input
              type="text"
              placeholder="Драйвер видеокарты"
              label="Драйвер видеокарты"
              value={form.data.GPUDriver}
              name="GPUDriver"
              path={"form.data.GPUDriver"}
            />
            <Input
              type="text"
              placeholder="Кол-во ядер процессора"
              value={userForm.hardwareConcurrency}
              name="hardwareConcurrency"
              path={"form.data.hardwareConcurrency"}
              label="Кол-во ядер процессора"
            />
          </div>

          <div className="form__row">
            <Input
              value={userForm.language}
              name="language"
              type="text"
              placeholder="Язык"
              path={"form.data.language"}
              label="Язык"
            />
            <Input
              value={userForm.platform}
              name="platform"
              type="text"
              placeholder="Платформа"
              path={"form.data.platform"}
              label="Платформа"
            />
          </div>
          <div className="form__row">
            <Input
              value={
                form.data.extenstions ? form.data.extenstions : "Pdf, devtools"
              }
              path={"form.data.extenstions"}
              type="text"
              placeholder="Плагины"
              label="Плагины"
            />
            <Input
              value={userForm.userAgent}
              name="platform"
              type="text"
              placeholder="Юзер агент"
              path={"form.data.userAgent"}
              label="Юзер агент"
            />
          </div>
          <div className="form__row">
            <Input
              value={actuals.fingerprint}
              path={"actuals.fingerprint"}
              type="text"
              disabled={true}
              placeholder=""
              label="Отпечаток пользователя в базе данных"
            />
            <div className="form-fingerprint">
              <span className="form__label-title">
                Полученный отпечаток пользователя
              </span>
              <HashResult hashResults={[currents.fingerPrint]} />
            </div>
          </div>
        </form>
      </DropDown>

      <DropDown title="Геопозиция">
        <form className="form">
          <div className="form__row">
            <Select
              label="В какой стране будет транзакция"
              options={statics.countries}
              value={form.ip}
              path="form.ip"
            />
          </div>
          <div className="form__row">
            <Input
              disabled={true}
              type="text"
              value={actuals.country}
              placeholder="Геопозиция в базе данных"
              label="Геопозиция в базе данных"
            />
            <div className="form-fingerprint">
              <span className="form__label-title">Полученная геопозиция</span>
              <HashResult hashResults={[currents.country]} />
            </div>
          </div>
        </form>
      </DropDown>

      <DropDown title="Покупка">
        <form className="form">
          <div className="form__buy-form-wrapper">
            <div>
              <div className="form__row form__row-size_half_width">
                <Select
                  label="Категория"
                  value={statics.purchaseData.categories[0].value}
                  path="user.purchase.category"
                  options={statics.purchaseData.categories}
                />
              </div>

              <div className="form__row form__row-size_half_width">
                <Input
                  value={user.purchase.sum}
                  type="text"
                  path="user.purchase.sum"
                  label="Сумма"
                  placeholder="1000"
                />
              </div>

              <div className="form__row form__row-size_half_width">
                <Input
                  value={user.purchase.date}
                  path="user.purchase.date"
                  type="text"
                  placeholder="дд.мм.гггг"
                  label="Дата"
                />
              </div>
            </div>
            <ProgressBar value={user.purchase.percent} />
          </div>
        </form>
        <DropDown scrollHorizontal={true} title="Статистика покупок">
          <Table data={actuals.purchaseHistory} />
        </DropDown>
      </DropDown>
    </main>
  );
}
