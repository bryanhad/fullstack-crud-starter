import { createViewHandler } from "../utils/api.util";

const PAGE_TITLE_SUFFIX = "| myCoolApp";

export const viewController = {
   handleHomePage: createViewHandler("pages/home", () => ({
      title: "Home",
      PAGE_TITLE_SUFFIX,
   })),
   handleAboutPage: createViewHandler("pages/about", () => ({
      title: "About",
      PAGE_TITLE_SUFFIX,
   })),
};
