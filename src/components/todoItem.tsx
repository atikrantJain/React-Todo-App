import moment from "moment";
import { BiPencil } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import "../index.css";

function TodoItem({ data, deleteTodo, editTodo }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 10,
        justifyContent: "space-between",
        padding: 5,
        flexDirection: "row",
        flex: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: 14,
            color: "#585858",
            paddingLeft: 10,
            fontWeight: 700,
            textDecorationLine:
              data.status === "completed" ? "line-through" : "none",
          }}
        >
          {data?.title}
        </p>
        <p style={{ fontSize: 14, color: "#585858", paddingLeft: 10 }}>
          {moment(data?.date).format("hh:mm a, DD/MM/YYYY")}
        </p>
      </div>
      <div
        style={{
          flex: 0.1,
          flexDirection: "row",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <button
          onClick={() => deleteTodo(data)}
          style={{
            background: "white",
            width: 30,
            height: 30,
            backgroundColor: "#EEEEEE",
            marginRight: 10,
            display: "flex", //add this
            justifyContent: "center", //add this
            alignItems: "center",
          }}
        >
          <RiDeleteBinLine
            style={{
              color: "black",
              position: "absolute",
            }}
          />
        </button>
        <button
          onClick={() => editTodo(data)}
          style={{
            background: "white",
            width: 30,
            height: 30,
            backgroundColor: "#EEEEEE",
            display: "flex", //add this
            justifyContent: "center", //add this
            alignItems: "center",
          }}
        >
          <BiPencil style={{ color: "black", position: "absolute" }} />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
