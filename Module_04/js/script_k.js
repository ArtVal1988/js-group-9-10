'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const notepad = {
  notes: [],

  getNotes() {
    return this.notes;
  },

  findNoteById(id) {
    for (const note of this.notes) {
      if (note.id === id) {
        return note;
      }
    }
  },
  saveNote(note) {
    /*
     * Сохраняет заметку в массив notes
     *
     * Принимает: объект заметки
     * Возвращает: сохраненную заметку
     */
    this.notes.push(note);
    return note;
  },
  deleteNote(id) {
    /*
     * Удаляет заметку по идентификатору из массива notes
     *
     * Принимает: идентификатор заметки
     * Возвращает: ничего
     */

    for (let i = 0; i < this.notes.length; i += 1) {
      if (this.notes[i].id === id) {
        this.notes.splice(i, 1);
      }
    }
  },

  updateNoteContent(id, updatedContent) {
    /*
     * Обновляет контент заметки
     * updatedContent - объект с полями вида {имя: значение, имя: значение}
     * Свойств в объекте updatedContent может быть произвольное количество
     *
     * Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
     * Возвращает: обновленную заметку
     */
    const note = this.findNoteById(id);
    if (!note) return;

    return {
      ...note,
      ...updatedContent
    };
  },
  updateNotePriority(id, priority) {
    /*
     * Обновляет приоритет заметки
     *
     * Принимает: идентификатор заметки и ее новый приоритет
     * Возвращает: обновленную заметку
     */
    const note = this.findNoteById(id);
    if (!note) return;
    note.priority = priority;
    return note;
  },
  filterNotesByQuery(query) {
    /*
     * Фильтрует массив заметок по подстроке query.
     * Если значение query есть в заголовке или теле заметки - она подходит
     *
     * Принимает: подстроку для поиска в title и body заметки
     * Возвращает: новый массив заметок, контент которых содержит подстроку
     */
    const notesByQuery = [];

    for (const note of this.notes) {
      let {
        title,
        body
      } = note;
      title = title.toLowerCase();
      body = body.toLowerCase();
      query = query.toLowerCase();
      if (title.includes(query) || body.includes(query)) {
        notesByQuery.push(note);
      }
    }
    return notesByQuery;
  },

  filterNotesByPriority(priority) {
    /*
     * Фильтрует массив заметок по значению приоритета
     * Если значение priority совпадаем с приоритетом заметки - она подходит
     *
     * Принимает: приоритет для поиска в свойстве priority заметки
     * Возвращает: новый массив заметок с подходящим приоритетом*/

    const notesByPriority = [];
    for (const note of this.notes) {
      if (note.priority === priority) {
        notesByPriority.push(note);
      }
    }
    return notesByPriority;
  },
};
/*
  Добавляю 4 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: 1,
  title: 'JavaScript essentials',
  body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
  priority: PRIORITY_TYPES.HIGH,
});

notepad.saveNote({
  id: 2,
  title: 'Refresh HTML and CSS',
  body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
  priority: PRIORITY_TYPES.NORMAL,
});

notepad.saveNote({
  id: 3,
  title: 'Get comfy with Frontend frameworks',
  body: 'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: PRIORITY_TYPES.NORMAL,
});

notepad.saveNote({
  id: 4,
  title: 'Winter clothes',
  body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: PRIORITY_TYPES.LOW,
});

console.log('Все текущие заметки: ', notepad.getNotes());

/* Зима уже близко, пора поднять приоритет на покупку одежды*/

notepad.updateNotePriority(4, PRIORITY_TYPES.NORMAL);
// Смотрю что у меня в заметках
console.log(
  'Заметки после обновления приоритета для id 4: ',
  notepad.getNotes(),
);

/*
 Решил что фреймворки отложу немного, понижаю приоритет
 */

notepad.updateNotePriority(3, PRIORITY_TYPES.LOW);
console.log(
  'Заметки после обновления приоритета для id 3: ',
  notepad.getNotes(),
);

// Решил отфильтровать заметки по слову html

console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notepad.filterNotesByQuery('html'),
);

//Решил отфильтровать заметки по слову javascript

console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notepad.filterNotesByQuery('javascript'),
);

// Хочу посмотреть только заметки с нормальным приоритетом

console.log(
  'Отфильтровали заметки по нормальному приоритету: ',
  notepad.filterNotesByPriority(PRIORITY_TYPES.NORMAL),
);

// Обновим контент заметки с id 3

notepad.updateNoteContent(3, {
  title: 'Get comfy with React.js or Vue.js'
});
console.log(
  'Заметки после обновления контента заметки с id 3: ',
  notepad.getNotes(),
);

// Повторил HTML и CSS, удаляю запись c id 2

notepad.deleteNote(2);
console.log('Заметки после удаления с id 2: ', notepad.getNotes());