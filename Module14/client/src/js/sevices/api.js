import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/notes/';

export const getNotes = async () => {
  try {
    const response = await axios();
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const saveNote = async post => {
  try {
    const response = await axios.post('', post);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteNote = async id => {
  try {
    const response = await axios.delete(id);

    return response;
  } catch (err) {
    throw err;
  }
};
