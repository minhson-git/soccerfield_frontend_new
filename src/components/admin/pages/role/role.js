import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, notification, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ActionButtons from "../../global/ActionButtons";
import ModalCreateRole from "./modal/ModalCreateRole";
import ModalUpdateRole from "./modal/ModalUpdateRole";

const BaseUrl = process.env.REACT_APP_BASE_URL;

function Role() {
  const [searchText, setSearchText] = useState("");

  const [roleData, setRoleData] = useState([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [roleUpdateData, setRoleUpdateData] = useState([]);

  const jwtToken = sessionStorage.getItem("access_token");

  useEffect(() => {
    fetchRoleList();
  }, []);

  const fetchRoleList = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/roles`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setRoleData(res?.data?.data);
    } catch (error) {}
  };

  const handleModal = (modalType, value) => {
    if (modalType === "create" && value) {
    } else if (modalType === "update" && value) {
      setIsUpdateModalOpen("update");
      setRoleUpdateData(value);
    }
  };

  const handleConfirmDeleteField = async (id) => {
    try {
      const res = await axios.delete(`${BaseUrl}/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      notification.success({
        message: res?.data?.message,
      });
      fetchRoleList();
    } catch (error) {
      notification.error({ message: "Fail to delete role" });
    }
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
            handleDeleteRecord={() => handleConfirmDeleteField(record.id)}
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
            placeholder="Search Role"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => console.log("Search for:", searchText)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <ModalCreateRole
            isOpen={isCreateModalOpen}
            setIsOpen={setIsCreateModalOpen}
            fetchRoleList={fetchRoleList}
            BaseUrl={BaseUrl}
            jwtToken={jwtToken}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={roleData} />
        </Col>
      </Row>

      <ModalUpdateRole
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        BaseUrl={BaseUrl}
        jwtToken={jwtToken}
        fetchRoleList={fetchRoleList}
        roleUpdateData={roleUpdateData}
        setRoleUpdateData={setRoleUpdateData}
      />
    </>
  );
}

export default Role;
