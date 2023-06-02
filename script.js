const addItem = document.querySelector('.btn');
const form = document.querySelector('#item-form');
const itemlist = document.querySelector('#item-list');
const filter = document.querySelector('.filter');
const filterInput = document.querySelector('.filter input[type="text"]');
const container = document.querySelector('.container');

function addFilterData() {
  filter.innerHTML = `
    <input
    type="text"
    class="form-input-filter"
    id="filter"
    placeholder="Filter Items"
  />`;

  const newclear = document.createElement('button');
  newclear.className = 'btn-clear';
  newclear.id = 'clear';
  const clearText = document.createTextNode('Clear All');
  newclear.appendChild(clearText);
  container.appendChild(newclear);
}
function removeFilterData() {
  filter.innerHTML = '';
  const clearall = document.querySelector('#clear');
  clearall.remove();
}

function createNewItem(ulList, newValue) {
  const newItem = document.createElement('li');
  const newItemText = document.createTextNode(newValue);
  const newButton = document.createElement('button');
  newButton.className = 'remove-item btn-link text-red';
  const newIcon = document.createElement('i');
  newIcon.className = 'fa-solid fa-xmark';
  newItem.appendChild(newItemText);
  newButton.appendChild(newIcon);
  newItem.appendChild(newButton);
  ulList.appendChild(newItem);
}

function addItemToShopping(e) {
  e.preventDefault();
  console.log('hello');
  const item = document.querySelector('#item-input');
  const inputValue = item.value.toString();

  if (!inputValue.trim()) {
    return;
  }

  if (!itemlist.children.length) {
    //first node
    addFilterData();
  }

  // append new node
  createNewItem(itemlist, inputValue);
  item.value = '';
}

function removeItems(e) {
  switch (e.target.tagName) {
    case 'BUTTON':
      e.target.parentElement.remove();
      break;
    case 'I':
      e.target.parentElement.parentElement.remove();
      break;
  }

  if (!itemlist.children.length) {
    removeFilterData();
  }
}

function filterItems(e) {
  let filterValue = filterInput.value;
  filterValue = filterValue.toString().toUpperCase();

  const listChildren = Array.from(itemlist.children);

  listChildren.forEach((element) => {
    if (!element.textContent.trim().toUpperCase().includes(filterValue)) {
      element.remove();
    }
  });
}

form.addEventListener('submit', addItemToShopping);
itemlist.addEventListener('click', removeItems);
filter.addEventListener('input', filterItems);
