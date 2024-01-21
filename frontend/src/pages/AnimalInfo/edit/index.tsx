import {
  Button,
  Card,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  message,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import {
  GetSexs,
  GetAnimal,
  GetReproductions,
  GetTypes,
  GetAnimalById,
  UpdateAnimal,
} from "../../../services/https/AnimalInfo/animal";



import { AnimalInterface } from "../../../interfaces/IAnimal";
import { SexsInterface } from "../../../interfaces/IAnimalSex";
import { AnimalTypeInterface } from "../../../interfaces/IAnimalType";
import { AnimalReproductionTypeInterface } from "../../../interfaces/IReproductionType";
import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import Dayjs from "dayjs";
import { ImageUpload } from "../../../interfaces/IUpload";

const { Option } = Select;

function AnimalEdit() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [animal, setAnimal] = useState<AnimalInterface[]>([]);
  const [sexs, setSexs] = useState<SexsInterface[]>([]);
  const [types, setTypes] = useState<AnimalTypeInterface[]>([]);
  const [reproductions, setReproductions] = useState<
    AnimalReproductionTypeInterface[]
  >([]);
  const [profile, setProfile] = useState<ImageUpload>();
  const [prevAnimalProfile, setAnimalProflie] = useState<string | undefined>();

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  
  const handleChange = (value: string) => {
    console.log(`select ${value}`);
  };

  let { id } = useParams();
  const [form] = Form.useForm();

  const onFinish = async (values: AnimalInterface) => {
    values.ID = Number(id);
    values.Animal_Profile = profile?.thumbUrl;
    // if (values.Animal_Profile === undefined) {
    //   if (Array.isArray(animal) && animal.length > 0) {
    //     // Access 'Animal_Profile' property on the first element of the array
    //     values.Animal_Profile = animal[0]?.Animal_Profile;
    //   }
    // };
    if(!values.Animal_Profile){
      values.Animal_Profile = prevAnimalProfile;
    }
    console.log(values);
    let res = await UpdateAnimal(values);
    console.log("Input" ,res);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/AnimalInfo");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  const getAnimalById = async () => {
    let res = await GetAnimalById(Number(id));
    console.log(res);
    if (res) {
      setAnimal(res);
      setAnimalProflie(res.Animal_Profile);
      form.setFieldsValue({
        ID: res.ID,
        Animal_Name: res.Animal_Name,
        Animal_Biomial_Name: res.Animal_Biomial_Name,
        Animal_Abode: res.Animal_Abode,
        Animal_Birthday_Date: Dayjs(res.Animal_Birthday_Date),
        AnimalSexID: res.AnimalSexID,
        AnimalTypeID: res.AnimalTypeID,
        ReproductionTypeID: res.ReproductionTypeID,
        Animal_Register_Date: Dayjs(res.Animal_Register_Date),
        // Animal_Profile: res.Animal_Profile,
      });
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
    getAnimalById();
  }, []);

  

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setAnimalProflie(e?.fileList[0])
    return e?.fileList;
  };

  return (
    <div>
      {contextHolder}

      <Card>
        <h2>แก้ไขข้อมูลสัตว์</h2>

        <Divider />

        <Form
          form={form}
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
                    <Option key={item.ID} value={item.ID}>
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
                    <Option value={item.ID} key={item.ID}>
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

export default AnimalEdit;
