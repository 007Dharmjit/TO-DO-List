import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const App = () => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [taskObj, setTaskObj] = useState([]);
  const [refresh, setRefresh] = useState(false);


//Add Data to DB 
  const dataSubmited = (e) => {
    e.preventDefault();
    const date = new Date();
    const currentTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    axios
      .post("http://localhost:3001/add", {
        task: task,
        desc: desc,
        time: currentTime,
      })
      .then(() => {
        setRefresh((prev) => !prev); // Refresh task list after adding
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
    setDesc("");
    setTask("");
  };
  

  //Fetch Data of All Task from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Data");
        setTaskObj(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [refresh]);
  

   //Delete Task
   const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setRefresh((prev) => !prev); // Refresh task list after deleting
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <nav className=" bg-zinc-800 py-3 px-2 flex justify-center">
        <div className=" text-4xl font-semibold">TO-DO LIST</div>
      </nav>

      <div className=" flex justify-center p-3 mt-10">
        <form
          onSubmit={dataSubmited}
          className="flex flex-col space-y-3 w-[300px]"
        >
          <input
            type="text"
            value={task}
            required
            onChange={(e) => {
              setTask(e.target.value);
            }}
            name="task"
            placeholder="Enter task"
            className="bg-zinc-700 outline-none px-3 py-2 rounded"
          />
          <textarea
            value={desc}
            name="description"
            placeholder="Enter Description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            className="bg-zinc-700 outline-none px-3 py-2 rounded"
          ></textarea>
          <input
            type="submit"
            placeholder="Add Task"
          className="cursor-pointer bg-purple-600 outline-none px-3 py-2 rounded hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
          />
        </form>
      </div>

      <div className=" flex justify-center mt-10 text-3xl">TASK LIST</div>

      <div className=" flex flex-row  gap-5 p-10">
        {taskObj.length > 0 ? (
          taskObj.map((items) => (
            <div
              key={items._id}
              className=" bg-zinc-800 h-fit w-fit rounded p-5 mt-5"
            >
              <div className=" flex items-center flex-col ">
                <h1 className="  text-2xl">{items.Task.toUpperCase()}</h1>
                <h2 className=" mt-3 text-xl">{items.Desc}</h2>
              </div>
              <div className=" mt-3 flex  gap-4 justify-between">
                <MdDelete
                  color="red"
                  className=" cursor-pointer"
                  size={18}
                  onClick={() => handleDelete(items._id)}
                />
                <h2 className=" text-sm text-blue-500 ">{items.time}</h2>
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl text-gray-500">No tasks available. Please add a task.</p>
        )}
      </div>
    </>
  );
};

export default App;
