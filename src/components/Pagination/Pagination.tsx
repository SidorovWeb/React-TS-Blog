import React, { FC } from 'react'

interface PaginationProps {
  listLength: number
  page: number
  part: number
  changePage: (p: number) => void
}

export const Pagination: FC<PaginationProps> = ({ listLength, part, page, changePage }) => {
  const numberOfPages = Array.from({ length: Math.ceil(listLength / part) }, (x, i) => i + 1)

  const initialStyle = 'text-lg hover:opacity-70 p-1 px-2 cursor-pointer rounded-lg font-extrabold transition-all'
  return (
    <div className='page__wrapper flex justify-center'>
      {numberOfPages.length > 1 &&
        numberOfPages.map((p, idx) => (
          <span className={page === p ? `${initialStyle}` : `${initialStyle}`} key={idx} onClick={() => changePage(p)}>
            {p}
          </span>
        ))}
    </div>
  )
}
