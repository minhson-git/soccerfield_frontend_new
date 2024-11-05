import { Button, Form, Input, Modal, notification, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function ModalUpdateField({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  BaseUrl,
  jwtToken,
  fetchFieldList,
  fieldUpdateData,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      branchId: fieldUpdateData?.branch?.branchName,
      fieldType: fieldUpdateData?.fieldType,
      pricePerHour: fieldUpdateData?.pricePerHour,
    });
  }, [fieldUpdateData]);

  const onFinish = async (values) => {
    const { fieldType, pricePerHour } = values;

    const data = {
      fieldType,
      pricePerHour,
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `${BaseUrl}/fields/${fieldUpdateData?.fieldId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      notification.success({
        message: res?.data?.message,
      });
      onCloseModal();
      setLoading(false);
    } catch (error) {
      notification.error({ message: res?.data?.message });
    }
  };

  const onCloseModal = () => {
    fetchFieldList();
    form.resetFields();
    setIsUpdateModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Create new field"
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
            label="Branch Name"
            name="branchId"
            rules={[
              {
                required: true,
                message: "Please choose branch",
              },
            ]}
          >
            <Select disabled />
          </Form.Item>

          <Form.Item
            label="Field Type"
            name="fieldType"
            rules={[
              {
                required: true,
                message: "Please enter field type",
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="Price Per Hour"
            name="pricePerHour"
            rules={[
              {
                required: true,
                message: "Price must be number",
                pattern: new RegExp(/^[0-9]+$/),
              },
            ]}
          >
            <Input placeholder="20000" allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalUpdateField;
