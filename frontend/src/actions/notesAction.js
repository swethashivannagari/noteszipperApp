import { NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTES_UPDATE_FAIL, NOTES_UPDATE_REQUEST, NOTES_UPDATE_SUCCESS } from "../constants/notesConstants";
import axios from 'axios';
import {
  MARK_NOTE_AS_COMPLETED_REQUEST,
  MARK_NOTE_AS_COMPLETED_SUCCESS,
  MARK_NOTE_AS_COMPLETED_FAIL,
} from '../constants/notesConstants';
import { NOTES_DELETE_FAIL, NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS } from "../constants/userConstants";

export const listNotes = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const noteList = getState().noteList || {};
      const { data } = await axios.get(`/api/notes`, config);

      dispatch({
        type: NOTES_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_LIST_FAIL,
        payload: message,
      });
    }
  };
  export const createNoteAction = (title, content, category) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: NOTES_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();

      if (!title || !content || !category) {
        // Dispatch an action with the error message
        dispatch({
          type: NOTES_CREATE_FAIL,
          payload: 'Please Fill all fields.',
        });
        return; // Exit the function early
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/notes/create`,
        { title, content, category },
        config
      );
  
      dispatch({
        type: NOTES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_CREATE_FAIL,
        payload: message,
      });
    }
};

export const updateNoteAction = (id, title, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: NOTES_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/notes/${id}`,
      { title, content, category },
      config
    );

    dispatch({
      type: NOTES_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/notes/${id}`, config);

    dispatch({
      type: NOTES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_DELETE_FAIL,
      payload: message,
    });
  }
};


// notesActions.js


// actions/notesAction.js



export const markNoteAsCompleted = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MARK_NOTE_AS_COMPLETED_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      },
    };

    // Make an API request to mark the note as completed
    const { data } = await axios.put(`/api/notes/mark-completed/${id}`, {}, config);

    dispatch({
      type: MARK_NOTE_AS_COMPLETED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MARK_NOTE_AS_COMPLETED_FAIL,
      payload: message,
    });
  }
};
