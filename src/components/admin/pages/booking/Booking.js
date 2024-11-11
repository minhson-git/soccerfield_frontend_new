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
import ModalCreateBooking from "./modal/ModalCreateBooking";
import ModalUpdateBooking from "./modal/ModalUpdateBooking";
import ViewBookingDrawer from "./modal/ViewBookingDrawer";
import SearchInput from "../../global/SearchInput";
import SearchButton from "../../global/SearchButton";

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

  const [branchName, setBranchName] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState(null);

  const [meta, setMeta] = useState({
    current: 0,
    pageSize: 10,
    pages: 0,
    total: 0,
  });

  const branchOptions = branchList?.map((branch) => {
    return {
      value: branch.id,
      label: branch.branchName,
    };
  });

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

  const fetchBookingList = async (
    page = meta.current,
    size = meta.pageSize,
    branchName = "",
    username = "",
    status = null
  ) => {
    const params = {
      size,
      page,
      ...(branchName && { branchName }),
      ...(username && { username }),
      ...(status !== null && { status }),
    };

    try {
      const res = await axios.get(`${BaseUrl}/bookings`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params,
      });

      setBookingData(res?.data?.data?.content);

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
      const res = await axios.delete(`${BaseUrl}/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (res?.data?.statusCode === 200) {
        notification.success({
          message: res?.data?.message,
        });
        fetchBookingList();
      }
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  };

  const handleChangePage = (page, pageSize) => {
    setMeta({ ...meta, current: page - 1, pageSize });
    fetchBookingList(page - 1, pageSize, branchName, username, status);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: ["user", "username"],
      key: "username",
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
            handleDeleteRecord={() => handleConfirmDeleteField(record.bookingId)}
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
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Select status"
            options={[
              { value: true, label: "Completed" },
              { value: false, label: "Booked" },
            ]}
            onClear={() => setStatus(null)}
            onSelect={(value) => setStatus(value)}
          />
        </Col>
        <Col>
          <SearchButton
            onFetch={() =>
              fetchBookingList(0, meta.pageSize, branchName, username, status)
            }
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "right", margin: "5px 0px 15px" }}>
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
          <Table
            rowKey={"bookingId"}
            style={{ marginBottom: "10px" }}
            columns={columns}
            dataSource={bookingData}
            pagination={false}
          />
          {bookingData.length > 0 && (
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
