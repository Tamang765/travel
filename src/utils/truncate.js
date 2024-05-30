export const truncate = function (str, len = 20) {
  return str?.length > len ? `${str?.substring(0, len)}...` : str;
};
