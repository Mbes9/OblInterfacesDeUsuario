import { ADD_ARTICLE } from "../constants/action-types";
import { UPDATE_USERS } from "../constants/action-types";
export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });
export const updateUsers = users => ({ type: UPDATE_USERS, payload: users });