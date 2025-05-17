import { useState } from "react";
import { ToDoItems, AddTaskForm, Modal } from "./ToDo";
import { nanoid } from "nanoid";
import React from "react";

interface IToDoItem{
  id:string;
  name:string;
  completed:boolean;
}

interface IToDoData{
  data:IToDoItem[]
}

function App(props:IToDoData) {
  //Store passed in DATA array from main.jsx into a taskList array of ToDo components 
  const [taskList, setTaskList] = React.useState<IToDoItem[]>(props.data);
  const [modal, setModal] = useState(true);

  function modalControl() {
    const currentModal = modal;
    setModal(!currentModal);
  }

  const initialTaskList = taskList?.map((task) => (
    <ToDoItems
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      onCheck={checkTask}
      onDelete={deleteTask}
    />
  ));

  function addTask(taskToAdd:string) {
    //nanoid() generates a random string for React Key/id
    const newTask = {
      id: `todo-${nanoid()}`,
      name: taskToAdd,
      completed: false,
    };
    // spread syntax to copy array
    setTaskList([...taskList, newTask]);
    setModal(false);
  }

  function checkTask(idToCheck:string) {
    const tempTasks = taskList.map((task) => {
      if (task.id === idToCheck) {
        //result returns to tempTasks
        return { ...task, completed: !task.completed };
      } else return task;
    });
    setTaskList(tempTasks);
  }

  function deleteTask(idToDelete:string) {
    const tempTasks = taskList.filter((task) => idToDelete !== task.id);
    setTaskList(tempTasks);
  }

  return (
    <main className="m-4">
      <button
        className="text-white p-1 ml-1 bg-sky-500 hover:bg-sky-700 active:bg-sky-950 rounded-md"
        onClick={modalControl}
      >
        New Task
      </button>
      {modal ? (
        <Modal headerLabel="New Task" onCloseRequested={modalControl}>
          <AddTaskForm onNewTask={addTask} />
        </Modal>
      ) : null}
      <section className="m-2">
        <h1 className="text-xl font-bold">To do</h1>
        <ul>{initialTaskList}</ul>
      </section>
      
    </main>
  );
}

export default App;
