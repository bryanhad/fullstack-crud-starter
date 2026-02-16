function handleNavbar() {
   const currentPath = globalThis.location.pathname;

   for (const link of document.querySelectorAll("nav a")) {
      const isActive = link.getAttribute("href") === currentPath;
      link.classList.toggle("text-orange-500", isActive);
      link.classList.toggle("text-gray-400", !isActive);
   }
}
function handlePageInfo(xhr: XMLHttpRequest) {
   const pageTitleAttribute = "data-page-title";
   const parser = new DOMParser();
   const doc = parser.parseFromString(xhr.responseText, "text/html");

   const titleElement = doc.querySelector(`[${pageTitleAttribute}]`);
   const newTitle = titleElement?.getAttribute(`${pageTitleAttribute}`);

   if (newTitle) {
      document.title = `${newTitle}`;
   }
}

document.body.addEventListener("htmx:afterOnLoad", (e) => {
   const event = e as CustomEvent;
   const eventDetail = event.detail as { xhr: XMLHttpRequest };

   handlePageInfo(eventDetail.xhr);
   handleNavbar();
});

handleNavbar();
