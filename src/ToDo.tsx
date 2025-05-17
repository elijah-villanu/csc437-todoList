import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { useState,useRef } from "react";


interface IToDoItem{
  id:string;
  name:string;
  completed:boolean;
}

interface IToDoItemsProps {
  id:string;
  name:string;
  completed:boolean;
  key:string;
  onCheck: (arg:string) => void;
  onDelete: (arg:string) => void;
}

interface IModalProps {
  headerLabel:string;
  onCloseRequested:() => void;
  children:React.ReactNode;
}

interface IAddTaskFormProps{
  onNewTask:(arg:string) => void;
}

interface IDeleteButtonProps{
  onDelete:(arg:string)=>void;
  id:string;

}

export function ToDoItems(props:IToDoItemsProps) {
  const handleCheck = () => {
    props.onCheck(props.id);
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          id={props.id}
          className="border-gray-500 opacity-80 border-4 m-1"
          defaultChecked={props.completed}
          onClick={handleCheck}
        />
        {props.name}
      </label>
      <DeleteButton onDelete={props.onDelete} id={props.id} />
    </li>
  );
}

export function Modal(props:IModalProps) {

  const innerModalRef = useRef<HTMLDivElement|null>(null);

  function outsideModalCheck(event:React.MouseEvent<HTMLInputElement>) {
    const innerModal = innerModalRef.current;
    
    //If click was outside modal
    if (innerModal !== null){
      const clicked = event.target as Node;
      if (!innerModal.contains(clicked)) {
        props.onCloseRequested()
      }
    }
    
  }

  //z-50 class lays div on top, preventing clicks outside the modal
  return (
    <div
      className="bg-sky-700/20 w-screen h-screen z-50 fixed inset-0 flex items-center justify-center"
      id="outside-modal"
      onClick={outsideModalCheck}
    >
      <div className="bg-white p-6 m-2 rounded-md"
      ref={innerModalRef}>
        <header className=" grid grid-rows-1 grid-cols-4 mb-4">
          <h1>{props.headerLabel}</h1>
          <button
            className="col-start-4 justify-self-end text-gray-600"
            aria-label="Close"
            onClick={props.onCloseRequested}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </header>
        {props.children}
      </div>
    </div>
  );
}

export function AddTaskForm(props:IAddTaskFormProps) {
  let [textbox, setTextbox] = useState("");
  function handleTextbox(event:React.ChangeEvent<HTMLInputElement>) {
    const typed = event.target.value;
    setTextbox(typed);
  }

  function handleButtonClicked() {
    props.onNewTask(textbox); // onNewTask is from props
    setTextbox(""); //Reset the box to empty
  }
  return (
    <div className="group focus-within:group">
      <input
        className="p-2 border-2 border-solid border-gray-500 group-focus-within:outline-sky-700 group-focus-within:border-double rounded-md "
        placeholder="New task name"
        onChange={handleTextbox}
        value={textbox}
      />
      <button
        className="p-2 ml-3 text-white bg-sky-500/40 group-focus-within:bg-sky-500 hover:bg-sky-700 active:bg-sky-900 rounded-md"
        onClick={handleButtonClicked}
      >
        Add task
      </button>
    </div>
  );
}

export function DeleteButton(props:IDeleteButtonProps) {
  function handleDelete() {
    props.onDelete(props.id);
  }
  return (
    <button className="ml-10 mt-2 text-gray-600" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} title="delete button" />
    </button>
  );
}
