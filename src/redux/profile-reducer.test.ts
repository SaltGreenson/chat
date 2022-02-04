import profileReducer, {actions} from "./profile-reducer";
import {ProfileType} from "../types/types";

const state = {
    posts: [
        {id: 3, text: "1"},
        {id: 1, text: "2"},
        {id: 2, text: "3"},
        {id: 4, text: "4"},
        {id: 5, text: "5"},
        {id: 7, text: "6"},
        {id: 8, text: "7"},
    ],
    newPostText: "",
    profile: null,
    status: "",
}

it('new post should be added', () => {
    // 1. test data
    const action = actions.addPostActionCreator('test text')

    // 2. action
    const newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(8)
})

it('text of new post should be correct', () => {
    // 1. test data
    const action = actions.addPostActionCreator('test text')

    // 2. action
    const newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts[7].text).toBe("test text")
})

it('after deleting length of messages should be decrement', () => {
    // 1. test data
    const action = actions.deletePost(1)

    // 2. action
    const newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(6)
})

it(`after deleting length shouldn't be decrement if id is not correct`, () => {
    // 1. test data
    const action = actions.deletePost(12381230192312048129)

    // 2. action
    const newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(7)
})
