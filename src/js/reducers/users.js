import * as types from '../constants/action-types'

const users = (state = [], action) => {
  switch (action.type) {
    case types.ADD_USER:
      return state.concat([{ name: action.name, id: action.id, onlineStatus: true, image: action.image }])
    case types.UPDATE_USER:
      const index = this.state.findIndex(user => user.id === action.id)
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          onlineStatus: action.onlineStatus
        }
      ]
    default:
      return state
  }
}

export default users