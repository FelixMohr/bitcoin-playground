// for testing that a path applies to SegWit "bc1" addresses with P2WPKH
const pathRegex = /^m\/84'\/0'\/\d+'\/\d+(\/\d+){0,2}$/;

export const pathValid = (path: string) => {
  return pathRegex.test(path);
};
