/* ==========================================
   LOADER COMPONENT
   Myntra Sales Intelligence
========================================== */

import {
  setHTML
} from "../core/dom.js";

/* ==========================================
   SHOW PAGE LOADER
========================================== */

export function showLoader(
  containerId,
  message = "Loading..."
) {

  const html = `

    <div class="loader-wrapper">

      <div class="loader"></div>

      <div class="loader-text">

        ${message}

      </div>

    </div>

  `;

  setHTML(
    containerId,
    html
  );

}

/* ==========================================
   SHOW FULL SCREEN LOADER
========================================== */

export function showFullScreenLoader(
  message = "Loading Application..."
) {

  const existing =
    document.getElementById(
      "global-loader"
    );

  if (existing) {
    return;
  }

  const loader =
    document.createElement(
      "div"
    );

  loader.id =
    "global-loader";

  loader.innerHTML = `

    <div class="loader-overlay">

      <div class="loader-card">

        <div class="loader"></div>

        <div class="loader-title">

          Myntra Sales Intelligence

        </div>

        <div class="loader-subtitle">

          ${message}

        </div>

      </div>

    </div>

  `;

  document.body.appendChild(
    loader
  );

}

/* ==========================================
   HIDE FULL SCREEN LOADER
========================================== */

export function hideFullScreenLoader() {

  const loader =
    document.getElementById(
      "global-loader"
    );

  if (
    !loader
  ) {

    return;

  }

  loader.remove();

}

/* ==========================================
   UPDATE LOADER MESSAGE
========================================== */

export function updateLoaderMessage(
  message
) {

  const element =
    document.querySelector(
      "#global-loader .loader-subtitle"
    );

  if (
    !element
  ) {

    return;

  }

  element.textContent =
    message;

}

/* ==========================================
   BUILD LOADER HTML
========================================== */

export function buildLoader(
  message = "Loading..."
) {

  return `

    <div class="loader-wrapper">

      <div class="loader"></div>

      <div class="loader-text">

        ${message}

      </div>

    </div>

  `;

}