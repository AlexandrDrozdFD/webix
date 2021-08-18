const input = document.querySelector('.input');
const tagsArea = document.querySelector('.tags-area');
const addBtn = document.querySelector('.input-btn');
const checkbox = document.querySelector('.checkbox');

let db = [];

function setLocalstorage(db) {
  localStorage.setItem('db', JSON.stringify(db));
}

function createTag(text) {
  const divTag = document.createElement('div');
  divTag.setAttribute('class', 'tag');

  const spanTagText = document.createElement('span');
  spanTagText.setAttribute('class', 'tag-text');
  spanTagText.innerHTML = text;

  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('class', 'close-btn');
  closeBtn.setAttribute('data-item', text)
  closeBtn.innerHTML = '×';

  divTag.append(spanTagText, closeBtn);

  return divTag;

}

window.addEventListener('DOMContentLoaded', () => {
  alert('Readonly mode');
  if (localStorage.getItem('db')) {
    db = JSON.parse(localStorage.getItem('db'));
    addTag();
  }
});

function addTag() {
  tagsArea.innerHTML = '';
  db.map(text => {
    const tag = createTag(text);
    tagsArea.append(tag);
  });
}

addBtn.addEventListener('click', () => {
  if (input.value) {
    db.push(input.value);
    addTag();
    input.value = '';
    setLocalstorage(db);
  }

});

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    addBtn.disabled = false;
    alert('Readonly mode switch off');
  } else {
    addBtn.disabled = true;
    alert('Readonly mode only');
  }
});

document.addEventListener('click', (e) => {
  if (e.target.className === 'close-btn' && checkbox.checked) {
    let value = e.target.getAttribute('data-item');
    let index = db.indexOf(value);
    db = [...db.slice(0, index), ...db.slice(index + 1)];
    addTag();
    setLocalstorage(db);
  }
});











