(function () {
  if (window.__mute_ui) return;
  // --- UI Elements ---
  function createMutePopup() {
    // Basic container
    const popup = document.createElement("div");
    popup.id = "mute-ui";
    popup.innerHTML = `
    <div class="mute-main">
    <div class="mute-header">
      <span class="mute-icon" aria-label="Mute Ad Blocker Logo"></span>
      <span class="mute-title">Mute Ad Blocker</span>
      <button class="mute-close" aria-label="Close">&times;</button>
    </div>
      <div class="mute-status">
        <span class="mute-dot"></span>
        <span class="mute-status-text">Checking status…</span>
      </div>
      <div class="mute-actions">
        <label class="mute-switch">
          <input type="checkbox" class="mute-toggle" />
          <span class="mute-slider"></span>
        </label>
        <span class="mute-toggle-label">Active</span>
      </div>
      <div class="mute-footer">
        <span style="opacity:.7;font-size:0.85em">Powered by <span style="color:#ea5651;font-weight:bold;">Mute Ad Blocker</span>
        </span>
      </div>
    </div>
    `;
    popup.setAttribute("aria-live", "polite");
      const iconSpan = popup.querySelector('.mute-icon');
  const img = document.createElement('img');
  img.src = chrome.runtime.getURL('icons/icon128.png');
  img.alt = "Mute Ad Blocker Logo";
  img.style.width = "26px";
  img.style.height = "26px";
  img.style.display = "block";
  img.style.borderRadius="50%";
  iconSpan.appendChild(img);

    // --- CSS (inject into shadow or global) ---
    const style = document.createElement("style");
    style.textContent = `
    #mute-ui {
      all: initial;
      position: fixed;
      top: 32px; right: 32px;
      z-index: 1002105;
      font-family: 'Segoe UI', Arial, sans-serif;
      user-select: none;
      width: 315px;
      box-shadow: 0 6px 32px 0 rgba(0,0,0,.23);
      border-radius: 14px;
      background: linear-gradient(123deg,#181d22 90%,#262932 100%);
      color: #fff;
      animation: mute-fade-in .35s cubic-bezier(.4,2,.4,1.3);
    }
    @keyframes mute-fade-in {
      from { transform: translateY(-40px) scale(.95); opacity: 0;}
      to   { transform: none; opacity: 1;}
    }
    .mute-main { padding: 18px 20px 16px 20px; }
    .mute-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .mute-icon { margin-right: 7px; display: inline-block;}
    .mute-title {
      flex: 1 1 auto;
      font-size: 1.11rem;
      font-weight: 600;
      letter-spacing:.02em;
      line-height: 1.2;
      margin-left: 5px;
    }
    .mute-close {
      all: unset;
      font-size: 2.2rem;
      color: #888;
      background: none;
      cursor: pointer;
      width: 30px; height: 30px; line-height: 28px;
      text-align: center;
      border-radius: 50%;
      transition: background .2s;
    }
    .mute-close:hover {
      background: #232832;
      color: #ea5651;
    }

    .mute-status {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      font-size: 0.97em;
      line-height: 1.5;
      min-height: 25px;
      transition: color .2s;
    }

    .mute-dot {
      width:14px; height:14px;
      border-radius: 50%;
      background: linear-gradient(120deg,#ea5651,#ff9844 94%);
      box-shadow: 0 1.5px 6px 0 #ff984450;
      display: inline-block;
      transition: background 0.2s, box-shadow .2s;
    }
    .mute-dot.off {
      background: linear-gradient(120deg,#bcc2cc,#505964 90%);
      box-shadow: 0 0.5px 0 #2221;
    }

    .mute-actions {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 20px;
      margin-bottom: 22px;
      margin-top: 2px;
    }
    /* Toggle Switch */
    .mute-switch {
      position: relative;
      display: inline-block;
      width: 54px;
      height: 30px;
    }
    .mute-switch input {
      opacity: 0; width:0; height:0;
      position:absolute; left:0; top:0;
    }
    .mute-slider {
      position: absolute;
      cursor: pointer;
      top: 2px; left: 2px; right: 2px; bottom: 2px;
      background: #313a47;
      transition: background 0.3s;
      border-radius: 30px;
      box-shadow: 0 3px 10px #2223;
    }
    .mute-switch input:checked + .mute-slider {
      background: linear-gradient(85deg,#ea5651 60%,#ff9844 125%);
    }
    .mute-slider:before {
      position: absolute;
      content: "";
      height: 24px; width: 24px;
      left: 4px; top: 2.5px;
      background: #19202b;
      border-radius: 50%;
      box-shadow: 0 1.5px 7px #ff984440;
      transition: transform .24s cubic-bezier(.5,.4,.5,1.2),
                  background .2s;
    }
    .mute-switch input:checked + .mute-slider:before {
      background: #fff;
      box-shadow: 0 1.5px 7px #ea5651;
      transform: translateX(21px);
    }
    .mute-toggle-label {
      color: #838ead;
      font-size: 1.09em;
      letter-spacing: .03em;
    }
    .mute-toggle-on .mute-toggle-label {
      color: #ea5651;
      font-weight: bold;
      text-shadow: 0 1.5px 3px #ff984455;
    }

    .mute-footer {
      text-align: right;
      border-top: 1px solid #232535;
      padding-top: 10px;
      margin-top: 7px;
      font-size: .95em;
      color: #aaa;
      opacity: .88;
    }
    @media (max-width: 600px) {
      #mute-ui {
        top:7vw; right:5vw; min-width: 170px; max-width:90vw;
        font-size:.9rem;
      }
      .mute-main { padding: 11px 8px 10px 12px;}
    }
    `;
    document.head.appendChild(style);

    // --- DOM element shortcuts ---
    const closeBtn = popup.querySelector(".mute-close");
    const statusDot = popup.querySelector(".mute-dot");
    const statusText = popup.querySelector(".mute-status-text");
    const toggle = popup.querySelector(".mute-toggle");
    const actionRow = popup.querySelector(".mute-actions");
    const toggleLabel = popup.querySelector(".mute-toggle-label");

    // --- UI Logic & effect ---
    function updateUI(enabled) {
      statusText.textContent = enabled
        ? "Mute is ACTIVE on this page"
        : "Mute is DISABLED on this page";
      statusDot.classList.toggle("off", !enabled);
      actionRow.classList.toggle("mute-toggle-on", enabled);
      toggle.checked = enabled;
      toggleLabel.textContent = enabled ? "Active" : "Inactive";
    }

    // --- Event handling ---
    closeBtn.onclick = () => {
      popup.remove();
      window.__mute_ui = false;
    };

    toggle.onchange = function () {
      chrome.storage.sync.set({ adblockerEnabled: toggle.checked }, () => {
        updateUI(toggle.checked);
      });
    };

    // Initial load
    chrome.storage.sync.get({ adblockerEnabled: true }, (result) => {
      updateUI(result.adblockerEnabled);
    });

    // Keyboard ESC support
    popup.tabIndex = 0;
    popup.onkeydown = function (ev) {
      if (ev.key === "Escape") closeBtn.click();
    };

    return popup;
  }

  // --- App ready ---
  function main() {
    if (window.__mute_ui) return;
    const popup = createMutePopup();
    document.body.appendChild(popup);
    window.__mute_ui = true;
    chrome.storage.sync.get({ adblockerEnabled: true }, (result) => {});
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", main);
  else main();
})();
