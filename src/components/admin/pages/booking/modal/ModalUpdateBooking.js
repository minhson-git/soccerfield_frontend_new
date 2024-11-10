import { DatePicker, Form, Modal, notification, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function ModalUpdateBooking({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  BaseUrl,
  jwtToken,
  bookingUpdateData,
  fetchBookingList,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [fieldLoading, setFieldLoading] = useState(false);
  const [timeOptions, setTimeOptions] = useState([]);

  const [fieldOptions, setFieldOptions] = useState([]);

  const [brandUpdateInit, setBranchUpdateInit] = useState({
    value: "",
    label: "",
  });

  const [userUpdateInit, setUserUpdateInit] = useState({
    value: "",
    label: "",
  });

  const [fieldUpdateInit, setFieldUpdateInit] = useState({
    value: "",
    label: "",
  });

  useEffect(() => {
    if (bookingUpdateData?.startTime && bookingUpdateData?.endTime) {
      const startTime = dayjs(bookingUpdateData?.startTime).format("HH:mm:ss");
      const endTime = dayjs(bookingUpdateData?.endTime).format("HH:mm:ss");

      let selectedTimeFrame = "";
      let selectedTimeLabel = "";

      if (startTime >= "06:00:00" && endTime <= "12:00:00") {
        selectedTimeFrame = "Morning";
        selectedTimeLabel = getTimeLabel(morningOptions, startTime, endTime);
        setTimeOptions(morningOptions);
      } else if (startTime >= "12:00:00" && endTime <= "18:00:00") {
        selectedTimeFrame = "Afternoon";
        selectedTimeLabel = getTimeLabel(afternoonOptions, startTime, endTime);
        setTimeOptions(afternoonOptions);
      } else if (startTime >= "18:00:00" && endTime <= "24:00:00") {
        selectedTimeFrame = "Evening";
        selectedTimeLabel = getTimeLabel(eveningOptions, startTime, endTime);
        setTimeOptions(eveningOptions);
      }

      setBranchUpdateInit({
        value: bookingUpdateData?.field?.branch?.id,
        label: bookingUpdateData?.field?.branch?.branchName,
      });

      setUserUpdateInit({
        value: bookingUpdateData?.user?.userId,
        label: bookingUpdateData?.user?.username,
      });

      setFieldUpdateInit({
        value: bookingUpdateData?.field?.fieldId,
        label: bookingUpdateData?.field?.fieldType,
      });

      form.setFieldsValue({
        branchName: bookingUpdateData?.field?.branch?.branchName,
        fieldId: bookingUpdateData?.field?.fieldId,
        userName: bookingUpdateData?.user?.username,
        day: bookingUpdateData?.startTime
          ? dayjs(bookingUpdateData?.startTime)
          : null,
        timeFrame: selectedTimeFrame,
        time: selectedTimeLabel,
        status: bookingUpdateData?.status === true ? "Completed" : "Booked",
      });
    }
  }, [bookingUpdateData, form]);

  useEffect(() => {
    const fetchFields = async () => {
      if (bookingUpdateData?.field?.branch?.branchName) {
        await fetchFieldListByName(
          bookingUpdateData?.field?.branch?.branchName
        );
      }
    };
    if (isUpdateModalOpen) {
      fetchFields();
    }
  }, [isUpdateModalOpen, bookingUpdateData]);

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

  const getTimeLabel = (options, startTime, endTime) => {
    const start = dayjs(startTime, "HH:mm:ss");
    const end = dayjs(endTime, "HH:mm:ss");

    for (let option of options) {
      const [optionStart, optionEnd] = option.value
        .split("-")
        .map((time) => dayjs(time, "HH:mm:ss"));

      if (start.isSameOrAfter(optionStart) && end.isSameOrBefore(optionEnd)) {
        return option.label;
      }
    }

    return "";
  };

  const onFinish = async (values) => {
    const { status, fieldId } = values;

    const data = {
      user: {
        userId: userUpdateInit.value,
      },
      field: {
        fieldId: fieldId,
      },
      status: status === "booked" ? false : true,
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `${BaseUrl}/bookings/${bookingUpdateData?.bookingId}`,
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
      fetchBookingList();
      onCloseModal();
      setLoading(false);
    } catch (error) {
      notification.error({ message: res?.data?.message });
    }
  };

  const onCloseModal = () => {
    form.resetFields(
      ["branchId"],
      ["fieldId"],
      ["userId"],
      ["day"],
      ["timeFrame"],
      ["time"],
      ["status"]
    );
    setTimeOptions([]);
    setIsUpdateModalOpen(false);
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
      <Modal
        title="Update booking"
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
          <Form.Item label="Branch Name" name="branchName">
            <Select disabled />
          </Form.Item>

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
              placeholder="Select field"
            />
          </Form.Item>

          <Form.Item label="User Name" name="userName">
            <Select disabled />
          </Form.Item>

          <Form.Item label="Day" name="day">
            <DatePicker
              disabledDate={disablePassDates}
              style={{ width: "100%" }}
              disabled
            />
          </Form.Item>

          <Form.Item label="Time Frame" name="timeFrame">
            <Select disabled />
          </Form.Item>

          <Form.Item label="Time" name="time">
            <Select disabled />
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
            <Select
              allowClear
              placeholder="Select status"
              options={[
                { value: "booked", lable: "Booked" },
                { value: "completed", label: "Completed" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalUpdateBooking;
