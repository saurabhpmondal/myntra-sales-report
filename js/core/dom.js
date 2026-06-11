/* ==========================================
   DOM HELPERS
   Myntra Sales Intelligence
========================================== */

/* ==========================================
   QUERY SELECTOR
========================================== */

export function qs(
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

export function qsa(
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
   SET HTML
========================================== */

export function setHTML(
  selector,
  html
) {

  const element =
    typeof selector ===
    "string"
      ? qs(selector)
      : selector;

  if (
    !element
  ) {

    return;

  }

  element.innerHTML =
    html;

}

/* ==========================================
   APPEND HTML
========================================== */

export function appendHTML(
  selector,
  html
) {

  const element =
    typeof selector ===
    "string"
      ? qs(selector)
      : selector;

  if (
    !element
  ) {

    return;

  }

  element.insertAdjacentHTML(
    "beforeend",
    html
  );

}

/* ==========================================
   CLEAR
========================================== */

export function clear(
  selector
) {

  const element =
    typeof selector ===
    "string"
      ? qs(selector)
      : selector;

  if (
    !element
  ) {

    return;

  }

  element.innerHTML =
    "";

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
      ? qs(selector)
      : selector;

  if (
    !element
  ) {

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
      ? qs(selector)
      : selector;

  if (
    !element
  ) {

    return;

  }

  element.style.display =
    "none";

}

/* ==========================================
   CREATE ELEMENT
========================================== */

export function createElement(
  tag,
  className = ""
) {

  const element =
    document.createElement(
      tag
    );

  if (
    className
  ) {

    element.className =
      className;

  }

  return element;

}

/* ==========================================
   SET TEXT
========================================== */

export function setText(
  selector,
  text
) {

  const element =
    typeof selector ===
    "string"
      ? qs(selector)
      : selector;

  if (
    !element
  ) {

    return;

  }

  element.textContent =
    text;

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
      ? qs(selector)
      : selector;

  if (
    !element
  ) {

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
      ? qs(selector)
      : selector;

  if (
    !element
  ) {

    return;

  }

  element.classList.remove(
    className
  );

}