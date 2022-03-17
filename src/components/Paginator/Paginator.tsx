import React, {useState} from "react";
import classes from "./Paginator.module.css"
import classNames from "classnames"



const Paginator: React.FC<PropsType> = ({totalItemsCount,
                                            pageSize,
                                            currentPage = 1,
                                            onPageChanged = x => x,
                                            portionSize = 7}) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize
    return (
        <div className={classes.paginator}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={classNames({
                        [classes.selectedPage]: currentPage === p
                    }, classes.pageNumber)}
                                 key={p} onClick={(e) => {
                        onPageChanged(p)
                    }
                    }> {p} </span>
                })}
            {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>}
        </div>
    )
}

export default Paginator

// =====================================================================================================================

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}