import Notepad from '../notepad';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
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
];

describe('Notepad model', () => {
  let notepad;

  beforeEach(() => {
    notepad = new Notepad(initialNotes);
  });

  it('should has initial notes', () => {
    expect(notepad.notes).toEqual(initialNotes);
  });

  it('should save note', () => {
    const newSavedNote = notepad.saveNote({
      id: 3,
      title: 'Get comfy with Frontend frameworks',
      body:
        'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
      priority: PRIORITY_TYPES.LOW,
    });
    expect(notepad.notes[2]).toEqual(newSavedNote);
  });

  it('should update note priority', () => {
    notepad.updateNotePriority(3, PRIORITY_TYPES.NORMAL);

    expect(notepad.notes[2].priority).toBe(PRIORITY_TYPES.NORMAL);
  });

  it('should update note data', () => {
    notepad.updateNoteContent(1, {
      title: 'Bla Bla Bla',
    });

    expect(notepad.notes[0].title).toBe('Bla Bla Bla');
  });

  it('should delete the note with proper id', () => {
    notepad.deleteNote(3);

    expect(notepad.notes[2]).toBeUndefined();
  });

  it('should finde the note with proper id', () => {
    const findedeNote = notepad.findNoteById(1);

    expect(notepad.notes[0]).toEqual(findedeNote);
  });

  it('should filter the notes on query request', () => {
    const filtredNotes = notepad.filterNotes('PostCSS');

    expect(filtredNotes[0]['id']).toEqual(2);
  });

  it('should get priority name by its id', () => {
    expect(Notepad.getPriorityName(1)).toBe('Normal');
  });
});
