
const defaultStorage = window.localStorage;

export const setItemToStorage = (key, value, storage = defaultStorage) => {
  return storage.setItem(key, value);
};

export const getItemFromStorage = (key, storage = defaultStorage) => storage.getItem(key);

export const getDefaultStorage = () => defaultStorage;


export const clearDefaultStorage = () => defaultStorage.clear();

export const removeItemFromStorage = (key, storage = defaultStorage) => storage.removeItem(key);
