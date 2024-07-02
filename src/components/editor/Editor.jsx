import PropTypes from "prop-types";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../utils/highlight"; // Assuming this is a custom syntax highlighter or similar utility

const modules = {
  toolbar: {
    container: [
      [{ font: [] }],
      [{ header: [1, 2, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ align: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      ["clean"], // remove formatting button
    ],
  },
};

const formats = [
  "font",
  "header",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "blockquote",
  "code-block",
  "link",
  "image",
  "align",
  "size",
  "indent",
  "direction",
];

Editor.propTypes = {
  id: PropTypes.string,
  sx: PropTypes.object,
  error: PropTypes.bool,
  simple: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helperText: PropTypes.object,
};

export default function Editor({
  id = "minimal-quill",
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  placeholder = "Write something...",
  ...other
}) {
  return (
    <>
      {/* <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} /> */}
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        {...other}
        theme="snow"
      
      />

      {/* </StyledEditor> */}
    </>
  );
}
