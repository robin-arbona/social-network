/**
 * Get cookie data
 * @param {string} cname - Cookie name
 * @returns {string} - Return cookie content or empty string
 */
function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


/**
 * Remove all child nodes
 * @param {element} parent  - Element node
 */
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

/**
 * Fetch content and return string
 * @param {string} url - Url where fetch content
 * @returns {string} - Content format Text
 */
const loadContent = (url) => {
  return fetch(url).then(reponse => reponse.text());
}


/**
 * Fetch content and return JSON
 * @param {string} url - Url where fetch content
 * @returns {string} - Content format Json
 */
const loadJson = (url) => {
  return fetch(url).then(response => response.json());
}

/**
 * Post form at specific URL
 * @param {element} formElement - Form element to post
 * @param {string} url - URL which handle post
 * @returns {json} - Return response as JSON
 */
const postContent = async (formElement,url) => {
  let form = new FormData(formElement);
  let method = formElement.getAttribute('method')
  let json = await fetch(url, {
    method: method,
    body: form
  }).then(response => response.json())
  return json
}

/**
 * Create a document fragment with html code provided (wrapped in a div)
 * @param {string} html 
 * @returns {fragment}
 */
const createFragment = (html) => {
  const fragment = new DocumentFragment()
  const div = document.createElement('div')
  div.innerHTML = html;
  fragment.appendChild(div);
  return fragment
}


export {
  getCookie,
  removeAllChildNodes,
  loadContent,
  loadJson,
  postContent,
  createFragment
}

