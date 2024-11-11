import { Button, Form, Input, Modal, notification, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function ModalCreateUser({
  isOpen,
  setIsOpen,
  BaseUrl,
  jwtToken,
  fetchUserList,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const { citizenId, email, fullname, password, phone, username } = values;
    const data = { citizenId, email, fullname, password, phone, username };
    try {
      setLoading(true);
      const res = await axios.post(`${BaseUrl}/users`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (res?.data?.statusCode === 201) {
        notification.success({ message: res?.data?.message });
        setLoading(false);
        fetchUserList();
        onCloseModal();
      }
    } catch (error) {
      setLoading(false)
      notification.error({ message: error?.response?.data?.message });
    }
  };

  const onCloseModal = () => {
    form.resetFields();
    setIsOpen(false);
  };

  return (
    <>
      <Button size="middle" type="primary" onClick={() => setIsOpen(true)}>
        Create new user
      </Button>
      <Modal
        title="Create new user"
        centered
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={onCloseModal}
        okText="Save"
        cancelText="Cancel"
        width={500}
        maskClosable={false}
        okButtonProps={{ loading }}
        forceRender
      >
        <Form form={form} onFinish={onFinish} layout="horizontal">
          <Form.Item
            label="Citizen Number"
            name="citizenId"
            rules={[
              {
                required: true,
                message: "Please enter your citizen number",
              },
            ]}
          >
            <Input allowClear placeholder="Enter your citizen number" />
          </Form.Item>

          <Form.Item
            label="User Name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter user name",
              },
            ]}
          >
            <Input allowClear placeholder="Enter your user name" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter email",
              },
              {
                type: "email",
                message: "The input is not valid email!",
                pattern: new RegExp(
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ),
              },
            ]}
          >
            <Input allowClear placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please enter full name",
              },
            ]}
          >
            <Input allowClear placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "phone must be number",
                pattern: new RegExp(/^[0-9]+$/),
                max: 10,
              },
            ]}
          >
            <Input
              allowClear
              maxLength={10}
              placeholder="Enter your full name"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalCreateUser;
