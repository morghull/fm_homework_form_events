'use strict';

const form = document.getElementById('root-form');
const validatorFullName =
  /^[A-Z][a-z]{2,11} [A-Z][a-z]{1,16}$/;
const validatorFio = /^[А-Я][а-я]{1,16} ([А-Я]\.){2}$/;
const validatorImages = /^[^$]+\.(png|jpeg)$/;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  [...e.target.elements]
    .filter((elem) => {
      const validator = new RegExp(
        elem.dataset.validationExpression
      );
      return (
        elem.value.trim() &&
        validator.test(elem.value.trim())
      );
    })
    .map((elem) => {
      const li = createElement(
        'li',
        {},
        document.createTextNode(elem.value)
      );
      const btn = createElement(
        'button',
        {
          classNames: ['closeBtn'],
          onClick: deleteHandler.bind(li),
        },
        document.createTextNode('X')
      );
      li.append(btn);
      document
        .getElementById(elem.dataset.listSelector)
        .append(li);
    });
  e.target.reset();
});

const inputOptions = [
  createInputOption(
    'enter full name',
    '^[A-Z][a-z]{2,11} [A-Z][a-z]{1,16}$'
  ),
  createInputOption(
    'введите ФИО',
    '^[А-Я][а-я]{1,16} ([А-Я].){2}$'
  ),
  createInputOption(
    'enter image name',
    '^[^$]+.(png|jpeg)$'
  ),
];
document
  .getElementById('pairContainer')
  .append(
    ...inputOptions.map((option) => createPair(option))
  );

function createPair({
  placeholderText,
  validationExpression,
}) {
  const random =
    Date.now().toString(36) +
    Math.random().toString(36).substr(2);
  const listId = `lst${random}`;
  return createElement(
    'div',
    { classNames: ['pair'] },
    createElement('input', {
      attributes: new Map()
        .set('placeholder', placeholderText)
        .set('type', 'text')
        .set('data-list-selector', listId)
        .set(
          'data-validation-expression',
          validationExpression
        ),
    }),
    createElement('ul', {
      attributes: new Map()
        .set('id', listId)
        .set(
          'style',
          `background-color:${stringToColour(listId)}`
        ),
    })
  );
}

function createElement(
  type,
  {
    classNames = [],
    attributes = null,
    onClick = null,
  } = {},
  ...children
) {
  const elem = document.createElement(type);
  if (classNames) elem.classList.add(...classNames);
  if (attributes)
    for (const attr of attributes) {
      elem.setAttribute(attr[0], attr[1]);
    }
  elem.append(...children);
  if (onClick) elem.addEventListener('click', onClick);
  return elem;
}

function deleteHandler(e) {
  this.remove();
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

function createInputOption(
  placeholderText,
  validationExpression
) {
  return { placeholderText, validationExpression };
}
