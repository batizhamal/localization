export const setItem = (json, keys, value) => {
  keys.reduce((self, key) => {
    if (typeof self[key] != "object") {
      self[key] = value;
      return;
    }
    return self[key];
  }, json);
};

export const getItem = (json, keys) => {
  return keys.reduce((self, key) => {
    if (!self) {
      return null;
    }
    return self[key];
  }, json);
};

export const fillDelta = (codes, json, data) => {
  codes.forEach((code) => {
    setItem(json, code, getItem(data, code) ?? "");
  });
};
