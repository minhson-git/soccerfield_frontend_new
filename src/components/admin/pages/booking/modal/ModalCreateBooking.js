import { Button, DatePicker, Form, Modal, notification, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

function ModalCreateBooking({
  isOpen,
  setIsOpen,
  BaseUrl,
  jwtToken,
  branchList,
  userList,
  fetchBookingList,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [fieldLoading, setFieldLoading] = useState(false);

  const [branchOptions, setBranchOptions] = useState([]);
  const [branchSelected, setBranchSelected] = useState("");

  const [userOptions, setUserOptions] = useState([]);

  const [fieldOptions, setFieldOptions] = useState([]);

  const [timeOptions, setTimeOptions] = useState([]);

  useEffect(() => {
    if (branchSelected) {
      form.resetFields(["fieldId"]);
      fetchFieldListByName(branchSelected);
    }
  }, [branchSelected]);

  useEffect(() => {
    if (branchList) {
      const branchNameOptionsClone = [];

      branchList.map((branch) => {
        branchNameOptionsClone.push({
          value: branch.branchName,
          label: branch.branchName,
        });
      });
      setBranchOptions(branchNameOptionsClone);
    }

    if (userList) {
      const userNameOptionsClone = [];
      userList.map((user) => {
        userNameOptionsClone.push({
          value: user.userId,
          label: user.fullname,
        });
      });
      setUserOptions(userNameOptionsClone);
    }
  }, [branchList]);

  const fetchFieldListByName = async (branchName) => {
    try {
      setFieldLoading(true);
      const res = await axios.get(
        `${BaseUrl}/fields?branchName=${branchName}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const fetchedFields = res?.data?.data?.content || [];

      const fieldOptionsClone = fetchedFields.map((field) => ({
        value: field.fieldId,
        label: field.fieldType,
      }));

      setFieldOptions(fieldOptionsClone);
    } catch (error) {
      setFieldOptions([]);
    } finally {
      setFieldLoading(false);
    }
  };

  const onFinish = async (values) => {
    const { userId, fieldId, time, day } = values;

    const [startTime, endTime] = time.split("-");

    const formatDay = dayjs(day).format("YYYY-MM-DD");
    const formatStartTime = dayjs(formatDay + startTime).format(
      "YYYY-MM-DDTHH:mm:ss"
    );
    const formatEndTime = dayjs(formatDay + endTime).format(
      "YYYY-MM-DDTHH:mm:ss"
    );

    const data = {
      user: {
        userId,
      },
      field: {
        fieldId,
      },
      startTime: formatStartTime,
      endTime: formatEndTime,
      bookingDate: formatDay,
      status: false,
    };

    try {
      setLoading(true);
      const res = await axios.post(`${BaseUrl}/bookings`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      notification.success({ message: res?.data?.message });
      fetchBookingList();
      onCloseModal();
      setLoading(false);
    } catch (error) {
      notification.error({ message: "Field has been booking" });
      setLoading(false)
    }
  };

  const onCloseModal = () => {
    form.resetFields();
    setBranchSelected("");
    setFieldOptions([]);
    setIsOpen(false);
  };

  const disablePassDates = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const handleTimeFrameChange = (value) => {
    form.resetFields(["time"]);
    if (value === "morning") {
      setTimeOptions(morningOptions);
    } else if (value === "afternoon") {
      setTimeOptions(afternoonOptions);
    } else if (value === "evening") {
      setTimeOptions(eveningOptions);
    }
  };

  const timeFrame = [
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "evening", label: "Evening" },
  ];

  const morningOptions = [
    { label: "6:00 AM - 7:30 AM", value: "6:00:00-7:30:00" },
    { label: "7:30 AM - 9:00 AM", value: "7:30:00-9:00:00" },
    { label: "9:00 AM - 10:30 AM", value: "9:00:00-10:30:00" },
    { label: "10:30 AM - 12:00 PM", value: "10:30:00-12:00:00" },
  ];

  const afternoonOptions = [
    { label: "12:00 PM - 1:30 PM", value: "12:00:00-13:30:00" },
    { label: "1:30 PM - 3:00 PM", value: "13:30:00-15:00:00" },
    { label: "3:00 PM - 4:30 PM", value: "15:00:00-16:30:00" },
    { label: "4:30 PM - 6:00 PM", value: "16:30:00-18:00:00" },
  ];

  const eveningOptions = [
    { label: "6:00 PM - 7:30 PM", value: "18:00:00-19:30:00" },
    { label: "7:30 PM - 9:00 PM", value: "19:30:00-21:00:00" },
    { label: "9:00 PM - 10:30 PM", value: "21:00:00-22:30:00" },
    { label: "10:30 PM  -12:00 AM", value: "22:30:00-24:00:00" },
  ];

  return (
    <>
      <Button size="middle" type="primary" onClick={() => setIsOpen(true)}>
        Create new booking
      </Button>
      <Modal
        title="Create new booking"
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

          {branchSelected ? (
            <>
              <Form.Item
                label="Field Type"
                name="fieldId"
                rules={[
                  {
                    required: true,
                    message: "Please choose field",
                  },
                ]}
              >
                <Select
                  allowClear
                  options={fieldOptions}
                  loading={fieldLoading}
                  placeholder="Select field"
                />
              </Form.Item>

              <Form.Item
                label="User Name"
                name="userId"
                rules={[
                  {
                    required: true,
                    message: "Please choose user",
                  },
                ]}
              >
                <Select
                  allowClear
                  options={userOptions}
                  placeholder="Select user"
                />
              </Form.Item>

              <Form.Item
                label="Day"
                name="day"
                rules={[
                  {
                    required: true,
                    message: "Please choose a day",
                  },
                ]}
              >
                <DatePicker
                  disabledDate={disablePassDates}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Time Frame"
                name="timeFrame"
                rules={[
                  {
                    required: true,
                    message: "Please choose time frame",
                  },
                ]}
              >
                <Select
                  allowClear
                  options={timeFrame}
                  onChange={handleTimeFrameChange}
                  placeholder="select time frame"
                />
              </Form.Item>

              <Form.Item
                label="Time"
                name="time"
                rules={[
                  {
                    required: true,
                    message: "Please choose time",
                  },
                ]}
              >
                <Select
                  allowClear
                  options={timeOptions}
                  placeholder="Select time"
                />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                style={{ display: "none" }}
              >
                <Select />
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

export default ModalCreateBooking;
