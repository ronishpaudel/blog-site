export const jsonParse = (str: string): any => {
  try {
    const strObj = JSON.parse(str);
    return strObj;
  } catch (e) {
    return null;
  }
};
