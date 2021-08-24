import React, { useState } from 'react'
import NoteForm from './NoteForm'
import Note from './Note'
import SearchPanel from '../search-panel/search-panel'

function NotesList() {
  const [todos, setTodos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const addTodo = (todo) => {
    if (!todo.text) {
      return
    }

    const newTodos = [todo, ...todos]

    setTodos(newTodos)
    console.log(...todos)
  }

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text) {
      return
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    )
  }

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id)

    setTodos(removedArr)
  }

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm)

    if (searchTerm !== '') {
      const newTodosList = todos.filter((todo) => {
        return Object.values(todo)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      })

      setSearchResult(newTodosList)
    } else {
      setSearchResult(todos)
    }
  }

  return (
    <>
      <h1>What were you thinking today? </h1>
      <NoteForm onSubmit={addTodo} />
      <SearchPanel searchKeyword={searchHandler} value ={searchTerm}/>
      <Note
        todos={searchTerm.length < 1 ? todos : searchResult}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        term={searchTerm}
        searchKeyword={searchHandler}
      />
    </>
  )
}

export default NotesList
