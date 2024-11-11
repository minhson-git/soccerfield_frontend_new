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
      status: false,
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
      fetchFieldList();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({ message: error?.response?.data?.message });
    }
  };

  const onCloseModal = () => {
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
              placeholder="Select branch"
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
                <Input allowClear placeholder="Enter new field type" />
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
                  placeholder="Enter price"
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

              <Form.Item name="status" noStyle style={{ display: "none" }}>
                <Input type="hidden" />
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
