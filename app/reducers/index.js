import { combineReducers } from 'redux'
import app from './app'
import menu from './menu'
import entityList from './entityList'
import myTickets from './myTickets'
import login from './login'

const rootReducer = combineReducers({
    app, menu, entityList, myTickets, login
})

export default rootReducer