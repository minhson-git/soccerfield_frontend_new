import { Button, Form, Input, Modal, notification, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function ModalUpdateUser({
  BaseUrl,
  jwtToken,
  fetchUserList,
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  userUpdateData,
  setUserUpdateData,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      citizenId: userUpdateData?.citizenId,
      username: userUpdateData?.username,
      email: userUpdateData?.email,
      fullname: userUpdateData?.fullname,
      phone: userUpdateData?.phone,
    });
  }, [userUpdateData]);

  const onFinish = async (values) => {
    const { citizenId, email, fullname, phone, username } = values;
    const data = { citizenId, email, fullname, phone, username };

    try {
      setLoading(true);
      const res = await axios.put(
        `${BaseUrl}/users/${userUpdateData.userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      notification.success({ message: res?.data?.message });
      fetchUserList();
      onCloseModal();
      setLoading(false);
      setIsUpdateModalOpen(false);
    } catch (error) {
      setLoading(false)
      notification.error({ message: error?.response?.data?.message });
    }
  };

  const onCloseModal = () => {
    form.resetFields();
    setUserUpdateData();
    setIsUpdateModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Update user"
        centered
        open={isUpdateModalOpen}
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
            <Input allowClear />
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
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter email",
              },
            ]}
          >
            <Input allowClear />
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
            <Input allowClear />
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
            <Input allowClear maxLength={10} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalUpdateUser;
