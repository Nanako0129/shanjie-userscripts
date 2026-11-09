// ==UserScript==
// @name         善解：Threads 組字中的 Tab 留給輸入法
// @name:en      Shanjie: keep Tab with the input method while composing on Threads
// @namespace    https://shanjie.nyanako.com/
// @version      0.1.0
// @description  在 Chrome 等 Chromium 瀏覽器的 Threads 發文框，用輸入法組字時按 Tab，頁面會把焦點移到下一個按鈕、組字被送出。這個腳本只在組字中把 Tab 留給輸入法，不交給頁面；沒有組字時的 Tab 照常。
// @description:en On Threads in Chromium browsers, pressing Tab while an input method is composing moves the focus to the next button and commits the composition. This script keeps that Tab from the page while a composition is open; Tab outside a composition works as usual.
// @author       Nanako Tsai
// @license      MIT
// @homepageURL  https://github.com/Nanako0129/shanjie-userscripts
// @supportURL   https://github.com/Nanako0129/shanjie-userscripts/issues
// @match        https://www.threads.com/*
// @match        https://threads.com/*
// @match        https://www.threads.net/*
// @match        https://threads.net/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';
  // Capture on window, registered at document-start: it runs before every listener of the page (React's root listeners included).
  // Only a Tab that arrives during a composition: Chromium hands the key the input method used to the page as keyCode 229 with
  // `key` "Tab", and `isComposing` is true while marked text is open. Nothing is prevented: the input method already used the key,
  // so the browser has no default action left for it; only the page's own handler is kept from seeing it.
  const composingTab = (e) => e.key === 'Tab' && (e.isComposing || e.keyCode === 229);
  for (const type of ['keydown', 'keyup']) {
    window.addEventListener(type, (e) => { if (composingTab(e)) e.stopImmediatePropagation(); }, true);
  }
})();
