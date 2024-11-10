import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, notification, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ActionButtons from "../../global/ActionButtons";
import ModalCreateBooking from "./modal/ModalCreateBooking";
import ModalUpdateBooking from "./modal/ModalUpdateBooking";
import ViewBookingDrawer from "./modal/ViewBookingDrawer";

const BaseUrl = process.env.REACT_APP_BASE_URL;

function Booking() {
  const [searchText, setSearchText] = useState("");

  const [branchList, setBranchList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [bookingData, setBookingData] = useState([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [bookingViewData, setBookingViewData] = useState([]);

  const [bookingUpdateData, setBookingUpdateData] = useState([]);

  const jwtToken = sessionStorage.getItem("access_token");

  useEffect(() => {
    fetchBranchList();
    fetchBookingList();
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setUserList(res?.data?.data);
    } catch (error) {}
  };

  const fetchBranchList = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/branchs`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setBranchList(res.data.data);
    } catch (error) {}
  };

  const fetchBookingList = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/bookings`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setBookingData(res?.data?.data?.content);
    } catch (error) {}
  };

  const handleModal = (modalType, value) => {
    if (modalType === "create" && value) {
    } else if (modalType === "view" && value) {
      setIsViewDrawerOpen(true);
      setBookingViewData(value);
    } else if (modalType === "update" && value) {
      setIsUpdateModalOpen("update");
      setBookingUpdateData(value);
    }
  };

  const handleConfirmDeleteField = async (id) => {
    try {
      const res = await axios.delete(`${BaseUrl}/fields/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (res?.data?.statusCode === 200) {
        notification.success({
          message: res?.data?.message,
        });
        fetchFieldList();
      }
    } catch (error) {
      notification.error({ message: "Fail to delete field" });
    }
  };
  console.log(bookingData);
  const columns = [
    {
      title: "User Name",
      dataIndex: ["user", "fullname"],
      key: "fullname",
      align: "center",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: ["user", "phone"],
      key: "pricePerHour",
      align: "center",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Field Type",
      dataIndex: ["field", "fieldType"],
      key: "status",
      align: "center",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Branch",
      dataIndex: ["field", "branch", "branchName"],
      key: "branch",
      align: "center",
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "10%",
      ellipsis: true,
      render: (status) => {
        return status === true || status === "true" ? "Completed" : "Booked";
      },
    },
    {
      title: "Actions",
      key: "action",
      width: "10%",
      align: "center",
      render: (_, record) => {
        return (
          <ActionButtons
            record={record}
            handleViewModal={() => handleModal("view", record)}
            handleUpdateModal={() => handleModal("update", record)}
            handleDeleteRecord={() => handleConfirmDeleteField(record.fieldId)}
          />
        );
      },
    },
  ];
  return (
    <>
      <Row>
        <Col span={12}>
          <Input
            placeholder="Search Booking"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => console.log("Search for:", searchText)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <ModalCreateBooking
            isOpen={isCreateModalOpen}
            setIsOpen={setIsCreateModalOpen}
            branchList={branchList}
            userList={userList}
            fetchBookingList={fetchBookingList}
            BaseUrl={BaseUrl}
            jwtToken={jwtToken}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={bookingData} />
        </Col>
      </Row>

      <ModalUpdateBooking
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        BaseUrl={BaseUrl}
        jwtToken={jwtToken}
        bookingUpdateData={bookingUpdateData}
        fetchBookingList={fetchBookingList}
      />

      <ViewBookingDrawer
        isViewDrawerOpen={isViewDrawerOpen}
        bookingViewData={bookingViewData}
        setIsViewDrawerOpen={setIsViewDrawerOpen}
        setBookingViewData={setBookingViewData}
      />
    </>
  );
}

export default Booking;
