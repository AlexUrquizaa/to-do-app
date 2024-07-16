import { v4 as newTaskID }  from "uuid";

export const taskInitialState = JSON.parse(localStorage.getItem('task')) || [];
const updateLocalStorage = state => {
  window.localStorage.setItem('task', JSON.stringify(state));
}

const TASK_ACTION_TYPES = {
  ADD_TO_LIST: 'ADD_TO_LIST',
  REMOVE_FROM_LIST: 'REMOVE_FROM_LIST',
  UPDATE_TO_TASK: 'UPDATE_TO_TASK'
}

const UPDATE_STATE_BY_ACTION = {
  [TASK_ACTION_TYPES.ADD_TO_LIST]: (state, action) => {
    const { title } = action.payload;
    const newState = [...state, {
      title: title,
      id: newTaskID(),
      isCompleted: false
    }];
    updateLocalStorage(newState);
    return newState;
  },

  [TASK_ACTION_TYPES.REMOVE_FROM_LIST]: (state, action) => {
    const { id } = action.payload;
    const newState = state.filter(item => item.id !== id);
    updateLocalStorage(newState);
    return newState
  },

  [TASK_ACTION_TYPES.UPDATE_TO_TASK]: (state, action) => {
    const { id } = action.payload;
    const newState = state.map(item => item.id === id ? {...item, isCompleted: !item.isCompleted} : item);
    updateLocalStorage(newState);
    return newState
  }
}

export const functionReducer = (state, action) => {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE_BY_ACTION[actionType];
  return updateState ? updateState(state, action) : state;
}