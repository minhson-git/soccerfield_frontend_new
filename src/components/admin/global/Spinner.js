import { Flex, Spin } from "antd";

function Spinner() {
  return (
    <Flex gap="large" vertical>
      <Spin tip="Loading..." fullscreen></Spin>
    </Flex>
  );
}

export default Spinner;
