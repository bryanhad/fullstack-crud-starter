import { createViewHandler } from "@/utils/api.util";

const PAGE_TITLE_SUFFIX = "| Hellow!";

export const handleHomePage = createViewHandler("pages/home", () => ({
   title: "Home",
   PAGE_TITLE_SUFFIX,
}));

export const handleAboutPage = createViewHandler("pages/about", () => ({
   title: "About",
   PAGE_TITLE_SUFFIX,
}));
