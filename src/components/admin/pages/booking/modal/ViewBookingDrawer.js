import { Drawer, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function ViewBookingDrawer(props) {
  const {
    isViewDrawerOpen,
    setIsViewDrawerOpen,
    bookingViewData,
    setBookingViewData,
  } = props;
  const { Text, Paragraph } = Typography;
  const [viewTimeFrame, setViewTimeFrame] = useState("");
  const [viewTimeLabel, setViewTimeLabel] = useState("");
  const handleCloseViewDrawer = () => {
    setIsViewDrawerOpen(false);
    setBookingViewData(null);
  };

  useEffect(() => {
    if (bookingViewData?.startTime && bookingViewData?.endTime) {
      const startTime = dayjs(bookingViewData?.startTime).format("HH:mm:ss");
      const endTime = dayjs(bookingViewData?.endTime).format("HH:mm:ss");

      if (startTime >= "06:00:00" && endTime <= "12:00:00") {
        setViewTimeFrame("Morning");
        setViewTimeLabel(getTimeLabel(morningTimes, startTime, endTime));
      } else if (startTime >= "12:00:00" && endTime <= "18:00:00") {
        setViewTimeFrame("Afternoon");
        setViewTimeLabel(getTimeLabel(afternoonTimes, startTime, endTime));
      } else if (startTime >= "18:00:00" && endTime <= "24:00:00") {
        setViewTimeFrame("Evening");
        setViewTimeLabel(getTimeLabel(eveningTimes, startTime, endTime));
      }
    }
  }, [bookingViewData]);

  const getTimeLabel = (options, startTime, endTime) => {
    const start = dayjs(startTime, "HH:mm:ss");
    const end = dayjs(endTime, "HH:mm:ss");

    for (let option of options) {
      const [optionStart, optionEnd] = option.value
        .split("-")
        .map((time) => dayjs(time, "HH:mm:ss"));

      if (start.isSameOrAfter(optionStart) && end.isSameOrBefore(optionEnd)) {
        const [startLabel, endLabel] = option.label.split(" - ");
        return { startTime: startLabel, endTime: endLabel };
      }
    }

    return { startTime: "", endTime: "" };
  };

  const morningTimes = [
    { label: "6:00 AM - 7:30 AM", value: "6:00:00-7:30:00" },
    { label: "7:30 AM - 9:00 AM", value: "7:30:00-9:00:00" },
    { label: "9:00 AM - 10:30 AM", value: "9:00:00-10:30:00" },
    { label: "10:30 AM - 12:00 PM", value: "10:30:00-12:00:00" },
  ];

  const afternoonTimes = [
    { label: "12:00 PM - 1:30 PM", value: "12:00:00-13:30:00" },
    { label: "1:30 PM - 3:00 PM", value: "13:30:00-15:00:00" },
    { label: "3:00 PM - 4:30 PM", value: "15:00:00-16:30:00" },
    { label: "4:30 PM - 6:00 PM", value: "16:30:00-18:00:00" },
  ];

  const eveningTimes = [
    { label: "6:00 PM - 7:30 PM", value: "18:00:00-19:30:00" },
    { label: "7:30 PM - 9:00 PM", value: "19:30:00-21:00:00" },
    { label: "9:00 PM - 10:30 PM", value: "21:00:00-22:30:00" },
    { label: "10:30 PM  -12:00 AM", value: "22:30:00-24:00:00" },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "decimal",
    }).format(amount);
  };

  return (
    <Drawer
      title="Booking Details"
      placement="right"
      open={isViewDrawerOpen}
      onClose={handleCloseViewDrawer}
    >
      <Paragraph>
        <Text strong>Full Name: </Text>
        <Text>{bookingViewData?.user?.fullname}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Phone: </Text>
        <Text>{bookingViewData?.user?.phone}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Email: </Text>
        <Text>{bookingViewData?.user?.email}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Field Type: </Text>
        <Text>{bookingViewData?.field?.fieldType}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Price: </Text>
        <Text>{formatCurrency(bookingViewData?.field?.pricePerHour)}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Branch Name: </Text>
        <Text>{bookingViewData?.field?.branch?.branchName}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Branch Address: </Text>
        <Text>{bookingViewData?.field?.branch?.address}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Day: </Text>
        <Text>{bookingViewData?.bookingDate}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Time Frame: </Text>
        <Text>{viewTimeFrame}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Start Time: </Text>
        <Text>{viewTimeLabel.startTime}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>End Time: </Text>
        <Text>{viewTimeLabel.endTime}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Status: </Text>
        <Text>{bookingViewData?.status === true ? "Completed" : "Booked"}</Text>
      </Paragraph>
    </Drawer>
  );
}

export default ViewBookingDrawer;
