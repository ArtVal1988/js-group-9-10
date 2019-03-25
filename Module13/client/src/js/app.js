import Notyf from 'notyf';
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
import 'notyf/dist/notyf.min.css';

const notepad = new Notepad();

const refs = getRefs();
const notyf = new Notyf();
MicroModal.init();

//Handlers
const handleEditorSubmit = event => {
  event.preventDefault();

  //   console.log(event.currentTarget);
  const [input, textarea] = event.currentTarget.elements;
  const title = input.value;
  const text = textarea.value;

  if (title.trim() === '' || text.trim() === '') {
    return notyf.alert('Забыли что-то ввести!');
  }

  notepad
    .save(title, text)
    .then(savedNote => {
      addItemToList(refs.list, savedNote);

      document.getElementById('note-editor-form').reset();

      MicroModal.close('note-editor-modal');
      notyf.confirm('Заметка успешно добавлена');
    })
    .catch(console.log);
};

const handleListClick = ({ target }) => {
  // console.log(event.target);
  // console.log(event.target.nodeName);

  if (target.nodeName !== 'I') return;

  const action = target.closest('button').dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
      const listItem = findParentListItem(target);

      notepad
        .delete(listItem.dataset.id)
        .then(id => {
          removeListItem(listItem);
          notyf.confirm(`Заметка успешно удалена`);
        })
        .catch(console.log);
      break;

    case NOTE_ACTIONS.EDIT:
      notyf.confirm('Заметка успешно отредактирована');
      break;

    default:
      notyf.alert('Произошла ошибка');
  }
};

const handleFilterChange = event => {
  const filteredItems = notepad.filterNotes(event.target.value);
  renderListItems(refs.list, filteredItems);
};

const handleAddClick = element => {
  MicroModal.show('note-editor-modal');
};

notepad
  .get()
  .then(notes => {
    renderListItems(refs.list, notes);
  })
  .catch(console.log);

//Listeners
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.list.addEventListener('click', handleListClick);
refs.filter.addEventListener('input', handleFilterChange);
refs.openEditorModalButton.addEventListener('click', handleAddClick);
