import * as types from "../constants/action-types";
export const addArticle = article => ({ type: types.addArticle, payload: article });
export const updateUsers = users => ({ type: types.UPDATE_USER, payload: users });
export const addUser = users => ({type: types.ADD_USER, payload: users})