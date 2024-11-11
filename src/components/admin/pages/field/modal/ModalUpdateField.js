import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
} from "antd";
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
      status:
        fieldUpdateData.status === true || fieldUpdateData.status === "true"
          ? "Booked"
          : "Available",
    });
  }, [fieldUpdateData]);

  console.log(fieldUpdateData);

  const onFinish = async (values) => {
    const { fieldType, pricePerHour, status } = values;

    const data = {
      fieldType,
      pricePerHour,
      status: status === "available" ? false : true,
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
      setLoading(false);
      notification.error({ message: error?.response?.data?.message });
    }
  };

  const statusOptions = [
    { value: "booked", label: "Booked" },
    { value: "available", label: "Available" },
  ];

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
            <InputNumber
              allowClear
              placeholder="20000"
              controls={false}
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  .replace(/\.(?=\d{0,2}$)/g, ",")
              }
              parser={(value) =>
                Number.parseFloat(
                  value.replace(/\$\s?|(\.*)/g, "").replace(/(\,{1})/g, ".")
                ).toFixed(2)
              }
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please choose status",
              },
            ]}
          >
            <Select options={statusOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalUpdateField;
