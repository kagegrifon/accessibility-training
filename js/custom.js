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


(function reminder () {
  var container = document.getElementById('notification');

  var startNotify = function notify() {
    setTimeout(function() {
      showNotification();
      notify();
    }, 30 * 1000);
  };

  function showNotification() {
    container.classList.add('notification-shown');
    container.setAttribute('aria-live', 'polite');

    setTimeout(function() {
      hideNotification();
    }, 10 * 1000);
  }

  function hideNotification() {
    container.classList.remove('notification-shown');
    container.setAttribute('aria-live', 'off');
  }

  startNotify();
})();

(function tabHandler() {
  var tabContolContainer = document.getElementById('tab-control-container1');
  var tabPanelContainer = document.getElementById('tab-panel-container1');

  var tabButtons = Array.from(tabContolContainer.querySelectorAll(".tab-control-item"));
  var tabPanels = Array.from(tabPanelContainer.querySelectorAll(".tab-pane"));
  var activeButton = null;

  tabContolContainer.addEventListener('click', tabControlClickHandler);
  tabContolContainer.addEventListener("focusin", addKeyHandler);
  tabContolContainer.addEventListener("focusout", removeKeyHandler);

  function tabControlClickHandler (event) {
    var clickedButton = event.target.closest('.tab-control-item');

    if (!clickedButton) return;
  
    if (!tabContolContainer.contains(clickedButton)) return;

    activateTab(clickedButton);
  }

  function activateTab (button) {
    setActiveButton(button);
    setActivePanel(activeButton.dataset.target);
  }

  function setActiveButton(newActiveButton) {
    if (activeButton) toggleButtonActive(activeButton, false);

    activeButton = newActiveButton;
    toggleButtonActive(activeButton, true);
  }


  function setActivePanel(activePanelId) {
    tabPanels.forEach(function(tabPanel) {
      toggleTabActive(tabPanel, tabPanel.id == activePanelId);
    });
  }
  
  function toggleButtonActive (buttonNode, isActive) {
    buttonNode.classList.toggle("is-active", isActive);
    buttonNode.setAttribute('aria-selected', String(isActive));
    buttonNode.setAttribute('tabindex', isActive ? "0" : "-1");
  }

  function toggleTabActive (tabNode, isActive) {
    tabNode.style.display = isActive ? "block" : 'none';
  }

  function addKeyHandler() {
    tabContolContainer.addEventListener('keydown', tabKeyHandler);
  }

  function removeKeyHandler() {
    tabContolContainer.removeEventListener('keydown', tabKeyHandler);
  }

  function tabKeyHandler(event) {
    var curActiveIndex = tabButtons.indexOf(activeButton);
    var getActiveButtonByKeyCode = {
      "ArrowRight": function() { return getNextActiveButton(curActiveIndex) },
      "ArrowLeft": function() { return getPreviousActiveButton(curActiveIndex) },
      "Home": function() { return getFirstActiveButton() },
      "End": function() { return getLastActiveButton() },
    };

    if (Object.keys(getActiveButtonByKeyCode).indexOf(event.code) !== -1) {
      event.preventDefault();

      var nextActiveButton = getActiveButtonByKeyCode[event.code]();

      setActiveButton(nextActiveButton);
      activeButton.focus();
    }

    function getNextActiveButton(curIndex) {
      var nextIndex = curIndex + 1;
      if (nextIndex === tabButtons.length) {
        nextIndex = 0;
      }
      return tabButtons[nextIndex];
    }

    function getPreviousActiveButton(curIndex) {
      var nextIndex = curIndex - 1;
      if (nextIndex < 0) {
        nextIndex = tabButtons.length - 1;
      }
      
      return tabButtons[nextIndex];
    }

    function getFirstActiveButton() {
      return tabButtons[0];
    }

    function getLastActiveButton() {
      return tabButtons[tabButtons.length - 1];
    }
  }
})();