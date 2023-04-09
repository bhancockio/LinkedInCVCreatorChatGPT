/*global chrome*/

export const saveData = (key, data) => {
  if (isChromeExtension()) {
    try {
      chrome.storage.local.set({ [key]: data });
    } catch (e) {
      console.error("Error saving to local state");
      console.error(e);
    }
  } else {
    return Promise.resolve(localStorage.setItem(key, JSON.stringify(data)));
  }
};

export const loadData = (key) => {
  if (isChromeExtension()) {
    try {
      return chrome.storage.local.get(key).then((data) => data[key]);
    } catch (e) {
      console.error("Error saving to local state");
      console.error(e);
    }
  } else {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
  }
};

const isChromeExtension = () => {
  return !!chrome?.storage;
};
