import { Engine } from "../vendors/engine/dist";
import { CONFIG } from "../system/config";

export class ButttonElement extends HTMLElement {
  constructor() {
    super();
    this.isValide = true;
  }

  addErrors() {
    document.querySelector(".errors").innerHTML =
      "Необходимо заполнить все поля";
  }

  deleteErrors() {
    document.querySelector(".errors").innerHTML = "";
  }

  validate(data, FingerPrint) {
    const name = document.getElementById("name");
    const cardnumber = document.getElementById("cardnumber");
    const expirationdate = document.getElementById("expirationdate");
    const securitycode = document.getElementById("securitycode");
    let { card } = data;

    card.cardHolder = name.value;
    card.cardKey = cardnumber.value;
    card.dateEnd = expirationdate.value;
    card.cvv = securitycode.value;
    FingerPrint.prototype.updateSnapshot({ ...data });

    if (card.cardHolder.length < 4) {
      this.isValide = false;
    }

    if (card.cardKey.replace(/\s+/g, "").length < 16) {
      this.isValide = false;
    }

    if (card.dateEnd.length < 5) {
      this.isValide = false;
    }
    if (card.cvv.length < 3) {
      this.isValide = false;
    }
  }

  connectedCallback() {
    const title = this.getAttribute("title");
    const action = this.getAttribute("action");
    const { FingerPrint } = Engine.getModules();
    if (action === "submit") {
      this.setAttribute(
        "store",
        JSON.stringify(FingerPrint.makeUserSnapshot())
      );
    }

    this.innerHTML = this.template(title);
    this.addEventListener("click", (ev) => {
      const buttonSubmit = document.querySelector("card-button[action=submit]");
      const store = JSON.parse(buttonSubmit.getAttribute("store"));
      switch (action) {
        case "submit":
          this.isValide = true;
          FingerPrint.prototype.updateSnapshot(store);
          const data = FingerPrint.makeUserSnapshot();
          // this.validate(data, FingerPrint);

          if (this.isValide) {
            this.deleteErrors();
            this.__buttonDisabling(ev.target);
            fetch(CONFIG.url + "/payment", {
              headers: {
                "Content-type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((res) => {
                const event = new CustomEvent("payment", {
                  detail: res,
                });
                this.dispatchEvent(event);
                this.__buttonUnDisabling(ev.target);
              });
          } else {
            this.addErrors();
          }

          break;
        case "update":
          this.__buttonDisabling(ev.target);
          FingerPrint.prototype.updateSnapshot(store);

          const updatedData = FingerPrint.makeUserSnapshot();

          fetch(CONFIG.url + "/update", {
            headers: {
              "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(updatedData),
          })
            .then((res) => res.json())
            .then((res) => {
              const event = new CustomEvent("update", {
                detail: res,
              });
              this.dispatchEvent(event);
              this.__buttonUnDisabling(ev.target);
            });
          break;
        default:
          return false;
      }
    });
  }

  __buttonDisabling(element) {
    if (!element.classList.contains("disabled"))
      element.classList.add("disabled");
  }

  __buttonUnDisabling(element) {
    if (element.classList.contains("disabled"))
      element.classList.remove("disabled");
  }

  template(title) {
    const template = `
      <style>
        .card__submit-button {
           height: 45px;
           width: 100%;
           display: flex;
           justify-content: center;
           align-items: center;
           color: #ffffff;
           background: linear-gradient(91.31deg, #3CBA92 -6.43%, #16AB7C 109.7%, #0BA360 109.72%);
           border-radius: 6px;
           margin-top: 10px;
           font-family: 'Roboto', sans-serif;
           cursor: pointer;
        }

        .upd .card__submit-button {
          background: transparent;
          border: 1px solid #3CBA92;
          color: #3CBA92;
        }

        .card__submit-button.disabled {
          opacity: .5;
        }
      </style>
      <div class="card__submit-button">
        ${title}
      </div>
   `;

    return template;
  }
}

customElements.define("card-button", ButttonElement);
