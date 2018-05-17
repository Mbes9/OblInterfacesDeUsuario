import * as types from "../constants/action-types";
export const addArticle = article => ({ type: types.addArticle, payload: article });
export const updateUsers = users => ({ type: types.UPDATE_USER, payload: users });
export const addUser = user => (console.log(user),{type: types.ADD_USER, payload: user})