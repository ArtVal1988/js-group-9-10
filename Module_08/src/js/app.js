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
    id: 1,
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 2,
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 3,
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 4,
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

  findNoteById(id) {
    for (let note of this._notes) {
      if (note.id === id) return note;
    }
  }

  saveNote(note) {
    this._notes.push(note);
  }

  deleteNote(id) {
    for (let i = 0; i < this._notes.length; i += 1) {
      const note = this._notes[i];

      if (note.id === id) {
        this._notes.splice(i, 1);
        return;
      }
    }
  }

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    if (!note) return;

    for (let field in updatedContent) {
      note[field] = updatedContent[field];
    }

    return note;
  }

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);

    if (!note) return;

    note.priority = priority;
    return note;
  }

  filterNotes(query) {
    const filtredNotes = [];

    for (const note of this._notes) {
      const { title, body } = note;
      let noteContent = `${title} + ${body}`.toLowerCase();
      let hasQuery = noteContent.includes(query.toLowerCase());

      if (hasQuery) {
        filtredNotes.push(note);
      }
    }

    return filtredNotes;
  }

  static getPriorityName(priorityId) {
    return Notepad.PRIORITIES[priorityId].name;
  }
}

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
};

const notepad = new Notepad(initialNotes);

const createNoteContent = (title, body) => {
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

const createNoteFooter = priority => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const noteSection1 = document.createElement('section');
  noteSection1.classList.add('note__section');

  const decreaseButton = createActionButton(
    NOTE_ACTIONS.DECREASE_PRIORITY,
    ICON_TYPES.ARROW_DOWN,
  );
  const increaseButton = createActionButton(
    NOTE_ACTIONS.INCREASE_PRIORITY,
    ICON_TYPES.ARROW_UP,
  );

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = `Priority: ${Notepad.getPriorityName(priority)}`;

  noteSection1.append(decreaseButton, increaseButton, notePriority);

  const noteSection2 = document.createElement('section');
  noteSection1.classList.add('note__section');

  const editButton = createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT);
  const deleteButton = createActionButton(
    NOTE_ACTIONS.DELETE,
    ICON_TYPES.DELETE,
  );

  noteSection2.append(editButton, deleteButton);

  noteFooter.append(noteSection1, noteSection2);

  return noteFooter;
};

const createActionButton = (action, icon) => {
  const actionButton = document.createElement('button');
  actionButton.classList.add('action');
  actionButton.dataset.action = action;

  const actionIcon = document.createElement('i');
  actionIcon.classList.add('material-icons', 'action__icon');
  actionIcon.textContent = icon;

  actionButton.append(actionIcon);
  return actionButton;
};

const createListItem = ({ id, title, body, priority }) => {
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = id;

  const listNote = document.createElement('div');
  listNote.classList.add('note');

  const noteContent = createNoteContent(title, body);
  const noteFooter = createNoteFooter(priority);
  listNote.append(noteContent, noteFooter);

  listItem.append(listNote);

  return listItem;
};

const renderListItems = (listRef, data) => {
  const listItems = data.map(item => createListItem(item));

  listRef.append(...listItems);
};

const list = document.querySelector('.note-list');

renderListItems(list, notepad.notes);
