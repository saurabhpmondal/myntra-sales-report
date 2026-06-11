/* ==========================================
   DOM UTILS
   Myntra Sales Intelligence
========================================== */

/* ==========================================
   QUERY SELECTOR
========================================== */

export function $(
  selector,
  parent = document
) {

  return parent.querySelector(
    selector
  );

}

/* ==========================================
   QUERY SELECTOR ALL
========================================== */

export function $$(
  selector,
  parent = document
) {

  return Array.from(
    parent.querySelectorAll(
      selector
    )
  );

}

/* ==========================================
   CREATE ELEMENT
========================================== */

export function createElement(
  tag,
  className = "",
  html = ""
) {

  const element =
    document.createElement(
      tag
    );

  if (className) {

    element.className =
      className;

  }

  if (html) {

    element.innerHTML =
      html;

  }

  return element;

}

/* ==========================================
   SET HTML
========================================== */

export function setHTML(
  selector,
  html
) {

  const element =
    typeof selector ===
    "string"
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.innerHTML =
    html;

}

/* ==========================================
   APPEND
========================================== */

export function append(
  parent,
  child
) {

  if (
    !parent ||
    !child
  ) {

    return;

  }

  parent.appendChild(
    child
  );

}

/* ==========================================
   CLEAR ELEMENT
========================================== */

export function clearElement(
  selector
) {

  const element =
    typeof selector ===
    "string"
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.innerHTML = "";

}

/* ==========================================
   SHOW
========================================== */

export function show(
  selector
) {

  const element =
    typeof selector ===
    "string"
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.style.display =
    "";

}

/* ==========================================
   HIDE
========================================== */

export function hide(
  selector
) {

  const element =
    typeof selector ===
    "string"
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.style.display =
    "none";

}

/* ==========================================
   ADD CLASS
========================================== */

export function addClass(
  selector,
  className
) {

  const element =
    typeof selector ===
    "string"
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.classList.add(
    className
  );

}

/* ==========================================
   REMOVE CLASS
========================================== */

export function removeClass(
  selector,
  className
) {

  const element =
    typeof selector ===
    "string"
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.classList.remove(
    className
  );

}

/* ==========================================
   TOGGLE CLASS
========================================== */

export function toggleClass(
  selector,
  className
) {

  const element =
    typeof selector ===
    "string"
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.classList.toggle(
    className
  );

}

/* ==========================================
   EVENT
========================================== */

export function on(
  selector,
  event,
  handler
) {

  const element =
    typeof selector ===
    "string"
      ? $(selector)
      : selector;

  if (!element) {
    return;
  }

  element.addEventListener(
    event,
    handler
  );

}

/* ==========================================
   DATASET
========================================== */

export function setData(
  element,
  key,
  value
) {

  if (!element) {
    return;
  }

  element.dataset[key] =
    value;

}

export function getData(
  element,
  key
) {

  if (!element) {
    return null;
  }

  return element.dataset[key];

}

/* ==========================================
   LOADING STATE
========================================== */

export function setLoading(
  element,
  isLoading = true
) {

  if (!element) {
    return;
  }

  if (isLoading) {

    element.setAttribute(
      "data-loading",
      "true"
    );

  } else {

    element.removeAttribute(
      "data-loading"
    );

  }

}

/* ==========================================
   SCROLL TOP
========================================== */

export function scrollTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}
