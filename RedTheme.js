// ==UserScript==
// @name         Red OLED Theme for JigsawPlanet
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Red accent color and pure black background for Jigsaw Planet
// @match        https://www.jigsawplanet.com/*
// @match        https://jigsawplanet.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const style = document.createElement('style');
  style.textContent = `
    :root {
      --text-color: 238, 238, 238;
      --background-color: 0, 0, 0;
      --control-bg-color: #0a0a0a;
      color-scheme: dark;
    }

    a {
      color: #f00;
    }

    .MainMenu li.ts-hi:before,
    #ts-mainmenu-msgs.ts-hi:before {
      content:"";
      position:absolute;
      left:0;
      top:0;
      right:2px;
      bottom:0;
      border-bottom:3px solid #f00
    }

    #topBar .bckgrnd {
      position:absolute;
      left:0;
      top:0;
      right:0;
      z-index:-1;
      box-shadow:0px 1px 2px rgba(0,0,0,.3);
      background-image:linear-gradient(to bottom, #121212, #000000)
    }

    *:not(#ts-pg-footer) ul.menuBar.simple:not(.ts-links) .ts-mnitm {
      border:1px solid rgba(255,255,255,.15);
      padding:.2em .4em;
      border-radius:var(--border-radius);
      background-color:#0a0a0a;
    }

    .UserMenu.newUser .signup .ts-mnitm,
    .UserMenu.ourUser .signin .ts-mnitm {
      background-color:#f00 !important;
      font-weight:bold;
      color:#fff;
      text-shadow:1px 1px 1px rgba(0,0,0,.2)
    }

    .UserMenu.newUser .signup .ts-mnitm:hover,
    .UserMenu.ourUser .signin .ts-mnitm:hover {
      background-color:#de0000 !important
    }

    ul.popupMenu,
    .ac-renderer {
      border:1px solid rgba(255,255,255,.075);
      background-color:#040404;
    }
  `;

  const LOGO_URL = 'https://i.imgur.com/UkCYl3K.png';

  function swapLogo() {
    document.querySelectorAll('a.ts-jp-logo img').forEach(img => {
      if (img.src !== LOGO_URL) {
        img.src = LOGO_URL;
        img.removeAttribute('srcset'); // in case the site sets one
      }
    });
  }

  // The script runs before the page is parsed, so watch for the logo to appear
  new MutationObserver(swapLogo).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  document.addEventListener('DOMContentLoaded', swapLogo);

  // Inject early to avoid a flash of blue
  document.documentElement.appendChild(style);

  // Once the page's stylesheets have loaded, move ours to the end of <head>
  // so it comes after them in the cascade
  function moveToEnd() {
    (document.head || document.documentElement).appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', moveToEnd);
  window.addEventListener('load', moveToEnd);
})();
