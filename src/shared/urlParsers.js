// Looking for string parameter on the URL
// URL must be formatted with a '?' before the parameters and '&' separating parameters
// parameters must be of the form <string>=<value>
// currently only returns parsed numeric values
export const findUrlParameter = (url, str) => {
  let offset = 0;
  // work only on strings
  if (typeof url === 'string' && url.length) {
    const questionPos = url.lastIndexOf('?');
    if (questionPos !== -1) {
      // only work on the right hand side of '?'
      const params = url.substr(questionPos + 1).split('&');
      params.forEach(param => {
        if (param.search(str) === 0) {
          const splits = param.split('=');
          if (splits.length === 2) {
            const offsetFound = parseInt(splits[1], 10);
            if (!isNaN(offsetFound)) {
              offset = offsetFound;
            }
          }
        }
      });
    }
  }
  return offset;
};
