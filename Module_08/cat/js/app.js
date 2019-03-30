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
  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }
}
const notepad = new Notepad(initialNotes);
console.log(notepad.notes);

const createNoteContent = note => {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = note.title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = note.body;

  noteContent.appendChild(noteTitle);
  noteContent.appendChild(noteBody);
  return noteContent;
};

const createActionButton = (action, icon) => {
  const btn = document.createElement('button');
  btn.classList.add('action');
  btn.dataset.action = action;

  const expandLess = document.createElement('i');
  expandLess.classList.add('material-icons');
  expandLess.classList.add('action__icon');
  expandLess.textContent = icon;

  btn.appendChild(expandLess);
  return btn;
};

const createNoteFooter = note => {
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
  notePriority.textContent = `Priority: ${note.priority}`;

  const noteSectionEditDelete = document.createElement('section');
  noteSectionEditDelete.classList.add('note__section');

  const buttonEdit = createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT);
  const buttonDelete = createActionButton(
    NOTE_ACTIONS.DELETE,
    ICON_TYPES.DELETE,
  );
  noteSectionDecreaseIncrease.appendChild(buttonDecrease);
  noteSectionDecreaseIncrease.appendChild(buttonIncrease);
  noteSectionDecreaseIncrease.appendChild(notePriority);
  noteSectionEditDelete.appendChild(buttonEdit);
  noteSectionEditDelete.appendChild(buttonDelete);
  noteFooter.appendChild(noteSectionDecreaseIncrease);
  noteFooter.appendChild(noteSectionEditDelete);
  return noteFooter;
};

const createListItem = note => {
  const noteListItem = document.createElement('li');
  noteListItem.classList.add('note-list__item');
  noteListItem.dataset.id = note.id;
  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');
  const noteContent = createNoteContent(note);
  const footer = createNoteFooter(note);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(footer);
  noteListItem.appendChild(noteDiv);
  return noteListItem;
};

const renderNoteList = (listRef, notes) => {
  return notes.reduce((allList, note) => {
    allList.appendChild(createListItem(note));
    return allList;
  }, listRef);
};

const noteList = document.querySelector('.note-list');
renderNoteList(noteList, initialNotes);
