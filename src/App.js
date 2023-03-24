import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./App.css";

function App() {
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "abc",
      email: "abc@gmail.com",
      address: "abc address",
    },
    {
      id: 2,
      name: "xyz",
      email: "xyz@gmail.com",
      address: "xyz address",
    },
    {
      id: 3,
      name: "mno",
      email: "mno@gmail.com",
      address: "mno address",
    },
    {
      id: 4,
      name: "pqr",
      email: "pqr@gmail.com",
      address: "pqr address",
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "id",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Action",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                handleUpdate(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                handleDelete(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  function handleAdd() {
    const randomNumber = parseInt(Math.random() * 100);
    const newStudent = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "address " + randomNumber,
    };

    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  }

  function handleDelete(record) {
    Modal.confirm({
      title: "are you sure, you want to delete this student record ??",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  }

  function handleUpdate(record) {
    setEdit(true);
    setUpdate({ ...record });
  }

  function handleEdit() {
    setEdit(false);
    setUpdate(null);
  }

  return (
    <div className="App">
      <Button onClick={handleAdd}>Add a new students</Button>
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        title="Edit student"
        visible={edit}
        onCancel={() => {
          handleEdit();
        }}
        onOk={() => {
          setDataSource((pre) => {
            return pre.map((student) => {
              if (student.id === update.id) {
                return update;
              } else {
                return student;
              }
            });
          });
          handleEdit();
        }}
        okText="Save"
      >
        <Input
          value={update?.name}
          onChange={(e) => {
            setUpdate((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        <Input
          value={update?.email}
          onChange={(e) => {
            setUpdate((pre) => {
              return { ...pre, email: e.target.value };
            });
          }}
        />
        <Input
          value={update?.address}
          onChange={(e) => {
            setUpdate((pre) => {
              return { ...pre, address: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
