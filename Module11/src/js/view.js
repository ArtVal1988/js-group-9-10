import {
    ICON_TYPES,
    NOTE_ACTIONS
} from './utils/constants';
import Notepad from './notepad-model'
import noteTemplate from './../templates/note.hbs'


// Refs

export const getRefs = () => ({
    list: document.querySelector('.note-list'),
    editor: document.querySelector('.note-editor'),
    filter: document.querySelector('.search-form'),
    openEditorModalButton: document.querySelector('button[data-action="open-editor"]')
});

const refs = getRefs();

//RENDERING INITTIAL NOTES FROM TEMPLATE

const createNoteMarkup = note => {
    const noteWithTextPriority = Object.assign(note, {
        priority: Notepad.getPriorityName(note.priority)
    })
    console.log(noteWithTextPriority)

    return noteTemplate(note);
};

const createNoteListItemsMarkup = notes => {
    return notes.map(note => createNoteMarkup(note)).join('');
};

export const addItemToList = (listRef, note) => {
    const noteMarkup = createNoteMarkup(note);

    listRef.insertAdjacentHTML('beforeend', noteMarkup);

};


export const findParentListItem = child => {
    const parentListItem = child.closest('.note-list__item');

    return parentListItem;
}

export const removeListItem = listItem => {
    listItem.remove();
};


export const renderListItems = (listRef, data) => {
    const markup = createNoteListItemsMarkup(data);


    listRef.innerHTML = '';
    listRef.insertAdjacentHTML('beforeend', markup);
};