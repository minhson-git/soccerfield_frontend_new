import { Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="not-found-page"
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, page not exist !"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          padding: "0px 10px",
        }}
        extra={
          <Button
            type="primary"
            style={{ color: "#fff", backgroundColor: "#d71e35" }}
          >
            <Link to="/">Back to home page</Link>
          </Button>
        }
      />
    </div>
  );
}
