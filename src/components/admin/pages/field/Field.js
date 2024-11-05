import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, notification, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ActionButtons from "../../global/ActionButtons";
import ModalCreateField from "./modal/ModalCreateField";
import ModalUpdateField from "./modal/ModalUpdateField";

const BaseUrl = process.env.REACT_APP_BASE_URL;

function Field() {
  const [searchText, setSearchText] = useState("");

  const [branchList, setBranchList] = useState([]);
  const [fieldData, setFieldData] = useState([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [fieldUpdateData, setFieldUpdateData] = useState([]);

  const jwtToken = sessionStorage.getItem("access_token");

  useEffect(() => {
    fetchBranchList();
    fetchFieldList();
  }, []);

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

  const fetchFieldList = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/fields`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setFieldData(res?.data?.data);
    } catch (error) {}
  };

  const handleModal = (modalType, value) => {
    if (modalType === "create" && value) {
    } else if (modalType === "update" && value) {
      setIsUpdateModalOpen("update");
      setFieldUpdateData(value);
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

  const columns = [
    {
      title: "Field Type",
      dataIndex: "fieldType",
      key: "fieldType",
      align: "center",
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Price Per House",
      dataIndex: "pricePerHour",
      key: "pricePerHour",
      align: "center",
      width: "15%",
      ellipsis: true,
      render: (value) =>
        `${new Intl.NumberFormat("vi-VN", {
          style: "decimal",
        }).format(value)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Branch",
      dataIndex: ["branch", "branchName"],
      key: "branch",
      align: "center",
      width: "15%",
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
            placeholder="Search branch"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => console.log("Search for:", searchText)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <ModalCreateField
            isOpen={isCreateModalOpen}
            setIsOpen={setIsCreateModalOpen}
            branchList={branchList}
            fetchFieldList={fetchFieldList}
            BaseUrl={BaseUrl}
            jwtToken={jwtToken}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={fieldData} />
        </Col>
      </Row>

      <ModalUpdateField
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        BaseUrl={BaseUrl}
        jwtToken={jwtToken}
        fieldUpdateData={fieldUpdateData}
        fetchFieldList={fetchFieldList}
      />
    </>
  );
}

export default Field;
