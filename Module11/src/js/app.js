import Notyf from 'notyf';
import MicroModal from 'micromodal';

import {
    NOTE_ACTIONS
} from './utils/constants';
import Notepad from './notepad-model';
import initialNotes from './../assets/notes.json';
import {
    getRefs,
    addItemToList,
    renderListItems,
    removeListItem,
    findParentListItem
} from './view';

import 'notyf/dist/notyf.min.css';

const notepad = new Notepad(initialNotes);
const refs = getRefs();
const notyf = new Notyf();
MicroModal.init();

//Handlers
const handleEditorSubmit = event => {
    event.preventDefault();

    // console.log(event.currentTarget.elements);
    const [input, textarea] = event.currentTarget.elements;
    const title = input.value;
    const text = textarea.value;


    if (title.trim() === '' || text.trim() === '') {
        return notyf.alert('Забыли что-то ввести!');
    }

    const savedNote = notepad.saveNote(title, text);

    addItemToList(refs.list, savedNote);

    MicroModal.close('note-editor-modal');
    notyf.confirm("Заметка успешно добавлена")

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
            const listItem = findParentListItem(target);

            notepad.deleteNote(listItem.dataset.id)
            removeListItem(listItem);

            notyf.confirm('Заметка успешно удалена')
            break;

        case NOTE_ACTIONS.EDIT:

            notyf.confirm('Заметка успешно отредактирована')
            break;

        default:
            notyf.alert('Произошла ошибка')
    }
};

const handleFilterChange = event => {
    //console.log("EVENT", event.target.value);

    const filteredItems = notepad.filterNotes(event.target.value);
    console.log("FILTERED NOTES:", filteredItems)

    renderListItems(refs.list, filteredItems);
};

const handleAddClick = element => {
    MicroModal.show('note-editor-modal');
}

renderListItems(refs.list, notepad.notes);

//Listeners
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.list.addEventListener('click', handleListClick);
refs.filter.addEventListener('input', handleFilterChange);
refs.openEditorModalButton.addEventListener('click', handleAddClick)