import { combineReducers } from 'redux'
import app from './app'
import menu from './menu'
import entityList from './entityList'
import myTickets from './myTickets'

const rootReducer = combineReducers({
    app, menu, entityList, myTickets
})

export default rootReducer