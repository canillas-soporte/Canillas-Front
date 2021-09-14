
//Acciones de modificacion de store
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const GET_TODOS = 'GET_TODOS'

//La accion es un objeto
export const addTodo = task => {
    return {
        type: ADD_TODO,
        todo: {
            task: task,
            complete: false
        }
    }
}

export const updateTodoStatus = (todo, complete) => {
    let obj = {
        type: UPDATE_TODO_STATUS,
        todo,
        complete
    }
    console.log(obj);
    return obj;
}

export const updateFilter = filter => {
    return {
        type: UPDATE_FILTER,
        filter
    }
}

export const clearCompleted = () => {
    return {
        type: CLEAR_COMPLETED
    }
}

export const getTodos = () => {
    return {
        type: GET_TODOS
    }
}