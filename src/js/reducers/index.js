import * as types from '../constants/action-types'
import { combineReducers } from 'redux';
import usersReducer from './users'
import messagesReducer from './messages'
import conversationsReducer from './conversations'

const rootReducer = combineReducers({users:usersReducer, conversations: conversationsReducer, messages: messagesReducer})

export default rootReducer;