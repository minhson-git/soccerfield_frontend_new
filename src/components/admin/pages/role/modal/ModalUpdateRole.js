import { Form, Input, Modal, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function ModalUpdateRole({
  BaseUrl,
  jwtToken,
  fetchRoleList,
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  roleUpdateData,
  setRoleUpdateData,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: roleUpdateData?.name,
    });
  }, [roleUpdateData]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${BaseUrl}/roles/${roleUpdateData.id}`,
        { name: values.name },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      notification.success({ message: res?.data?.message });
      fetchRoleList();
      onCloseModal();
      setLoading(false);
      setIsUpdateModalOpen(false);
    } catch (error) {
      notification.error({ message: res?.data?.message });
    }
  };

  const onCloseModal = () => {
    form.resetFields();
    setRoleUpdateData();
    setIsUpdateModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Update role"
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
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

export default ModalUpdateRole;
