'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const notebook = {
  notes: [],

  getNotes() {
    return this.notes;
  },

  findNoteById(id) {
    for (let note of this.notes) {
      if (note.id === id) return note;
    }
  },

  saveNote(note) {
    this.notes.push(note);
  },

  deleteNote(id) {
    for (let i = 0; i < this.notes.length; i += 1) {
      const note = this.notes[i];

      if (note.id === id) {
        this.notes.splice(i, 1);
        return;
      }
    }
  },

  updateNoteContent(id, updatedContent) {
    let note = this.findNoteById(id);
    if (!note) return;

    for (let field in updatedContent) {
      note[field] = updatedContent[field];
    }

    return note;
  },
  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);

    if (!note) return;

    note.priority = priority;
    return note;
  },
  filterNotes(query) {
    let filtredNotes = [];

    for (const note of this.notes) {
      const {
        title,
        body
      } = note;
      let noteContent = `${title} + ${body}`.toLowerCase();
      let hasQuery = noteContent.includes(query.toLowerCase());

      if (hasQuery) {
        filtredNotes.push(note);
      }
    }

    return filtredNotes;
  },
  filtredByPriority(priority) {
    const filtredByPriorityNotes = this.notes.filter(
      note => note.priority === priority,
    );

    // for (const note of this.notes) {
    //   if (note.priority === priority) {
    //     filtredByPriorityNotes.push(note);
    //   }
    // }
    return filtredByPriorityNotes;
  },
};

/*
  Добавляю 4 заметки и смотрю что получилось
*/

notebook.saveNote({
  id: 1,
  title: 'JavaScript essentials',
  body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
  priority: PRIORITY_TYPES.HIGH,
});

notebook.saveNote({
  id: 2,
  title: 'Refresh HTML and CSS',
  body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
  priority: PRIORITY_TYPES.NORMAL,
});

notebook.saveNote({
  id: 3,
  title: 'Get comfy with Frontend frameworks',
  body: 'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: PRIORITY_TYPES.NORMAL,
});

notebook.saveNote({
  id: 4,
  title: 'Winter clothes',
  body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: PRIORITY_TYPES.LOW,
});

console.log(
  'Filter by Priority:',
  notebook.filtredByPriority(PRIORITY_TYPES.HIGH),
);

console.log('Все текущие заметки: ', notebook.getNotes());

/*
  Зима уже близко, пора поднять приоритет на покупку одежды
*/
notebook.updateNotePriority(4, PRIORITY_TYPES.NORMAL);
// Смотрю что у меня в заметках
console.log(
  'Заметки после обновления приоритета для id 4: ',
  notebook.getNotes(),
);

/*
  Решил что фреймворки отложу немного, понижаю приоритет
*/
notebook.updateNotePriority(3, PRIORITY_TYPES.LOW);
console.log(
  'Заметки после обновления приоритета для id 3: ',
  notebook.getNotes(),
);

/*
  Решил отфильтровать заметки по слову html
*/
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notebook.filterNotes('html'),
);

/*
  Решил отфильтровать заметки по слову javascript
*/
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notebook.filterNotes('javascript'),
);

/*
  Обновим контент заметки с id 3
*/
notebook.updateNoteContent(3, {
  title: 'Get comfy with React.js or Vue.js',
  body: 'Bla! Bla! Bla! Bla! Bla! Bla! Bla! Bla! ',
});
console.log(
  'Заметки после обновления контента заметки с id 3: ',
  notebook.getNotes(),
);

/*
  Повторил HTML и CSS, удаляю запись c id 2
*/
notebook.deleteNote(2);
console.log('Заметки после удаления с id 2: ', notebook.getNotes());