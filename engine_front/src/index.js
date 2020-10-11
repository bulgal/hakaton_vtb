import { FingerPrint, Service } from "./modules/";

export class Engine {
  static getModules() {
    return {
      FingerPrint,
      Service,
    };
  }
}

FingerPrint.prototype.updateSnapshot(FingerPrint.makeUserSnapshot());
