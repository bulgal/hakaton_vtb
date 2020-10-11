import { Collector } from "./lib/Collector";
import { CONFIG } from "app/system/config";

class FingerPrint {
  static regirster() {
    let serialazidObject = {};

    for (let i in window.navigator) serialazidObject[i] = window.navigator[i];
    for (let i in window.screen) serialazidObject[i] = window.screen[i];
    serialazidObject["plugins"] = [];
    try {
      if (window.navigator.plugins) {
        for (let i in Object.keys(window.navigator.plugins)) {
          serialazidObject["plugins"].push(window.navigator.plugins[i]["name"]);
        }
      }
    } catch {}
    serialazidObject = { ...serialazidObject, purchase: null, formula: null };

    const deeper = JSON.parse(JSON.stringify(serialazidObject));

    FingerPrint.prototype.snapshot = CONFIG.debugg
      ? deeper
      : Object.freeze(deeper);
  }

  static makeUserSnapshot() {
    const userEquipmentData = Collector.GetUserEquipmentData(
      FingerPrint.prototype.snapshot
    );

    return userEquipmentData;
  }
}

if (CONFIG.debugg) {
  FingerPrint.prototype.updateSnapshot = function (customData) {
    FingerPrint.prototype.snapshot = {
      ...customData.data,
      ip: customData.ip,
      card: customData.card,
      purchase: customData.purchase,
      formula: customData.formula,
    };
  };
}
FingerPrint.regirster();

export { FingerPrint };
