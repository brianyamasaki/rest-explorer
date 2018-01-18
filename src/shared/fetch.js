const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText || response.status));
};

const getJson = response => response.json();

export const fetchStatus = (url, options) =>
  // const strOptions = options ? JSON.stringify(options) : 'no options';
  // console.log(`Api request to ${url} with ${strOptions}`);
  fetch(url, options) // eslint-disable-line no-undef
    .then(checkStatus)
    .catch(error => Promise.reject(error))
    .then(response => response.status)
    .catch(error => Promise.reject(error));

export const fetchJson = (url, options) =>
  // const strOptions = options ? JSON.stringify(options) : 'no options';
  // console.log(`Api request to ${url} with ${strOptions}`);
  fetch(url, options) // eslint-disable-line no-undef
    .then(checkStatus)
    .catch(error => Promise.reject(error))
    .then(getJson)
    .catch(error => Promise.reject(error));
