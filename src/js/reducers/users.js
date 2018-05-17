import * as types from '../constants/action-types'

const users = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case types.ADD_USER:
      return state.concat([{ name: action.payload.name, id: action.payload.id, onlineStatus: true, image: action.payload.image }])
    case types.UPDATE_USER:
      const index = this.state.findIndex(user => user.id === action.payload.id)
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          onlineStatus: action.payload.onlineStatus
        }
      ]
    default:
      return state
  }
}

export default users