import { Button, Form, Input, Modal, notification } from "antd";
import axios from "axios";
import { useState } from "react";

function ModalCreateBranch({
  isOpen,
  setIsOpen,
  fetchBranchList,
  BaseUrl,
  jwtToken,
}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { branchName, address, phone } = values;

    const data = {
      branchName,
      address,
      phone,
    };
    try {
      setLoading(true);
      const res = await axios.post(`${BaseUrl}/branchs`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (res?.data?.statusCode === 201) {
        notification.success({
          message: res.data.message,
        });
        onCloseModal();
      }
      setLoading(false);
    } catch (error) {
      notification.error("Error to create branch");
    }
  };

  const onCloseModal = () => {
    fetchBranchList();
    form.resetFields();
    setIsOpen(false);
  };

  return (
    <>
      <Button size="middle" type="primary" onClick={() => setIsOpen(true)}>
        Create new branch
      </Button>
      <Modal
        title="Create new branch"
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
            label="Branch Name"
            name="branchName"
            rules={[
              {
                required: true,
                message: "Please enter branch name",
              },
            ]}
          >
            <Input allowClear placeholder="Enter new branch name" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter address",
              },
            ]}
          >
            <Input allowClear placeholder="Enter new address" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "A value must be number",
                pattern: new RegExp(/^[0-9]+$/),
              },
            ]}
          >
            <Input placeholder="0391234567" allowClear maxLength={10} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalCreateBranch;
