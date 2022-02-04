import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus Component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status = "Hi, I'm studying react"/>)
        const instance = component.getInstance()
        expect(instance.state.status).toBe("Hi, I'm studying react")
    })

    test("after creation span with status should be displayed with correct status", () => {
        const component = create(<ProfileStatus status = "Hi, I'm studying react" />)
        const root = component.root
        const span = root.findByType("span")
        expect(span.innerText).not.toBeNull()
    })

    test("after creation input with status should be displayed with correct status", () => {
        const component = create(<ProfileStatus status = "Hi, I'm studying react" />)
        const root = component.root
        expect(() => {
            const input = root.findByType("input")
        }).toThrow()
    })

    test("after creation span should be contains correct status", () => {
        const component = create(<ProfileStatus status = "Hi, I'm studying react" />)
        const root = component.root
        const span = root.findByType("span")
        expect(span.children[0]).toBe("Hi, I'm studying react")
    })

    test("input should be displayed in edit mode instead span", () => {
        const component = create(<ProfileStatus status = "Hi, I'm studying react" />)
        const root = component.root
        const span = root.findByType("span")
        span.props.onDoubleClick()
        const input = root.findByType("input")
        expect(input.props.value).toBe("Hi, I'm studying react")
    })

    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status = "Hi, I'm studying react" updateStatus = {mockCallback}/>)
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
} )
