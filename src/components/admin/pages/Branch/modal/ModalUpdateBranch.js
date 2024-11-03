import { Form, Input, Modal, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function ModalUpdateBranch(props) {
  const {
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    branchData,
    fetchBranchList,
    BaseUrl,
    jwtToken,
    branchUpdateData,
    setBranchUpdateData,
  } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const { branchName, address, phone } = values;
    try {
      setLoading(true);
      const res = await axios.put(
        `${BaseUrl}/branchs/${branchUpdateData.id}`,
        { branchName, address, phone },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      notification.success({ message: res?.data?.message });
      fetchBranchList();
      handleCloseUpdateModal();
      setLoading(false);
    } catch (error) {
      notification.error({
        message: "Error to update branch",
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      branchName: branchUpdateData?.branchName,
      address: branchUpdateData?.address,
      phone: branchUpdateData?.phone,
    });
  }, [branchUpdateData]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setBranchUpdateData(null);
  };

  return (
    <>
      <Modal
        title="Update branch"
        centered
        open={isUpdateModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCloseUpdateModal}
        okText="Update"
        cancelText="Cancel"
        width={500}
        maskClosable={false}
        okButtonProps={{ loading }}
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
            <Input allowClear />
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
            <Input allowClear />
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

export default ModalUpdateBranch;
