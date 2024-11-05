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

function ModalCreateField({
  isOpen,
  setIsOpen,
  BaseUrl,
  jwtToken,
  branchList,
  fetchFieldList,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const [branchSelected, setBranchSelected] = useState("");

  useEffect(() => {
    if (branchList) {
      const branchNameOptionsClone = [];
      branchList.map((branch) => {
        branchNameOptionsClone.push({
          value: branch.id,
          label: branch.branchName,
        });
      });
      setBranchOptions(branchNameOptionsClone);
    }
  }, [branchList]);

  const onFinish = async (values) => {
    const { fieldType, pricePerHour, branchId } = values;

    const data = {
      fieldType,
      pricePerHour,
      branch: {
        branchId,
      },
    };

    try {
      setLoading(true);
      const res = await axios.post(`${BaseUrl}/fields`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
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
    setIsOpen(false);
    setBranchSelected("");
  };

  return (
    <>
      <Button size="middle" type="primary" onClick={() => setIsOpen(true)}>
        Create new field
      </Button>
      <Modal
        title="Create new field"
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
            name="branchId"
            rules={[
              {
                required: true,
                message: "Please choose branch",
              },
            ]}
          >
            <Select
              allowClear
              options={branchOptions}
              onChange={(value) => setBranchSelected(value)}
            />
          </Form.Item>

          {branchSelected !== "" ? (
            <>
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
                    value
                      ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      : ""
                  }
                  parser={(value) => value.replace(/(Đ|,|\s)/g, "")}
                />
              </Form.Item>
            </>
          ) : (
            <></>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default ModalCreateField;
