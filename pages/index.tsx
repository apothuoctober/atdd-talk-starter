// noinspection JSVoidFunctionReturnValueUsed

import { NextPage } from 'next'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import classNames from 'classnames'

// Typescript interface for Todo item
interface Todo {
  key: number
  name: string
  completed: boolean
}

// Main Page
const Page$Home: NextPage = () => {
  // name of new todo in todo form
  const [todoFormError, setTodoFormError] = useState<string | null>(null)
  const [todoFormName, setTodoFormName] = useState<string | null>(null)
  // the list of todos
  const [todosList, setTodosList] = useState<Todo[]>([])

  // add a new todo from the form to the list
  const addTodoHandler = (e: FormEvent | null): void => {
    if (e !== null) e.preventDefault()
    if (todoFormName === null || todoFormName === "" || todoFormName.length === 0) {
      setTodoFormError("New item name is empty")
    }
    else {
      const possibleConflictingTodo = todosList.find((t) => t.name === todoFormName)
      if (possibleConflictingTodo !== undefined) {
        setTodoFormError('An item with this name already exists')
      }
      else {
        const newTodo: Todo = {
          key: Math.random() * 9999,
          name: todoFormName!,
          completed: false,
        }
        const todosListCopy = [...todosList, newTodo]
        setTodosList(todosListCopy)
        setTodoFormName(null)
      }
    }
  }

  // remove todo item from the list
  const removeTodoHandler = (todo: Todo): void => {
    const todoIndex = todosList.indexOf(todo)
    const todosListCopy = [...todosList]
    todosListCopy.splice(todoIndex, 1)
    setTodosList(todosListCopy)
  }

  // change new todo name in the form
  const todoFormNameChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoFormName(e.target.value)
  }

  // toggle todo item completion
  const toggleTodoHandler = (todo: Todo): void => {
    const todoIndex = todosList.indexOf(todo)
    const todosListCopy = [...todosList]
    todosListCopy[todoIndex].completed = !todosListCopy[todoIndex].completed
    setTodosList(todosListCopy)
  }

  // FOR TESTING PURPOSE
  useEffect(() => {
    // @ts-ignore
    if (window.Cypress !== undefined) {
      // @ts-ignore
      window.hacks = {
        addTodos: (todos: [{name: string, completed: boolean}]) => {
          console.log('Invoked for test: add todo, with', todos)
          const newTodos = todos.map((t) => ({
            ...t,
            key: Math.random() * 9999
          }))
          const newTodosList = [...todosList, ...newTodos]
          setTodosList(newTodosList)
        }
      }
    }
  },[])

  const isConflictingOnTodoName = todoFormError !== null && todoFormError.includes('already exists')
  const isConflictingTodo = (todoName: string): boolean => {
    return isConflictingOnTodoName && todoFormName === todoName
  }

  return (
    <>

      <header className='header'>
        <h1>Todos</h1>
      </header>

      <main className='main'>

        {/* 
        *************************
        NEW TODO FORM
        *************************
        */}
        <form className='todo-form' onSubmit={addTodoHandler}>
          <fieldset>
            <label htmlFor='name'>To do</label>
            <input
              id='name'
              name='name'
              type='text'
              placeholder='Todo item...'
              value={todoFormName ?? ''}
              onChange={todoFormNameChangeHandler}
            />
            {todoFormError !== null && todoFormError !== "" && todoFormError.length > 0 && (
              <span className='todo-form-error'>{todoFormError}</span>
            )}
          </fieldset>
          <fieldset className='todo-form-actions'>
            <button type='submit'>Create</button>
          </fieldset>
        </form>

        {/* 
        *************************
        TODOS LIST
        *************************
        */}
        <ul className='todos-list'>
          {todosList.map((todo) => (
            <li className={classNames('todos-list-item', { completed: todo.completed, conflict: isConflictingTodo(todo.name) })} key={todo.key}>
              <input type='checkbox' checked={todo.completed} onChange={() => { toggleTodoHandler(todo) }} />
              <p className={classNames({ completed: todo.completed })}>{todo.name}</p>
              <button className='delete-todo' type='button' onClick={() => { removeTodoHandler(todo) }}>❌</button>
            </li>
          ))}
        </ul>

      </main>

    </>
  )
}

export default Page$Home