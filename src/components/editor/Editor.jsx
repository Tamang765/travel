import { formats } from "numeral";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../utils/highlight";
//

// ----------------------------------------------------------------------

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
        formats={formats}
        placeholder={placeholder}
        {...other}
        theme="snow"
      />
      {/* </StyledEditor> */}
    </>
  );
}
