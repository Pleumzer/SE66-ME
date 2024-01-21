import React, { useState, useEffect } from "react";

import { Space, Table, Button, Col, Row, Divider, message, Modal } from "antd";

import { PlusOutlined,EditOutlined,DeleteOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

import { GetAnimal,DeleteAnimalByID } from "../../../services/https/AnimalInfo/animal";
import { AnimalInterface } from "../../../interfaces/IAnimal";

import { Link, useNavigate } from "react-router-dom";

function AnimalInfo() {
  
  const columns: ColumnsType<AnimalInterface> = [
    {
      title: "ลำดับที่",
  
      dataIndex: "ID",
  
      key: "id",
      render: (text, record, index) => index + 1,
    },
  
    {
      title: "รูปประจำตัว",
      dataIndex: "Animal_Profile",
      key: "profile",
      render: (text, record, index) => (
        <img src={record.Animal_Profile}
         className="w3-left w3-circle w3-margin-right"
         style={{maxWidth: "50%", maxHeight: "50%", borderRadius: "25%" }} />
      )
    },
  
    {
      title: "ชื่อของสัตว์",
  
      dataIndex: "Animal_Name",
  
      key: "animalname",
    },
  
    {
      title: "ถิ่นที่อยู่อาศัย",
  
      dataIndex: "Animal_Abode",
  
      key: "animalabode",
    },
  
    {
      title: "เพศ",
  
      dataIndex: "AnimalSex",
  
      key: "animalsex",
      render: (item) => Object.values(item.Animal_Sex),
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button  onClick={() =>  navigate(`AnimalEdit/${record.ID}`)} shape="circle" icon={<EditOutlined />} size={"large"} />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },

  ];

  const navigate = useNavigate();

  const [animals,setAnimal] = useState<AnimalInterface[]>([]);

  const [messageApi,contextHolder] = message.useMessage();
  const [modalText, setModalText] = useState<String>();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<Number>();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const getAnimals = async () => {
    let res = await GetAnimal();
    console.log(res);
    if (res) {
      setAnimal(res);
    }
  };

  console.log(animals);

  const showModal = (val: AnimalInterface) => {
    setModalText(
      `คุณต้องการลบข้อมูล "${val.Animal_Name}" หรือไม่ ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteAnimalByID(deleteId);
    console.log(res.status);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getAnimals();
    } else {
      console.log(res);
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  useEffect(() => {
    getAnimals();
  }, []);
  return(
    <>
      {contextHolder}
        <Row>
          <Col span={12}>
          <h2 style={{marginLeft: "5px" }}>ข้อมูลสัตว์ทั้งหมด</h2>
          </Col>
          <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
            <Space>
              <Link to="/CreateAnimal">
                <Button style={ {marginRight: "5px" }} type="primary" icon={<PlusOutlined />}>
                  สร้างข้อมูล
                </Button>
              </Link>
            </Space>
          </Col>
        </Row>
        <Divider />
        <div >
          <Table rowKey="ID" columns={columns} dataSource={animals} />
        </div>
        <Modal
        title="ลบข้อมูล ?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
    </>
  );









}

export default AnimalInfo;
