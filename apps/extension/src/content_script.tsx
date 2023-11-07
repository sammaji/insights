import { TimerEvents } from "@/lib/timer-events";

const site = window.location.origin;

chrome.runtime.sendMessage({ action: TimerEvents.Start, site });

document.addEventListener("visibilitychange", () => {
  console.log("change");

  if (document.visibilityState === "visible") {
    chrome.runtime.sendMessage({ action: TimerEvents.Resume, site });
  }

  if (document.visibilityState === "hidden") {
    chrome.runtime.sendMessage({ action: TimerEvents.Pause, site });
  }
});

window.addEventListener("beforeunload", function () {
  chrome.runtime.sendMessage({ action: TimerEvents.Stop, site });
});

export {};
