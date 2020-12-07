const initialState = {
    content: '', 
    title: '',
    profilePic: '',
    username: '',
    date: '',
    writerId: 0
}

const LOGIN_USER = "LOGIN_USER";
const POST_CONTENT = "POST_CONTENT";
const EDIT_CONTENT = "EDIT_CONTENT";
const DELETE_CONTENT = "DELETE_CONTENT";
const ADD_PIC = "ADD_PIC";

export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user
    }
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
            return {...state, user: action.payload}
        default:
            return state
    }
}
