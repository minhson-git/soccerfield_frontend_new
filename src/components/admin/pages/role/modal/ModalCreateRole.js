import { Button, Form, Input, Modal, notification } from "antd";
import axios from "axios";
import { useState } from "react";

function ModalCreateRole({
  isOpen,
  setIsOpen,
  BaseUrl,
  jwtToken,
  fetchRoleList,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const name = values;
    try {
      setLoading(true);
      const res = await axios.post(`${BaseUrl}/roles`, name, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (res?.data?.statusCode === 201) {
        notification.success({ message: res?.data?.message });
        setLoading(false);
        fetchRoleList();
        onCloseModal();
      }
    } catch (error) {
      notification.error({ message: res?.data?.message });
    }
  };

  const onCloseModal = () => {
    form.resetFields();
    setIsOpen(false);
  };

  return (
    <>
      <Button size="middle" type="primary" onClick={() => setIsOpen(true)}>
        Create new role
      </Button>
      <Modal
        title="Create new role"
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter new role",
              },
            ]}
          >
            <Input allowClear placeholder="Enter new role" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalCreateRole;
