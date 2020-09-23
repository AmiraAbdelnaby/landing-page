/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/*select all sections */
(function(global) {
  const pSections = Array.from(document.querySelectorAll("section[data-nav]")
  );
  const navContainer = document.querySelector("#navbar__list");

  /* get all links */
  const navAnchors = navContainer.getElementsByTagName("a");
  /* define a flag for active */
  let activeFlag = false;

  /* 
    Utility functions
    =======================================
  */

  const removeClass = (c, els) => {
    Array.from(els).forEach(elem => elem.classList.remove(c));
  };

  /* 
    Event handlers
   =======================================
  */

  const handleScroll = () => {
    /* 
      Check the activeFlag, then do not run scroll handler when user is navigating by clicking
      through nav sections.
    */
    if (activeFlag) return;

    const activePSection = pSections.find(section => {
      const lowerRange = section.offsetTop;
      const upperRange = section.offsetTop + section.offsetHeight;
      const scrollPos = global.pageYOffset + 250;

      return scrollPos >= lowerRange && scrollPos <= upperRange;
    });
    let activeNavAnchor;

    removeClass("active-class", pSections);
    removeClass("active", navAnchors);

    if (activePSection) {
      activeNavAnchor = Array.from(navAnchors).find(
        anchor => anchor.getAttribute("href").slice(1) === activePSection.id
      );

      activePSection.classList.add("active-class");
      activeNavAnchor.classList.add("active");
    }
  };

  const handleClick = e => {
    e.preventDefault();
    activeFlag = true;
    const targetEl = e.target;

    if (targetEl.nodeName === "A") {
      const target = targetEl.getAttribute("href").slice(1);
      const requestedPSection = pSections.find(
        section => section.id === target
      );

      removeClass("active-section", pSections);
      removeClass("active", navAnchors);

      targetEl.classList.add("active");
      requestedPSection.scrollIntoView({ behavior: "smooth" });
      requestedPSection.classList.add("active-class");

      setTimeout(() => (activeFlag = !activeFlag), 2000);
    }
  };

  /* 
    Main functions
    =======================================
  */

  const buildNavigationMenu = () => {
    const navItemsFragment = document.createDocumentFragment();

    pSections.forEach(section => {
      const navItem = document.createElement("li");
      const linkItem = document.createElement("a");
      const sectionId = section.id;

      linkItem.textContent = section.dataset.nav;
      linkItem.classList.add("menu__link");
      linkItem.setAttribute("href", `#${sectionId}`);

      navItem.append(linkItem);
      navItemsFragment.append(navItem);
    });

    navContainer.append(navItemsFragment);
  };

  const attachEventListeners = () => {
    navContainer.addEventListener("click", handleClick);
    global.addEventListener("scroll", handleScroll);
  };

  /* 
    Initialize main functions
    =======================================
  */

  buildNavigationMenu();
  attachEventListeners();
})(window);
