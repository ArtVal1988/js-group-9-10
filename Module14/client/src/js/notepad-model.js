import * as api from './sevices/api';
import { PRIORITY_TYPES } from './utils/constants';

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  async get() {
    try {
      this._notes = await api.getNotes();
      return this._notes;
    } catch (err) {
      throw err;
    }
  }

  findNoteById(id) {
    for (let note of this._notes) {
      if (note.id === id) return note;
    }
  }

  async save(title, text) {
    const newNote = {
      title: title,
      body: text,
      priority: PRIORITY_TYPES.LOW,
    };
    try {
      const note = await api.saveNote(newNote);
      this._notes.push(note);
      return note;
    } catch (err) {
      throw err;
    }
  }

  async delete(id) {
    try {
      await api.deleteNote(id);
      this._notes = this._notes.filter(note => note.id !== id);
    } catch (err) {
      throw err;
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
