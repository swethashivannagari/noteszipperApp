import { createStore,combineReducers,applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducers"
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from "./reducers/notesReducer"

const reducer=combineReducers({
userLogin:userLoginReducer,
userRegister:userRegisterReducer,
noteList:noteListReducer,
noteCreate:noteCreateReducer,
noteUpdate:noteUpdateReducer,
noteDelete:noteDeleteReducer,
userUpdate:userUpdateReducer,

})

const userInfoFormStorage=localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem("userInfo")):null;
const intialState={
userLogin:{userInfo:userInfoFormStorage}
}

const middleware=[thunk]
const store=createStore(reducer,intialState,
    composeWithDevTools(applyMiddleware(...middleware)));

    export default store;