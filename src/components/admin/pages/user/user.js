import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, notification, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ActionButtons from "../../global/ActionButtons";
import ModalCreateUser from "./modal/ModalCreateUser";
import ModalUpdateUser from "./modal/ModalUpdateUser";

const BaseUrl = process.env.REACT_APP_BASE_URL;

function User() {
  const [searchText, setSearchText] = useState("");

  const [bookingData, setBookingData] = useState([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [userUpdateData, setUserUpdateData] = useState([]);

  const jwtToken = sessionStorage.getItem("access_token");

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setBookingData(res?.data?.data);
    } catch (error) {}
  };

  const handleModal = (modalType, value) => {
    if (modalType === "create" && value) {
    } else if (modalType === "update" && value) {
      setIsUpdateModalOpen("update");
      setUserUpdateData(value);
    }
  };

  const handleConfirmDeleteField = async (id) => {
    try {
      const res = await axios.delete(`${BaseUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      notification.success({
        message: res?.data?.message,
      });
      fetchUserList();
    } catch (error) {
      notification.error({ message: "Fail to delete field" });
    }
  };

  const columns = [
    {
      title: "Citizen Number",
      dataIndex: "citizenId",
      key: "citizenId",
      align: "center",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      align: "center",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "branch",
      align: "center",
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Role",
      dataIndex: ["role", "name"],
      key: "branch",
      align: "center",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "action",
      width: "20%",
      align: "center",
      render: (_, record) => {
        return (
          <ActionButtons
            record={record}
            handleUpdateModal={() => handleModal("update", record)}
            handleDeleteRecord={() => handleConfirmDeleteField(record.userId)}
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
            placeholder="Search User"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => console.log("Search for:", searchText)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <ModalCreateUser
            isOpen={isCreateModalOpen}
            setIsOpen={setIsCreateModalOpen}
            fetchUserList={fetchUserList}
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

      <ModalUpdateUser
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        BaseUrl={BaseUrl}
        jwtToken={jwtToken}
        fetchUserList={fetchUserList}
        userUpdateData={userUpdateData}
        setUserUpdateData={setUserUpdateData}
      />
    </>
  );
}

export default User;
