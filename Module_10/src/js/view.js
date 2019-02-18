import {
    ICON_TYPES,
    NOTE_ACTIONS
} from './utils/constants';

import Notepad from './notepad-model'


export const createNoteContent = (title, body) => {
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

export const createNoteFooter = priority => {
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

export const createActionButton = (action, icon) => {
    const actionButton = document.createElement('button');
    actionButton.classList.add('action');
    actionButton.dataset.action = action;

    const actionIcon = document.createElement('i');
    actionIcon.classList.add('material-icons', 'action__icon');
    actionIcon.textContent = icon;

    actionButton.append(actionIcon);
    return actionButton;
};

export const createListItem = ({
    id,
    title,
    body,
    priority
}) => {
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

export const addItemToList = (listRef, note) => {
    const listItem = createListItem(note);

    listRef.appendChild(listItem);
};

export const renderListItems = (listRef, data) => {
    const listItems = data.map(item => createListItem(item));

    listRef.innerHTML = '';
    listRef.append(...listItems);
};

// Refs

export const getRefs = () => ({
    list: document.querySelector('.note-list'),
    editor: document.querySelector('.note-editor'),
    filter: document.querySelector('.search-form'),
});