import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, notification, Row, Table } from "antd";
import { useEffect, useState } from "react";
import ActionButtons from "../../global/ActionButtons";
import ModalCreateBranch from "./modal/ModalCreateBranch";
import axios from "axios";
import ModalUpdateBranch from "./modal/ModalUpdateBranch";

const BaseUrl = process.env.REACT_APP_BASE_URL;

function Branch() {
  const [searchText, setSearchText] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [branchData, setBranchData] = useState("");
  const [branchUpdateData, setBranchUpdateData] = useState(false);
  const jwtToken = sessionStorage.getItem("access_token");

  useEffect(() => {
    fetchBranchList();
  }, []);

  const fetchBranchList = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/branchs`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setBranchData(res.data.data);
    } catch (error) {}
  };

  const handleModal = (modalType, value) => {
    if (modalType === "create" && value) {
    } else if (modalType === "update" && value) {
      setIsUpdateModalOpen("update");
      setBranchUpdateData(value);
    }
  };

  const handleConfirmDeleteBranch = async (id) => {
    try {
      const res = await axios.delete(`${BaseUrl}/branchs/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (res?.data?.statusCode === 200) {
        notification.success({
          message: res?.data?.message,
        });
        fetchBranchList();
      }
    } catch (error) {
      notification.error({ message: "Fail to delete branch" });
    }
  };

  const columns = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      align: "center",
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
            handleDeleteRecord={() => handleConfirmDeleteBranch(record.id)}
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
            placeholder="Search Branch"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => console.log("Search for:", searchText)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <ModalCreateBranch
            isOpen={isCreateModalOpen}
            setIsOpen={setIsCreateModalOpen}
            fetchBranchList={fetchBranchList}
            BaseUrl={BaseUrl}
            jwtToken={jwtToken}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={branchData} />
        </Col>
      </Row>

      <ModalUpdateBranch
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        branchData={branchData}
        fetchBranchList={fetchBranchList}
        BaseUrl={BaseUrl}
        jwtToken={jwtToken}
        branchUpdateData={branchUpdateData}
        setBranchUpdateData={setBranchUpdateData}
      />
    </>
  );
}

export default Branch;
