'use strict';

const form = document.getElementById('root-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  [...e.target.elements]
    .filter((elem) => elem.value.trim())
    .map((elem) => {
      document
        .getElementById(elem.dataset.listSelector)
        .append(
          createElement(
            'li',
            {},
            document.createTextNode(elem.value)
          )
        );
    });
  e.target.reset();
});

document
  .getElementById('pairContainer')
  .append(...new Array(3).fill('').map(() => createPair()));

function createPair() {
  const random =
    Date.now().toString(36) +
    Math.random().toString(36).substr(2);
  const listId = `lst${random}`;
  return createElement(
    'div',
    { classNames: ['pair'] },
    createElement('input', {
      attributes: new Map()
        .set('type', 'text')
        .set('data-list-selector', listId),
    }),
    createElement('ul', {
      attributes: new Map().set('id', listId)
      .set(
        'style',
        `background-color:${stringToColour(listId)}`
      ),
    })
  );
}

function createElement(
  type,
  { classNames, attributes } = {},
  ...children
) {
  const elem = document.createElement(type);
  if (classNames) elem.classList.add(...classNames);
  if (attributes)
    for (const attr of attributes) {
      elem.setAttribute(attr[0], attr[1]);
    }
  elem.append(...children);
  return elem;
}

function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}
