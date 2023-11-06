import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { TodoData } from "../screens/Home";

const style: any = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#ECEDF6",
  padding: 20,
};

export default function BasicModal({
  openModal,
  handleClose,
  type,
  data,
  addTasks,
}: {
  openModal: boolean;
  handleClose: (e: any) => void;
  type: string;
  data: TodoData | null | any;
  addTasks: (e: any) => void;
}) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setTitle(type === "Update" ? data?.title : "");
    setStatus(type === "Update" ? data?.status : "");
  }, [type, data, openModal]);

  return (
    <div>
      <Modal
        open={openModal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              backgroundColor: "#EEEEEE",
              width: 40,
              height: 40,
              right: 0,
              top: -50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImCross
              style={{
                position: "absolute",
                color: "black",
                fontSize: 14,
              }}
            />
          </button>
          <form>
            <h2 style={{ color: "grey" }}>
              {type === "Add" ? "Add TODO" : "Update TODO"}
            </h2>
            <label
              style={{ color: "#646681", marginTop: 10, marginBottom: 10 }}
            >
              <span style={{ marginBottom: 10 }}>Title</span>
              <br />
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                style={{
                  color: "black",
                  width: "98%",
                  background: "white",
                  border: 0,
                  height: 40,
                  paddingLeft: 10,
                  marginBottom: 10,
                  borderRadius: 5,
                }}
                type="text"
                name="title"
              />
            </label>
            <label
              style={{ color: "#646681", marginTop: 10, marginBottom: 10 }}
            >
              <span style={{ marginBottom: 10 }}>Status</span>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                style={{
                  width: "100%",
                  background: "white",
                  color: "black",
                  height: 40,
                  borderRadius: 5,
                  borderWidth: 0,
                }}
              >
                <option value="" style={{ color: "black" }}>
                  Please select Status
                </option>
                <option value="incompleted" style={{ color: "black" }}>
                  Incompleted
                </option>
                <option value="completed" style={{ color: "black" }}>
                  Completed
                </option>
              </select>
            </label>
            <button
              onClick={() =>
                addTasks({
                  title: title,
                  status: status,
                  type: type,
                  ...(type !== "Add" && { id: data.id }),
                })
              }
              className="todoButton"
              type="button"
              style={{ alignSelf: "flex-start", marginTop: 20 }}
            >
              {type === "Add" ? "Add Task" : "Update Task"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
