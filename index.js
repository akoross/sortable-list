const draggable_list = document.getElementById('draggable_list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnualt',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Mishael Bloomberg',
  'Larry Page',
];

//Store listitems
const listItems = [];

let dragStartIndex;

//Insert list items into DOM
createList = () => {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
			<span class='number'>${index + 1}</span>
			<div class='draggable' draggable='true'>
				<p class='person-name'>${person}</p>
				<i class='fas fa-grip-lines'></i>
			</div>
		`;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });
};

createList();

//Swap list items that are drag and drop
const swapItems = (fromIndex, toIndex) => {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
};

//Check the order of list items
const checkOrder = () => {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
};

check.addEventListener('click', checkOrder);

const dragStart = (draggable) => {
  dragStartIndex = +draggable.closest('li').getAttribute('data-index');
};

const dragOver = (e) => {
  e.preventDefault();
};

const dragDrop = (item) => {
  const dragEndIndex = +item.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  item.classList.remove('over');
};

const dragEnter = (item) => {
  item.classList.add('over');
};

const dragLeave = (item) => {
  item.classList.remove('over');
};

const addEventListeners = () => {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      dragStart(draggable);
    });
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', () => {
      dragDrop(item);
    });
    item.addEventListener('dragenter', () => {
      dragEnter(item);
    });
    item.addEventListener('dragleave', () => {
      dragLeave(item);
    });
  });
};

addEventListeners();
