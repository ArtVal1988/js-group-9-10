import axios from 'axios';
import { Notyf } from 'notyf';
import MicroModal from 'micromodal';
import { NOTE_ACTIONS } from './utils/constants';
import Notepad from './notepad-model';
import {
  getRefs,
  addItemToList,
  renderListItems,
  removeListItem,
  findParentListItem,
} from './view';
import 'notyf/notyf.min.css';

const notepad = new Notepad();

const refs = getRefs();
const notyf = new Notyf();
// notyf.error('You must fill out the form before moving forward');

MicroModal.init();

// Async fetching and rendering functions
const showNotes = async () => {
  try {
    const notes = await notepad.get();
    renderListItems(refs.list, notes);
    return notes;
  } catch (err) {
    notyf.error(`Произошла ошибка: ${err.message}`);
  }
};

const removeNote = async target => {
  try {
    const listItem = findParentListItem(target);
    const id = listItem.dataset.id;

    await notepad.delete(id);
    removeListItem(listItem);
    notyf.success(`Заметка c id <b>${id}</b> успешно удалена`);
  } catch (err) {
    notyf.error(`Произошла ошибка: ${err.message}`);
  }
};

const addNote = async (title, text) => {
  try {
    const savedNote = await notepad.save(title, text);
    addItemToList(refs.list, savedNote);

    document.getElementById('note-editor-form').reset();

    MicroModal.close('note-editor-modal');
    notyf.success('Заметка успешно добавлена');
  } catch (err) {
    notyf.error(err);
  }
};

//Handlers
const handleEditorSubmit = event => {
  event.preventDefault();

  //   console.log(event.currentTarget);
  const [input, textarea] = event.currentTarget.elements;
  const title = input.value;
  const text = textarea.value;

  if (title.trim() === '' || text.trim() === '') {
    return notyf.error('Забыли что-то ввести!');
  }

  addNote(title, text);
};

const handleListClick = ({ target }) => {
  // console.log(event.target);
  // console.log(event.target.nodeName);

  if (target.nodeName !== 'I') return;

  const action = target.closest('button').dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
      removeNote(target);
      break;

    case NOTE_ACTIONS.EDIT:
      notyf.success('Заметка успешно отредактирована');
      break;

    default:
      notyf.error('Произошла ошибка');
  }
};

const handleFilterChange = event => {
  const filteredItems = notepad.filterNotes(event.target.value);
  renderListItems(refs.list, filteredItems);
};

const handleAddClick = element => {
  MicroModal.show('note-editor-modal');
};

showNotes();

//Listeners
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.list.addEventListener('click', handleListClick);
refs.filter.addEventListener('input', handleFilterChange);
refs.openEditorModalButton.addEventListener('click', handleAddClick);
