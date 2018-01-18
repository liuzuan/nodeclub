let storage = window.localStorage;

export const setItem = (key,value) => storage.setItem(key, JSON.stringify(value));

export const getItem = (key) => {
  if (storage.key) {
    return JSON.parse(storage.getItem(key))
  }
};

export const removeItem = (key) => storage.removeItem(key)

