import { createViewHandler } from "../utils/api.util";

export const VIEW_PAGE_TITLE_SUFFIX = " | myCoolApp";

export const viewController = {
   handleHomePage: createViewHandler("pages/home", () => ({
      title: "Home",
   })),
   handleAboutPage: createViewHandler("pages/about", () => ({
      title: "About",
   })),
   handleScanTestPage: createViewHandler("pages/scan-test", () => ({
      title: "Scan Test",
   })),
};
