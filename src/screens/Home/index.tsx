import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "../../components/todoItem";
import TodoModal from "../../components/todoModal";
import { addTodo, deleteTodo, updateTodo } from "../../redux/todoSlice";
import "./index.css";

interface State {
  todo: {
    tasks: [];
  };
}

interface TodoData {
  id: string;
  title: string;
  status: string;
  type?: string;
}

function Home() {
  const [isModalOpen, setIsModalOPen] = useState(false);
  const [taskType, setTaskType] = useState("Add");
  const [todoDataSelected, setTodoDataSelected] = useState<TodoData | null>(
    null
  );
  const [filterSelected, setFilterSelected] = useState("All");

  const filters = ["All", "Incompleted", "Completed"];
  const todos = useSelector((state: State) => state.todo.tasks);

  const dispatch = useDispatch();

  const onOptionChangeHandler = (event: any) => {
    setFilterSelected(event.target.value);
  };

  const todosFilteredList = () => {
    const data: Array<TodoData> = [...todos];
    if (filterSelected === "Incompleted") {
      return data.filter((e) => e.status === "incompleted");
    } else if (filterSelected === "Completed") {
      return data.filter((e) => e.status === "completed");
    } else {
      return data;
    }
  };

  // const { data, error, isLoading } = useFetchMoviesList(
  //   "https://api.sampleapis.com/movies/animation"
  // );

  const isLoading = false;

  const LoadingScreen = () => {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="container">
          <div
            style={{
              width: "50%",
              marginTop: 20,
              flexDirection: "column",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
            }}
          >
            <h1 style={{ marginBottom: 40 }} className="headerTitle">
              TODO LIST
            </h1>
            <div
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                flex: 1,
              }}
            >
              <button
                onClick={() => {
                  setIsModalOPen(true);
                  setTaskType("Add");
                }}
                className="todoButton"
                type="button"
                style={{ alignSelf: "flex-start" }}
              >
                Add Tasks
              </button>
              <select
                onChange={onOptionChangeHandler}
                style={{
                  height: 40,
                  width: 125,
                  borderRadius: 5,
                }}
                name="taskFilter"
                id="tasksFilter"
              >
                {filters.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div
              style={{
                backgroundColor: "#ECEDF6",
                marginTop: 20,
                borderRadius: 8,
                padding: 10,
              }}
            >
              <>
                {todosFilteredList()?.length > 0 ? (
                  <>
                    {todosFilteredList()?.map((item, index) => {
                      return (
                        <TodoItem
                          key={index}
                          data={item}
                          editTodo={(e: TodoData) => {
                            const data = {
                              id: e.id,
                              title: e.title,
                              status: e.status,
                            };
                            setTaskType("Update");
                            setTodoDataSelected(data);
                            setIsModalOPen(true);
                          }}
                          deleteTodo={(e: TodoData) => {
                            const data = {
                              id: e.id,
                              title: e.title,
                              status: e.status,
                            };
                            dispatch(deleteTodo(data));
                          }}
                        />
                      );
                    })}
                  </>
                ) : (
                  <div style={{ alignSelf: "center" }}>
                    <p
                      style={{
                        color: "#585858",
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      No Todos
                    </p>
                  </div>
                )}
              </>
            </div>
          </div>
          <TodoModal
            openModal={isModalOpen}
            handleClose={() => {
              setIsModalOPen(false);
            }}
            addTasks={(e: TodoData) => {
              if (e.title == "" || e.status === "") {
                alert("Please add task details");
              } else {
                const data = {
                  id: e.type === "Update" ? e.id : nanoid(),
                  title: e.title,
                  status: e.status,
                };
                e.type === "Update"
                  ? dispatch(updateTodo(data))
                  : dispatch(addTodo(data));

                setIsModalOPen(false);
                setTaskType("");
              }
            }}
            type={taskType}
            data={todoDataSelected ? todoDataSelected : null}
          />
        </div>
      )}
    </>
  );
}
export default Home;
