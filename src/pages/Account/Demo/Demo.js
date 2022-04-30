import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from "antd";
import { UploadOutlined, InboxOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import Input from "antd/lib/input/Input";
import { useState } from "react";
import "./Demo.css";


const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 10 },
};

// const formData = new FormData();
const normFile = (e) => {
  console.log("Upload event:", e);
  // fetch(endpoint), {
  //   method: "post",
  //   body: formData
  // }
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const Demo = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const [age, setAge] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(localStorage.getItem("LoginValue"));
  return (
    <Form
      // name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      
    >
      <Form.Item label="Логин">
        {isEdit ? (
          <>
          <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{ width: 400 }}/>
          <Button onClick={() => setIsEdit(false)}><CheckOutlined /></Button>
          </>
        ) : (
          <>
          <span className="ant-form-text" style={{ width: 400 }}>
            {inputValue}
            
          </span>
          <Button onClick={() => setIsEdit(true)}><EditOutlined /></Button>
          
          </>
        )}
        {/* <Input value={localStorage.getItem("LoginValue")}/> */}
      </Form.Item>

      <Form.Item
        name="select"
        label="Выберите"
        // hasFeedback
        rules={[{  message: "Пожалуйста, выберите страну!" }]}
        // required: true,
      >
        <Select
          style={{ width: 450 }}
          placeholder="Пожалуйста, выберите страну"
        >
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
          <Option value="russia">Russia</Option>
        </Select>
      </Form.Item>
      <Form.Item name="slider" label="Возраст"  value={age.toString()}>
        <Row >
          <Col span={17} >
            <Slider
              min={1}
              max={99}
              value={typeof age === "number" ? age : 0}
              onChange={(age) => setAge(age)}
            />
          </Col>
          <Col span={4}> 
            <InputNumber
              min={1}
              max={99}
              style={{ margin: "0 16px" }}
              value={age.toString()}
              onChange={(age) => setAge(age.toString())}
            />
          </Col>
        </Row>
      </Form.Item>
      <Form.Item name="radio-group" label="Пол" >
        
        <Radio.Group>
          <Radio value="a">М</Radio>
          <Radio value="b">Ж</Radio>
        </Radio.Group>
      </Form.Item>

      {/* <Form.Item
        name="upload"
        label="Аватарка"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Загрузить аватарку"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item> */}

      <Form.Item label="Аватарка">
        {/* <Row style={{ width: 450 }}> */}
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
            
          >
            <Upload.Dragger name="files" action="/upload.do" style={{ width: 450 }}>
              {/*  style={{ width: 350 }} */}
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Нажмите или перетащите файл в эту область для загрузки
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
          {/* <img className="avatar" src={avatar} alt=""  /> */}
        {/* </Row> */}
      </Form.Item>

      {/* <Form.Item name="switch" label="Switch" valuePropName="checked">
        <Switch />
      </Form.Item> */}
      <Form.Item wrapperCol={{ span: 12, offset: 9 }}>
        <Button type="primary" htmlType="submit">
          Сохранить изменения
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
