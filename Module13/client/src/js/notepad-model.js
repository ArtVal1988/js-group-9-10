import * as api from './../sevices/api';
import { PRIORITY_TYPES } from './utils/constants';

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  get() {
    return api.getNotes().then(notes => {
      this._notes = notes;

      return this._notes;
    });
  }

  findNoteById(id) {
    for (let note of this._notes) {
      if (note.id === id) return note;
    }
  }

  save(title, text) {
    const newNote = {
      title: title,
      body: text,
      priority: PRIORITY_TYPES.LOW,
    };

    return api.saveNote(newNote).then(note => {
      this._notes.push(note);

      return note;
    });
  }

  delete(id) {
    return api.deleteNote(id).then(id => {
      this._notes = this._notes.filter(note => note.id !== id);

      return id;
    });
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
    //console.log('PRIORITYid',priorityId);
    return Notepad.PRIORITIES[priorityId].name;
  }
}

Notepad.PRIORITIES = {
  0: {
    id: 0,
    value: 0,
    name: 'Low',
  },
  1: {
    id: 1,
    value: 1,
    name: 'Normal',
  },
  2: {
    id: 2,
    value: 2,
    name: 'High',
  },
};
