import * as types from '../constants/action-types'
const conversation = (state = [], action) => {
    switch (action.type) {
      case types.ADD_CONVERSATION:
      return state.concat([{
          id: action.id,
          members: action.members,
          messages: action.messages
        }
      ])
      default:
        return state
    }
  }
  
  export default conversation