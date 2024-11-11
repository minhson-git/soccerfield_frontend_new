import { Input, Typography } from "antd";

const SearchInput = (props) => {
  const { label, placeholder, setState } = props;

  return (
    <div>
      <Typography.Text>{label}</Typography.Text>
      <Input
        allowClear
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
