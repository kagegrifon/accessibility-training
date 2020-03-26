(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

(function skipToContentLogic () {
  var skipToContentContainer = document.getElementById('skip-content');
  var buttonMenuToggler = skipToContentContainer.querySelector('.expand-menu-toggler');
  var menuList = skipToContentContainer.querySelector('.short-nav-list');
  var isExpanded = false;

  var showMenuToggle = function() {
    isExpanded = !isExpanded;

    menuList.classList.toggle('expanded', isExpanded);
    buttonMenuToggler.setAttribute('aria-expanded', isExpanded);
  };

  var onBodyClick = function() {
    showMenuToggle();
    document.body.removeEventListener('click', onBodyClick);
  }

  var buttonOnClick = function(e) {
    e.stopPropagation();
    showMenuToggle();

    if (isExpanded) {
      document.body.addEventListener('click', onBodyClick);
    } else {
      document.body.removeEventListener('click', onBodyClick);
    }
  }

  buttonMenuToggler.addEventListener('click', buttonOnClick);
})();
