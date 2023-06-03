const addItem = document.querySelector('.btn');
const form = document.querySelector('#item-form');
const itemlist = document.querySelector('#item-list');
let filter = document.querySelector('.filter');
const container = document.querySelector('.container');
let clearall = document.querySelector('#clear');
const filterInput = document.querySelector('.filter input[type="text"]');
const formbtn = form.querySelector('button');
let isEditMode = false;
let oldValue;
function addFilterData() {
  // filter.innerHTML = `
  //   <input
  //   type="text"
  //   class="form-input-filter"
  //   id="filter"
  //   placeholder="Filter Items"
  // />`;
  filter.style.display = 'block';
  clearall.style.display = 'block';

  // const newclear = document.createElement('button');
  // newclear.className = 'btn-clear';
  // newclear.id = 'clear';
  // const clearText = document.createTextNode('Clear All');
  // newclear.appendChild(clearText);
  // container.appendChild(newclear);
  // clearall = document.querySelector('#clear');
  // clearall.addEventListener('click', clearAllItems);
  // filter.addEventListener('input', filterItems);
}
function removeFilterData() {
  filter.style.display = 'none';
  clearall.style.display = 'none';
  filterInput.value = '';

  // filter.removeEventListener('input', filterItems);
  // clearall.removeEventListener('click', clearAllItems);
  // clearall.remove();
}

function createNewItem(newValue) {
  if (!itemlist.children.length) {
    //first node
    addFilterData();
  }

  const newItem = document.createElement('li');
  const newItemText = document.createTextNode(newValue);
  const newButton = document.createElement('button');
  newButton.className = 'remove-item btn-link text-red';
  const newIcon = document.createElement('i');
  newIcon.className = 'fa-solid fa-xmark';
  newItem.appendChild(newItemText);
  newButton.appendChild(newIcon);
  newItem.appendChild(newButton);
  itemlist.appendChild(newItem);
}

function addItemToShopping(e) {
  e.preventDefault();

  const item = document.querySelector('#item-input');
  const inputValue = item.value.toString();

  inputValue.toString;

  if (!inputValue.trim()) {
    return;
  }

  if (isEditMode) {
    const itemtoEdit = itemlist.querySelector('.edit-mode');

    itemtoEdit.innerHTML =
      inputValue + itemtoEdit.innerHTML.substring(oldValue.length);
    itemtoEdit.innerHTML = itemtoEdit.innerHTML.replace(oldValue, inputValue);
    itemtoEdit.classList.remove('edit-mode');
    isEditMode = false;
    UpdateStorage();
    formbtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formbtn.style.backgroundColor = '#333';
  } else {
    if (!checkExisting(inputValue)) {
      // append new node
      createNewItem(inputValue);

      //add item to local storage
      addItemtoStorage(inputValue);
    }
  }
  item.value = '';
}

function checkExisting(item) {
  let itemsfromstorage;

  if (localStorage.getItem('items') === null) {
    itemsfromstorage = [];
  } else {
    itemsfromstorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsfromstorage.includes(item);
}

function addItemtoStorage(item) {
  let itemsfromstorage;

  if (localStorage.getItem('items') === null) {
    itemsfromstorage = [];
  } else {
    itemsfromstorage = JSON.parse(localStorage.getItem('items'));
  }
  itemsfromstorage.push(item);

  localStorage.setItem('items', JSON.stringify(itemsfromstorage));
}

function getItemfromStorage() {
  let itemsfromstorage;

  if (localStorage.getItem('items') === null) {
    itemsfromstorage = [];
  } else {
    itemsfromstorage = JSON.parse(localStorage.getItem('items'));
  }
  itemsfromstorage.forEach((item) => createNewItem(item));
}

function removeallItemfromStorage() {
  localStorage.clear();
  //localStorage.removeItem('items')
}

function UpdateStorage() {
  let itemsfromstorage = [];
  const listChildren = Array.from(itemlist.children);

  listChildren.forEach((element) =>
    itemsfromstorage.push(element.textContent.trim())
  );
  localStorage.setItem('items', JSON.stringify(itemsfromstorage));
}

function setItemtoEdit(item) {
  isEditMode = true;
  itemlist
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  formbtn.innerHTML = '<i class = "fa-solid fa-pen"></i>  Update Item';
  formbtn.style.backgroundColor = '#228B22';
  const itemInput = document.querySelector('#item-input');
  itemInput.value = item.textContent;
  oldValue = itemInput.value;
}

function removeItems(e) {
  switch (e.target.tagName) {
    case 'BUTTON':
      e.target.parentElement.remove();
      UpdateStorage();
      break;
    case 'I':
      e.target.parentElement.parentElement.remove();
      UpdateStorage();
      break;
    case 'LI':
      setItemtoEdit(e.target);
  }

  checkui();
}

function filterItems(e) {
  let filterValue = e.target.value;
  filterValue = filterValue.toString().toUpperCase();

  const listChildren = Array.from(itemlist.children);

  listChildren.forEach((element) => {
    if (!element.textContent.trim().toUpperCase().includes(filterValue)) {
      element.style.display = 'none';
    } else {
      element.style.display = 'flex';
    }
  });
}

function clearAllItems(e) {
  while (itemlist.firstChild) {
    itemlist.removeChild(itemlist.firstChild);
  }

  checkui();
}

function checkui() {
  if (!itemlist.children.length) {
    removeFilterData();
    removeallItemfromStorage();
  }
}

form.addEventListener('submit', addItemToShopping);
itemlist.addEventListener('click', removeItems);
filter.addEventListener('input', filterItems);
clearall.addEventListener('click', clearAllItems);

getItemfromStorage();
checkui();
