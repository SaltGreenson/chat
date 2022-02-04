import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

const store = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: '1', message: 'Hi'},
                {id: '2', message: 'Hello'},
                {id: '3', message: 'Good afternon'},
                {id: '4', message: 'Glad to see you'},
                {id: '5', message: 'Im ok'}
            ],
            friends: [
                {id: '1', name: 'Vlad'},
                {id: '2', name: 'Danik'},
                {id: '3', name: 'Dima'},
                {id: '4', name: 'Ira'},
                {id: '5', name: 'Nikita'},
                {id: '6', name: 'Valera'},
                {id: '7', name: 'Sasha'},
                {id: '8', name: 'Sveta'},
                {id: '9', name: 'Nastya'}
            ],
            newMessageText: ''
        },
        profilePage: {
            posts: [
                {id: 3, text: "1"},
                {id: 1, text: "2"},
                {id: 2, text: "3"},
                {id: 4, text: "4"},
                {id: 5, text: "5"},
                {id: 7, text: "6"},
                {id: 8, text: "7"},
            ],
            newPostText: ""
        },
        sidebar: {}
    },
    getState(){
      return this._state
    },
    _callSubscriber() {
    },
    addPost () {
        const newPost = {
            id: 6,
            text: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ''
        this._callSubscriber(this._state)
    },
    updateNewPostText (newText){
        this._state.profilePage.newPostText = newText
        this._callSubscriber(this._state)
    },
    subscribe (observer) {
        this._callSubscriber = observer // паттерн наблюдатель
    },
    dispatch(action){ // {type: "ADD-POST"}

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state)
    }
}

export const addpostActionCreator = () => {
    return {
        type: 'ADD-POST',

    }
}

export const updateNewPostTextActionCreator = (text) => {
    return {type:'UPDATE-NEW-POST-TEXT', text: text}
}

export const sendMessageCreator = () => {
  return {type: "SEND-MESSAGE"}
}

export const updateNewMessageBodyCreator = (text) => {
    return {
        type: "UPDATE-NEW-MESSAGE-BODY",
        text: text
    }
}


window.store = store
export default store