import { TYPES } from "app/system/constants";

export class Collector {
  static GetUserEquipmentData(blank) {
    const {
      language,
      hardwareConcurrency,
      platform,
      cookieEnabled,
      userAgent,
    } = blank;

    return {
      data: {
        userAgent: userAgent,
        language,
        hardwareConcurrency,
        platform,
        cookieEnabled,
        GPUDriver: Collector.__getUserGPU(),
        screen: Collector.__getUserScreenSize(blank),
        timezoneOffset: Collector.__getUserTimeZoneOffset(),
        plugins: Collector.__getUserPlugins(blank),
        ...Collector.__getTrash(blank),
        ip: blank.ip ? blank.ip : "127.0 0.1",
      },
      card: blank.card ? blank.card : Collector.__getAccount(),
      ip: "127.0 0.1",
      purchase: blank.purchase,
    };
  }

  static __getTrash(blank) {
    return {
      product: "Developers",
      statistics: "stable",
      secureKey: "Mx2501",
      isMixed: "251515",
      paymenter: "User24",
      near: Math.random(),
      currentVersion: 25,
      public: "home",
      touches: 22,
      extenstions: "Pdf/Viewer, Translator",
      maxBytes: 2415,
      maxDelay: 2,
      canDetect: "no",
      agency: "free",
      workers: "Down Town",
    };
  }

  static __getAccount() {
    return {
      cardKey: "1111111111111111",
      cvv: "123",
      dateEnd: "12/30",
      cardHolder: "Test User",
      sum: "851",
    };
  }

  static __getUserGPU() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl");

    if (context && context instanceof WebGLRenderingContext) {
      const extension = context.getExtension("WEBGL_debug_renderer_info");
      const GPUDriver = context.getParameter(extension.UNMASKED_RENDERER_WEBGL);
      canvas.remove();

      return GPUDriver;
    }

    return TYPES.EMPTY_FIELD;
  }

  static __getUserScreenSize(blank) {
    const width = blank.width;
    const height = blank.height;

    return {
      width,
      height,
    };
  }

  static __getUserTimeZoneOffset() {
    return new Date().getTimezoneOffset();
  }

  static __getUserPlugins(blank) {
    if (blank.plugins) {
      let plugins = blank.plugins;

      if (!plugins || plugins.length <= 0 || typeof plugins === "string") {
        return "";
      }

      return plugins.join(",");
    }
  }
}
