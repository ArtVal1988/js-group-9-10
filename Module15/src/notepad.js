export default class Notepad {
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

    return note;
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
