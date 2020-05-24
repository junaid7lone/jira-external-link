//Is Document ready
function ready(callbackFunc) {
  if (document.readyState !== "loading") {
    callbackFunc();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", callbackFunc);
  }
}

//Match  text
function matchLink(string) {
  if (string && string.match("atlassian.net")) {
    return true;
  }
}

//Find all links in the DOM
function checkForLinks() {
  const all = document.querySelectorAll("a");
  all.forEach((anchor) => {
    if (!matchLink(anchor.href) && !anchor.target) {
      anchor.setAttribute("target", "_blank");
    }
  });
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations, observer) {
  debounce(checkForLinks(), 500);
});

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

ready(function () {
  observer.observe(document, {
    subtree: true,
    attributes: true,
  });
});
