import * as types from '../constants/action-types'

const messages = (state = [], action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
      return state.concat([{ 
        text: action.text,
        createAt: action.createAt,
        id: action.id
       }])
    default:
      return state
  }
}

export default messages