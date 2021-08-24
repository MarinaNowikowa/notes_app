import React, { useRef } from 'react'

export default function SearchPanel(props) {
  const { searchTerm, searchKeyword } = props
  const inputEl = useRef('')

  function getSearchTerm(e) {
    searchKeyword(e.target.value)
  }

  return (
    <input
      ref={inputEl}
      className='todo-input search'
      type='text'
      placeholder='Поиск по записям'
      value={searchTerm}
      onChange={getSearchTerm}
    />
  )
}
