import React, { useEffect, useState } from "react";

import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  DatePicker,
  DatePickerProps,
  Select,
  Upload,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import SidebarAnimal from "../../../component/sidebarAnimal";
import ZooHeader from "../../../component/zoo.Hearder";

import { AnimalInterface } from "../../../interfaces/IAnimal";
import { SexsInterface } from "../../../interfaces/IAnimalSex";
import { ImageUpload } from "../../../interfaces/IUpload";
import { useNavigate } from "react-router-dom";
import {
  GetSexs,
  GetTypes,
  GetReproductions,
  CreateAnimal,
} from "../../../services/https/AnimalInfo/animal";
import { AnimalTypeInterface } from "../../../interfaces/IAnimalType";
import { AnimalReproductionTypeInterface } from "../../../interfaces/IReproductionType";

const { Option } = Select;

function AnimalCreate() {
  // const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [sexs, setSexs] = useState<SexsInterface[]>([]);
  const [types, setTypes] = useState<AnimalTypeInterface[]>([]);
  const [reproductions, setReproductions] = useState< AnimalReproductionTypeInterface[]
  >([]);

  const [profile, setProfile] = useState<ImageUpload>();
  const handleChange = (value: string) => {
    console.log(`select ${value}`);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onFinish = async (values: AnimalInterface) => {
    values.Animal_Profile = profile?.thumbUrl;
    console.log(values);
    let res = await CreateAnimal(values);
    console.log(res)
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });

      setTimeout(function () {
        // navigate("/customer");
      }, 2000);
    } else {
      console.log(res); // เพิ่มบรรทัดนี้เพื่อดูข้อความผลลัพธ์ที่คืนมา
    }
  };
  const getSex = async () => {
    let res = await GetSexs();
    if (res) {
      setSexs(res);
    }
  };

  const getType = async () => {
    let res = await GetTypes();
    if (res) {
      setTypes(res);
    }
  };

  const getReproduction = async () => {
    let res = await GetReproductions();
    if (res) {
      setReproductions(res);
    }
  };
  useEffect(() => {
    getSex();
    getType();
    getReproduction();
  }, []);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setProfile(e?.fileList[0]);
    return e?.fileList;
  };

  return (
    <div>
      {contextHolder}

      <Card>
        <h2>ลงทะเบียนนำเข้าสัตว์</h2>

        <Divider />

        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อทวินาม"
                name="Animal_Biomial_Name"
                rules={[
                  {
                    required: true,

                    message: "กรุณากรอกชื่อทวินาม !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อของสัตว์"
                name="Animal_Name"
                rules={[
                  {
                    required: true,

                    message: "กรุณาระบุชื่อของสัตว์ !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ถิ่นที่อยู่ในธรรมชาติ"
                name="Animal_Abode"
                rules={[
                  {
                    required: true,

                    message: "กรุณาระบุถิ่นที่อยู่ของสัตว์ !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="วันเกิด"
                name="Animal_Birthday_Date"
                rules={[
                  {
                    required: true,

                    message: "กรุณาระบุวันเกิด !",
                  },
                ]}
              >
                <DatePicker onChange={onChange} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="AnimalSexID"
                label="เพศ"
                rules={[{ required: true, message: "กรุณาระบุเพศของสัตว์ !" }]}
              >
                <Select allowClear onChange={handleChange}>
                  {sexs.map((item) => (
                    <Option
                      key={item.ID}
                      value={item.ID}
                    >
                      {item.Animal_Sex}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="AnimalTypeID"
                label="ประเภท"
                rules={[
                  { required: true, message: "กรุณาระบุประเภทของสัตว์ !" },
                ]}
              >
                <Select allowClear onChange={handleChange}>
                  {types.map((item) => (
                    <Option value={item.ID} key={item.ID}>
                      {item.Animal_Type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="ReproductionTypeID"
                label="ประเภทการสืบพันธุ์"
                rules={[
                  {
                    required: false,
                    message: "กรุณาระบุประเภทการสืบพันธุ์ !",
                  },
                ]}
              >
                <Select allowClear onChange={handleChange}>
                  {reproductions.map((item) => (
                    <Option
                      value={item.ID}
                      key={item.ID}
                    >
                      {item.Reproductiontype}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="วันที่ลงทะเบียน"
                name="Animal_Register_Date"
                rules={[
                  {
                    required: true,

                    message: "กรุณาระบุวันที่ลงทะเบียน !",
                  },
                ]}
              >
                <DatePicker onChange={onChange} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                style={{}}
                label="รูปของสัตว์"
                name="Animal_Proflie"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload maxCount={1} multiple={false} listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>อัพโหลด</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>

            <Row justify="end">
              <Col style={{ marginTop: "40px" }}>
                <Form.Item>
                  <Space>
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                      ยกเลิก
                    </Button>

                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<PlusOutlined />}
                    >
                      ยืนยัน
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default AnimalCreate;
