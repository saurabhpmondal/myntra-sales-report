/* ==========================================
   LOADER COMPONENT
   Myntra Sales Intelligence
========================================== */

import {
  appendHTML,
  qs
} from "../core/dom.js";

/* ==========================================
   CONSTANTS
========================================== */

const LOADER_ID =
  "global-loader";

/* ==========================================
   SHOW LOADER
========================================== */

export function showFullScreenLoader(
  message = "Loading..."
) {

  let loader =
    document.getElementById(
      LOADER_ID
    );

  if (!loader) {

    appendHTML(
      document.body,
      buildLoaderHTML(
        message
      )
    );

    return;

  }

  loader.style.display =
    "flex";

  updateLoaderMessage(
    message
  );

}

/* ==========================================
   HIDE LOADER
========================================== */

export function hideFullScreenLoader() {

  const loader =
    document.getElementById(
      LOADER_ID
    );

  if (!loader) {

    return;

  }

  loader.style.display =
    "none";

}

/* ==========================================
   UPDATE MESSAGE
========================================== */

export function updateLoaderMessage(
  message
) {

  const element =
    document.getElementById(
      "loader-message"
    );

  if (!element) {

    return;

  }

  element.textContent =
    message;

}

/* ==========================================
   BUILD HTML
========================================== */

function buildLoaderHTML(
  message
) {

  return `

    <div
      id="${LOADER_ID}"
      class="fullscreen-loader"
    >

      <div class="loader-content">

        <div class="loader-spinner"></div>

        <div
          id="loader-message"
          class="loader-message"
        >

          ${message}

        </div>

      </div>

    </div>

  `;

}