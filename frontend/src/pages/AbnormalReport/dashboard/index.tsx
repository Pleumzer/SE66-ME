import React, { useState, useEffect } from "react";

import { Space, Table, Button, Col, Row, Divider, message, Modal } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";
import { GetAbnormal,DeleteAbnormalByID } from "../../../services/https/AnimalInfo/animal";

import { Link } from "react-router-dom";
import { AbnormalReportInterface } from "../../../interfaces/IAbnormalReport";

import { EditOutlined,DeleteOutlined } from "@ant-design/icons";


function AbnormalReport() {
  const columns: ColumnsType<AbnormalReportInterface> = [
    {
      title: "ลำดับที่",
  
      dataIndex: "ID",
  
      key: "id",
      render: (text, record, index) => index + 1,
    },
  
    {
      title: "รูปสัตว์ที่มีอาการ",
      dataIndex: "Animal_Profile",
      key: "profile",
      render: (text, record, index) => (
        <img src={record.AbnormalAnimalPic} alt={record.AbnormalAnimalPic}
         className="w3-left w3-circle w3-margin-right"
         style={{maxWidth: "50%", maxHeight: "50%", borderRadius: "25%" }} />
      )
    },
  
    
    {
      title: "ชื่อของสัตว์ที่มีอาการผิดปกติ",
  
      dataIndex: "Animal",
  
      key: "abnormalAnimalName",
      render: (item) => Object.values(item.Animal_Name),
    },
  
    {
      title: "รายละเอียดอาการ",
  
      dataIndex: "AbnormalDetail",
  
      key: "abnormalDetail",
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
  
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
  const [abnormals, setAbnormal] = useState<AbnormalReportInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [modalText, setModalText] = useState<String>();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<Number>();
  const [confirmLoading, setConfirmLoading] = useState(false);



  const showModal = (val: AbnormalReportInterface) => {
    setModalText(
      `คุณต้องการลบข้อมูล "${val.Animal?.Animal_Name}" หรือไม่ ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteAbnormalByID(deleteId);
    console.log(res.message);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getAbnormals();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };



  const getAbnormals = async () => {
    let res = await GetAbnormal();
    console.log(res);
    if(res) {
      setAbnormal(res);
    }
  }
  
  const handleCancel = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    getAbnormals();
  }, []);

  return (
    <>
        {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลสัตว์ที่มีอาการผิดปกติ</h2>
        </Col>

        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/CreateAbnormalReport">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้างข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>

      <Divider />

      <div >
          <Table rowKey="ID" columns={columns} dataSource={abnormals} />
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

export default AbnormalReport;
