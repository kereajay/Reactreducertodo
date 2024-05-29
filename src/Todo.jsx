import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { todocontext } from "./App";
import { toast } from "react-toastify";
const Todo = () => {
  const [inputval, setInputval] = useState("");
  const [edittext, setEdittext] = useState("");
  const [editid, setEditid] = useState("");
  const { state, dispatch } = useContext(todocontext);

  const [display, setDisplay] = useState([]);
  const [searchtodo, setSearchtodo] = useState("");

  useEffect(() => {
    setDisplay(state.todos);
  });
  const addtodo = () => {
    if (inputval === "") {
      toast.error("input field cannot be empty", {});
      return;
    }
    // setDisplay([...state.todos]);
    setInputval("");
    dispatch({
      type: "addtodo",
      payload: { name: inputval, id: uuidv4(), ischecked: false },
    });
    toast.success("Todo added successfully", {
      position: "top-left",
      autoClose: 2000,
    });
  };

  const deletetodo = (id) => {
    //   setDisplay([...state.todos]);
    dispatch({ type: "deletetodo", payload: id });
  };
  //   const handleedit=(item)=>{
  //     dispatch({type:"edittodo",payload:item})
  //   }
  // const edittodo=()=>{
  //     dispatch({type:"edittodo",payload:edittext})
  // }
  const handleedit = (id, name) => {
    // console.log(id)
    // console.log(name)
    setEditid(id);
    // console.log(item.name)
    setEdittext(name);
    // dispatch({ type: "edittodo", payload: item.id })
    // dispatch({ type: "edittodo", payload: edittext })
  };
  const saveedit = (id) => {
    // console.log(editid)
    dispatch({ type: "edittodo", payload: { id: id, name: edittext } });
    setEditid(null);
    setEdittext("");
    // console.log("clicked")
  };
  const handlelinwthrough = (id) => {
    dispatch({ type: "checktodo", payload: id });
  };
  // const Searchtododisplay = (e) => {
  //     setSearchtodo(e.target.value)
  //     console.log(searchtodo)
  //     const upadtedisplay = state.todos.filter((item) => {
  //         return item.name.toLowerCase().includes(searchtodo.toLowerCase())
  //     })
  //     console.log(upadtedisplay)
  //     setDisplay(upadtedisplay)
  // }
  // console.log(display)
  return (
    <>
      <h1 className="text-center text-3xl font-semibold mt-10">
        Todo's for bettre life
      </h1>
      <div className="w-[35%] bg-white mt-10 m-auto  ">
        <input
          type="text"
          onChange={(e) => setInputval(e.target.value)}
          className="w-[87%] py-1 outline-none"
          value={inputval}
          placeholder="Add Todo.."
        />
        <button onClick={addtodo} className="bg-blue-400 w-[13%] py-1.5">
          Add
        </button>
      </div>
      <br />

      <div className="flex justify-center">
        {display.length > 0 && (
          <input
            type="search"
            onChange={(e) => setSearchtodo(e.target.value)}
            className="w-[25%] outline-none py-2 rounded-3xl px-2"
            placeholder="Search"
          />
        )}
      </div>
      <div className="">
        {display
          .filter((item) =>
            item.name.toLowerCase().includes(searchtodo.toLowerCase())
          )
          .map((item) => {
            return (
              <div
                key={item.id}
                className="w-[35%] bg-white m-auto mt-10 flex  py-1"
              >
                <input
                  type="checkbox"
                  className="ml-2"
                  onChange={() => handlelinwthrough(item.id)}
                  checked={item.ischecked}
                />
                {editid === item.id ? (
                  <input
                    type="text"
                    value={edittext}
                    onChange={(e) => setEdittext(e.target.value)}
                    className="w-[70%] ml-2 outline-none py-1"
                  />
                ) : (
                  <h1
                    className={`${
                      item.ischecked ? "line-through" : ""
                    }  w-[70%] ml-2 py-1  `}
                  >
                    {item.name}
                  </h1>
                )}

                {editid === item.id ? (
                  <button onClick={() => saveedit(item.id)} className="w-[15%]">
                    ✅
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleedit(item.id, item.name)}
                    className="w-[15%]"
                  >
                    📝
                  </button>
                )}
                <button className="w-[15%]" onClick={() => deletetodo(item.id)}>
                  ❌
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Todo;
