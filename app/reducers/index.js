import { combineReducers } from 'redux'
import app from './app'
import menu from './menu'
import entityList from './entityList'

const rootReducer = combineReducers({
    app, menu, entityList
})

export default rootReducer