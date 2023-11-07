import { TimerEvents } from "@/lib/timer-events";

type SiteData = {
  [key: string]: {
    time: number;
    frequency: number;
    elapsed: number;
    formattedElapsed?: string;
  };
};

let site_data: SiteData = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["site_data"], (data) => {
    if (!data.site_data) {
      chrome.storage.local.set({ site_data: {} });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!site_data) {
    site_data = {};
  }
  if (!site_data[request.site]) {
    site_data[request.site] = {
      time: Date.now(),
      frequency: 0,
      elapsed: 0,
    };
  }

  // TODO: improve readability
  // if (request.action === TimerEvents.Start) {
  //   site_data[request.site].frequency++;
  //   sendResponse({ status: "started" });
  // } else if (request.action === TimerEvents.Resume) {
  //   site_data[request.site].time = Date.now();
  //   sendResponse({ status: "visible" });
  // } else if (request.action === TimerEvents.Pause) {
  //   const timeDiff = (Date.now() - site_data[request.site].time) / 1000;
  //   site_data[request.site].elapsed += Math.floor(timeDiff);
  //   sendResponse({ status: "hidden" });
  // } else if (request.action === TimerEvents.Stop) {
  //   const timeDiff = (Date.now() - site_data[request.site].time) / 1000;
  //   site_data[request.site].elapsed += Math.floor(timeDiff);
  //   sendResponse({ status: "stopped" });
  // } else if (request.action === TimerEvents.UpdateStorage) {
  //   site_data[request.site].elapsed = Date.now() - site_data[request.site].time;
  //   chrome.storage.local.set({ site_data });
  //   sendResponse({ status: "success" });
  // }

  let interval: NodeJS.Timeout | undefined = undefined;

  switch (request.action) {
    case TimerEvents.Start:
      site_data[request.site].frequency++;
      sendResponse({ status: "started" });
      break;

    case TimerEvents.Resume:
      site_data[request.site].time = Date.now();
      sendResponse({ status: "visible" });

      interval = setInterval(() => {
        var timeDiff = (Date.now() - site_data[request.site].time) / 1000;
        site_data[request.site].elapsed += Math.floor(timeDiff);
        site_data[request.site].time = Date.now();
      }, 5000);

      break;

    case TimerEvents.Pause:
      var timeDiff = (Date.now() - site_data[request.site].time) / 1000;
      site_data[request.site].elapsed += Math.floor(timeDiff);

      clearInterval(interval);
      sendResponse({ status: "hidden" });
      break;

    case TimerEvents.Stop:
      var timeDiff = (Date.now() - site_data[request.site].time) / 1000;
      site_data[request.site].elapsed += Math.floor(timeDiff);
      sendResponse({ status: "stopped" });
      break;

    case TimerEvents.UpdateStorage:
      site_data[request.site].elapsed =
        Date.now() - site_data[request.site].time;
      chrome.storage.local.set({ site_data });
      sendResponse({ status: "success" });
      break;
  }
});

export {};
