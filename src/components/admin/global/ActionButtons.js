import { Button, Col, Popconfirm, Row, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

function ActionButtons(props) {
  const { record, handleViewModal, handleUpdateModal, handleDeleteRecord } =
    props;
  return (
    <Row justify={"space-evenly"}>
      {handleViewModal ? (
        <Col>
          <Tooltip title="View" placement="bottom">
            <Button
              className="action-buttons"
              type="default"
              size={"small"}
              style={{
                background: "transparent",
                borderColor: "transparent",
                color: "#448026",
              }}
              icon={<FontAwesomeIcon icon={faEye} />}
              onClick={handleViewModal}
            />
          </Tooltip>
        </Col>
      ) : (
        <></>
      )}

      {handleUpdateModal ? (
        <Col>
          <Tooltip title="Update" placement="bottom">
            <Button
              className="action-buttons"
              type="default"
              size={"small"}
              style={{
                background: "transparent",
                borderColor: "transparent",
                color: "#e3ba5b",
              }}
              icon={<FontAwesomeIcon icon={faPenToSquare} />}
              onClick={handleUpdateModal}
            />
          </Tooltip>
        </Col>
      ) : (
        <></>
      )}

      {handleDeleteRecord ? (
        <Col>
          <Tooltip title="Delete" placement="bottom">
            <Popconfirm
              title="Are you sure to delete ?"
              onConfirm={handleDeleteRecord}
              okText="Yes"
              cancelText="Cancel"
              placement="left"
            >
              <Button
                className="action-buttons"
                type="default"
                size={"small"}
                style={{
                  background: "transparent",
                  borderColor: "transparent",
                  color: "red",
                }}
                icon={<FontAwesomeIcon icon={faTrashCan} />}
              />
            </Popconfirm>
          </Tooltip>
        </Col>
      ) : (
        <></>
      )}
    </Row>
  );
}

export default ActionButtons;
