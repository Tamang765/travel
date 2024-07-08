import JoditEditor from "jodit-react";
import PropTypes from "prop-types";
import React, { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import "../../utils/highlight"; // Assuming this is a custom syntax highlighter or similar utility

Editor.propTypes = {
  id: PropTypes.string,
  sx: PropTypes.object,
  error: PropTypes.bool,
  simple: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helperText: PropTypes.object,
  readonly: PropTypes.bool,
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
  readonly = false,
  ...other
}) {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      enableDragAndDropFileToEditor: true,
      // uploader: {
      //   insertImageAsBase64URI: true,
      //   imagesExtensions: ["jpg", "png", "jpeg", "gif", "avif", "webp"],
      // },
      uploader: {
        url: "http://localhost:5005/api/media/image-upload",
        format: "json",

        isSuccess: function (resp) {
          console.log("hello resp", resp);
          return !resp.error;
        },
        getMessage: function (resp) {
          return resp.msg;
        },
        process: function (resp) {
          return {
            files: resp.files || [],
            path: resp.path,
            baseurl: resp.baseurl,
            error: resp.error,
            msg: resp.msg,
          };
        },
        defaultHandlerSuccess: function (data, resp) {
          var i,
            field = "files";
          if (data[field] && data[field].length) {
            for (i = 0; i < data[field].length; i += 1) {
              this.s.insertImage(data.baseurl + data[field][i]);
            }
          }
        },
        error: function (e) {
          this.message.message(e, "error", 4000);
        },
      },

      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: false,
      readonly: readonly,
    }),
    [readonly]
  );

  return (
    <>
      {/* <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => solid 1px ${theme.palette.error.main},
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} /> */}
      {/* <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        {...other}
        theme="snow"
      /> */}

      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={onChange}
      />

      {/* </StyledEditor> */}
    </>
  );
}
