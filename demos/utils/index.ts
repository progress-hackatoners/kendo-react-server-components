export const serialize = (state?: Object) => {
  return JSON.stringify(state);
};

export const deserialize = (state?: string) => {
  if (state) {
    return JSON.parse(decodeURI(state));
  } else {
    return {};
  }
};
