import React from "react"
import Paginator from "./Paginator"
import {create} from "react-test-renderer";

describe("Paginator component tests", () => {
    test("Pages const is 11 but should be showed only 10", () => {
        const component = create(<Paginator totalItemsCount = {11} pageSize = {1} portionSize = {10}/>)
        const root = component.root
        const spans = root.findAllByType("span")
        expect(spans.length).toBe(10)
    })

    test("if pages const is more then 10 buttons then nexy should be present", () => {
        const component = create(<Paginator totalItemsCount = {11} pageSize = {1} portionSize = {10}/>)
        const root = component.root
        const button = root.findAllByType("button")
        expect(button.length).toBe(1)
    })
})