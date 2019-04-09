'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];
class Notepad {
  static generateUniqueId = () =>
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }
  saveNote(note) {
    this._notes.push(note);
    return note;
  }
  deleteNote(id) {
    this._notes.filter(note => note.id !== id);
  }
  filterNote(query = '') {
    return this._notes.filter(note =>
      note.body.toLowerCase().includes(query.toLowerCase()),
    );
  }
}
const notepad = new Notepad(initialNotes);
//console.log(notepad.notes);

const createNoteContent = ({ id, title, body, priority }) => {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');
  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;
  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;
  noteContent.append(noteTitle, noteBody);
  return noteContent;
};

const createActionButton = (action, icon) => {
  const btn = document.createElement('button');
  btn.classList.add('action');
  btn.dataset.action = action;
  const iconType = document.createElement('i');
  iconType.classList.add('material-icons', 'action__icon');
  iconType.textContent = icon;
  btn.appendChild(iconType);
  return btn;
};

const createNoteFooter = ({ id, title, body, priority }) => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');
  const noteSectionDecreaseIncrease = document.createElement('section');
  noteSectionDecreaseIncrease.classList.add('note__section');
  const buttonDecrease = createActionButton(
    NOTE_ACTIONS.DECREASE_PRIORITY,
    ICON_TYPES.ARROW_DOWN,
  );
  const buttonIncrease = createActionButton(
    NOTE_ACTIONS.INCREASE_PRIORITY,
    ICON_TYPES.ARROW_UP,
  );
  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = `Priority: ${priority}`;
  const noteSectionEditDelete = document.createElement('section');
  noteSectionEditDelete.classList.add('note__section');
  const buttonEdit = createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT);
  const buttonDelete = createActionButton(
    NOTE_ACTIONS.DELETE,
    ICON_TYPES.DELETE,
  );
  noteSectionDecreaseIncrease.append(
    buttonDecrease,
    buttonIncrease,
    notePriority,
  );
  noteSectionEditDelete.append(buttonEdit, buttonDelete);
  noteFooter.append(noteSectionDecreaseIncrease, noteSectionEditDelete);
  return noteFooter;
};

const createListItem = ({ id, title, body, priority }) => {
  const noteListItem = document.createElement('li');
  noteListItem.classList.add('note-list__item');
  noteListItem.dataset.id = id;
  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');
  const noteContent = createNoteContent({ id, title, body, priority });
  const footer = createNoteFooter({ id, title, body, priority });
  noteDiv.append(noteContent, footer);
  noteListItem.appendChild(noteDiv);
  return noteListItem;
};

const renderNoteList = (listRef, notes) => {
  return notes.reduce((allList, note) => {
    allList.appendChild(createListItem(note));
    return allList;
  }, listRef);
};

const addListItem = (listRef, note) => {
  listRef.appendChild(createListItem(note));
};

const removeListItem = elementToRemove => {
  const parentListItem = elementToRemove.closest('.note-list__item');
  const id = parentListItem.dataset.id;
  console.log(id);
  notepad.deleteNote(id);
  parentListItem.remove();
};

const createNote = (title, body) => {
  const id = Notepad.generateUniqueId();
  const newNote = {
    id,
    title,
    body,
    priority: PRIORITY_TYPES.LOW,
  };
  return newNote;
};

const hendlerSaveNote = ({ target }) => {
  event.preventDefault();
  const newTitle = titleElement.value.trim();
  const newBody = bodyElement.value.trim();
  if (newTitle === '' || newBody === '') {
    alert('Необходимо заполнить все поля!');
    return;
  }
  const newNote = createNote(newTitle, newBody);
  notepad.saveNote(newNote);
  addListItem(noteList, newNote);
  formaInput.reset();
};

const hendlerActionClick = ({ target }) => {
  if (target.parentNode.nodeName !== 'BUTTON') return;
  const action = target.parentNode.dataset.action;
  switch (action) {
    case NOTE_ACTIONS.DELETE:
      removeListItem(target);
      break;
    case NOTE_ACTIONS.EDIT:
      console.log('edit');
      break;
  }
};

const hendlerFilter = ({ target }) => {
  const query = target.value.trim();
  const filtredNotes = notepad.filterNote(query);
  noteList.innerHTML = '';
  renderNoteList(noteList, filtredNotes);
  console.log(filtredNotes);
};

const noteList = document.querySelector('.note-list');
const formaInput = document.querySelector('form.note-editor');
const titleElement = document.querySelector('input[name=note_title]');
const bodyElement = document.querySelector('textarea[name=note_body]');
const filterInput = document.querySelector('form.search-form');

renderNoteList(noteList, initialNotes);
formaInput.addEventListener('submit', hendlerSaveNote);
noteList.addEventListener('click', hendlerActionClick);
filterInput.addEventListener('input', hendlerFilter);
