import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { ImageUpload } from "../../../interfaces/IUpload";
import { AbnormalReportInterface } from "../../../interfaces/IAbnormalReport";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { GetAnimal } from "../../../services/https/AnimalInfo/animal";
import { AnimalInterface } from "../../../interfaces/IAnimal";
import { CreateAbnormalReport } from "../../../services/https/AnimalInfo/animal";

const { Option } = Select;
function AbnormalReportCreate() {
  const [messageApi, contextHolder] = message.useMessage();
  const [abnormalpic, setAbnormalPic] = useState<ImageUpload>();
  const [animals, setAnimals] = useState<AnimalInterface[]>([]);
  const handleChange = (value: string) => {
    console.log(`select ${value}`);
  };
  const [form] = Form.useForm();

  const onFinish = async (values: AbnormalReportInterface) => {
    values.AbnormalAnimalPic = abnormalpic?.thumbUrl;
    console.log(values);
    let res = await CreateAbnormalReport(values);
    console.log(res);
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

  const getAnimal = async () => {
    let res = await GetAnimal();
    if (res) {
      setAnimals(res);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setAbnormalPic(e?.fileList[0]);
    return e?.fileList;
  };

  useEffect(() => {
    getAnimal();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>แจ้งสัตว์ป่วย</h2>
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
                style={{}}
                label="รูปของสัตว์ที่มีอาการ"
                name="AbnormalAnimalPic"
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

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="AnimalID"
                label="ชื่อของสัตว์ที่ป่วย"
                rules={[{ required: true, message: "กรุณาระบุเพศของสัตว์ !" }]}
              >
                <Select allowClear onChange={handleChange}>
                  {animals.map((item) => (
                    <Option key={item.ID} value={item.ID}>
                      {item.Animal_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={30} sm={30} md={24} lg={24} xl={12}>
              <Form.Item
                label="รายละเอียดอาการป่วยที่พบ"
                name="AbnormalDetail"
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

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row justify="end">
                <Col>
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
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
export default AbnormalReportCreate;
