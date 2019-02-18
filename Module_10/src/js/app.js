import {
    NOTE_ACTIONS
} from './utils/constants';
import Notepad from './notepad-model';
import initialNotes from './../assets/notes.json';
import {
    getRefs,
    addItemToList,
    renderListItems
} from './view';

const notepad = new Notepad(initialNotes);
const refs = getRefs();

//Handlers
const handleEditorSubmit = event => {
    event.preventDefault();

    console.log(event.currentTarget.elements);
    const [input, textarea] = event.currentTarget.elements;
    const title = input.value;
    const text = textarea.value;


    if (title.trim() === '' || text.trim() === '') {
        return alert('Забыли что-то ввести!');
    }

    const savedNote = notepad.saveNote(title, text);

    addItemToList(refs.list, savedNote);

    event.currentTarget.reset();
};

const handleListClick = ({
    target
}) => {
    // console.log(event.target);
    // console.log(event.target.nodeName);

    if (target.nodeName !== 'I') return;

    const action = target.closest('button').dataset.action;

    switch (action) {
        case NOTE_ACTIONS.DELETE:
            console.log('delete');
            removeListItem(target);
            break;

        case NOTE_ACTIONS.EDIT:
            console.log('edit');
            break;

        default:
            console.log('invalid action!');
    }
};

const removeListItem = element => {
    const parentListItem = element.closest('.note-list__item');
    const id = parentListItem.dataset.id;

    notepad.deleteNote(id);
    parentListItem.remove();
};

const handleFilterChange = event => {
    console.log(event.target.value);

    const filteredItems = notepad.filterNotes(event.target.value);
    console.log(filteredItems)

    renderListItems(refs.list, filteredItems);
};

renderListItems(refs.list, notepad.notes);

//Listeners
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.list.addEventListener('click', handleListClick);
refs.filter.addEventListener('input', handleFilterChange);