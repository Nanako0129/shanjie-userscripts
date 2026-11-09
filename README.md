# 善解使用者腳本

讓網頁和輸入法好好相處的使用者腳本（Tampermonkey、Violentmonkey 等）。寫給[善解輸入法](https://shanjie.nyanako.com/)用，腳本本身不依賴善解：只要輸入法在組字，就會生效。

| 腳本 | 網站 | 做什麼 |
|---|---|---|
| [`threads/shanjie-threads-tab.user.js`](threads/shanjie-threads-tab.user.js) | Threads | 組字中按的 Tab 留給輸入法，不讓頁面拿去移焦點 |

## Threads：組字中的 Tab

**現象**：在 Chrome 等 Chromium 瀏覽器開 Threads 的發文框，用輸入法打字、還在組字時按 Tab（例如善解用 Tab 進入預測列），焦點會跳到發文框下面的按鈕，組字被直接送出。Safari 沒有這個問題。

**原因**：Chromium 在組字時，仍會把輸入法用掉的按鍵交給網頁，事件的 `key` 是 `Tab`、`keyCode` 是 229、`isComposing` 是 true。頁面把它當成一般的 Tab 移走焦點，焦點一離開，瀏覽器就把組字定稿。

**腳本做的事**：在頁面的程式之前攔下「組字中的 Tab」（`keydown`、`keyup`），不交給頁面；不阻止瀏覽器的預設動作。沒有組字時的 Tab 照常交給頁面，用鍵盤在按鈕之間移動不受影響。

**測過的環境**：Chrome 157、macOS 26，用一個模仿對話框焦點陷阱的測試頁：沒有腳本時焦點跳走、組字送出；有腳本時焦點留在欄位、輸入法照常處理 Tab；沒有組字時的 Tab 照常移焦點。

## 安裝

1. 在瀏覽器裝好 [Tampermonkey](https://www.tampermonkey.net/) 或其他使用者腳本管理器。
2. 打開腳本的 raw 網址，管理器會跳出安裝畫面：
   - https://raw.githubusercontent.com/Nanako0129/shanjie-userscripts/main/threads/shanjie-threads-tab.user.js

## 回報問題

到 [Issues](https://github.com/Nanako0129/shanjie-userscripts/issues) 寫下瀏覽器與版本、網站、輸入法，以及按了什麼鍵、看到什麼。

## 授權

[MIT](LICENSE)。

---

## English

Userscripts that keep web pages from fighting the input method. Written for the [Shanjie Zhuyin IME](https://shanjie.nyanako.com/), but they work with any input method that is composing.

- **Threads, Tab while composing** (`threads/shanjie-threads-tab.user.js`): in Chromium browsers, a Tab pressed during a composition still reaches the page as `keydown` with `key` "Tab", `keyCode` 229 and `isComposing` true. Threads moves the focus on it, and the browser commits the composition. The script stops that event before the page's handlers see it, and only while composing; Tab outside a composition is untouched. Tested in Chrome 157 on macOS 26 with a page that traps focus the same way.

Install a userscript manager such as Tampermonkey, then open the raw URL above. Licensed under MIT.
