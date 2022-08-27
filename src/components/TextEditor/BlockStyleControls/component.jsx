import React from "react";
import Select from "react-select";

const blockStyleOptions = [
  { label: "Paragraph", value: "paragraph" },
  { label: "H1", value: "header-one" },
  { label: "H2", value: "header-two" },
  { label: "H3", value: "header-three" },
  { label: "Blockquote", value: "blockquote" },
  { label: "UL", value: "unordered-list-item" },
  { label: "OL", value: "ordered-list-item" },
  { label: "Code Block", value: "code-block" },
];

export const BlockStyleControls = ({ toggleBlockType }) => {
  const onChange = (selectedOption) => {
    toggleBlockType(selectedOption.value);
  };
  return (
    <Select
      options={blockStyleOptions}
      onChange={onChange}
      className="RichEditor__blockControls"
      defaultValue={blockStyleOptions[0]}
    />
  );
};
