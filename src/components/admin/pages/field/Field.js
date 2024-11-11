import { SearchOutlined } from "@ant-design/icons";
import {
  Col,
  Flex,
  Input,
  notification,
  Pagination,
  Row,
  Select,
  Table,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ActionButtons from "../../global/ActionButtons";
import ModalCreateField from "./modal/ModalCreateField";
import ModalUpdateField from "./modal/ModalUpdateField";
import SearchButton from "../../global/SearchButton";

const BaseUrl = process.env.REACT_APP_BASE_URL;

function Field() {
  const [branchList, setBranchList] = useState([]);
  const [fieldData, setFieldData] = useState([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [fieldUpdateData, setFieldUpdateData] = useState([]);

  const [branchName, setBranchName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [status, setStatus] = useState(null);

  const [meta, setMeta] = useState({
    current: 0,
    pageSize: 10,
    pages: 0,
    total: 0,
  });

  const branchOptions = branchList?.map((branch) => {
    return { value: branch.id, label: branch.branchName };
  });

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

  const fetchFieldList = async (
    page = meta.current,
    size = meta.pageSize,
    branchName = "",
    fieldType = "",
    status = ""
  ) => {
    const params = {
      size,
      page,
      ...(branchName && { branchName }),
      ...(fieldType && { fieldType }),
      ...(status !== null && { status }),
    };
    try {
      const res = await axios.get(`${BaseUrl}/fields`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params,
      });
      setFieldData(res?.data?.data?.content);
      setMeta({
        current: res?.data?.data?.pageable?.pageNumber,
        pageSize: res?.data?.data?.pageable?.pageSize,
        pages: res?.data?.data?.totalPages,
        total: res?.data?.data?.totalElements,
      });
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

  const handleChangePage = (page, pageSize) => {
    setMeta({ ...meta, current: page - 1, pageSize });
    fetchFieldList(page - 1, pageSize, branchName, fieldType, status);
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
      title: "Price",
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
      render: (status) => {
        return status === true || status === "true" ? "Booked" : "Available";
      },
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
      <Row
        align={"bottom"}
        style={{
          margin: "5px 0px 10px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Col span={6}>
          <Select
            allowClear
            options={branchOptions}
            style={{ width: "100%" }}
            placeholder="Select branch"
            label="name"
            onClear={() => setBranchName("")}
            onSelect={(value, option) => setBranchName(option.label)}
          />
        </Col>
        <Col span={6}>
          <Input
            allowClear
            placeholder="Enter field type"
            value={fieldType}
            onChange={(e) => setFieldType(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Select status"
            options={[
              { value: true, label: "Booked" },
              { value: false, label: "Available" },
            ]}
            onClear={() => setStatus(null)}
            onSelect={(value) => setStatus(value)}
          />
        </Col>
        <Col>
          <SearchButton
            onFetch={() =>
              fetchFieldList(0, meta.pageSize, branchName, fieldType, status)
            }
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
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
          <Table
            columns={columns}
            dataSource={fieldData}
            pagination={false}
            style={{ marginBottom: "10px" }}
          />
          {fieldData.length > 0 && (
            <Col span={24}>
              <Flex justify="flex-end">
                <Pagination
                  size="small"
                  pageSizeOptions={[10, 20, 30, 40, 50]}
                  locale={{ items_per_page: "/ page" }}
                  current={meta.current + 1}
                  pageSize={meta.pageSize}
                  total={meta.total}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} / ${total}`
                  }
                  onChange={(page, pageSize) => {
                    handleChangePage(page, pageSize);
                  }}
                  showSizeChanger
                />
              </Flex>
            </Col>
          )}
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
