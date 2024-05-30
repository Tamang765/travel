import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
// @mui
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
// assets
import UploadIllustration from "../assest/illustrations/UploadIllustration";
import Iconify from "../iconify";
import RejectionFiles from "./errors/RejectionFiles";
import MultiFilePreview from "./preview/MultiFilePreview";
import SingleFilePreview from "./preview/SingleFilePreview";

// ----------------------------------------------------------------------

const StyledDropZone = styled("div")(({ theme }) => ({
  outline: "none",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  "&:hover": {
    opacity: 0.72,
  },
}));

const AvatarDropZone = styled(Box)(({ theme }) => ({
  outline: "none",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 200,
  height: 200,
  borderRadius: "50%",
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  "&:hover": {
    opacity: 0.72,
  },
}));

// ----------------------------------------------------------------------

Upload.propTypes = {
  sx: PropTypes.object,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  files: PropTypes.array,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  onDelete: PropTypes.func,
  onRemove: PropTypes.func,
  onUpload: PropTypes.func,
  thumbnail: PropTypes.bool,
  helperText: PropTypes.node,
  onRemoveAll: PropTypes.func,
  text: PropTypes.string,
  isAvatar: PropTypes.bool,
};

export default function Upload({
  disabled,
  multiple = false,
  error,
  helperText,
  accept,
  //
  file,
  onDelete,
  isVideo,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  text,
  maxSize = 10,
  loading = false,
  isAvatar = false,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: accept,
    multiple,
    disabled,
    maxSize: maxSize * 1024 * 1024,
    ...other,
  });

  const hasFile = !!file && !multiple;

  const hasFiles = files && multiple && files.length > 0;

  const isError = isDragReject || !!error;

  const isPDF =
    typeof file === "string" ? file?.toLowerCase().endsWith(".pdf") : false;

  return (
    <Box sx={{ width: 1, position: "relative", ...sx }}>
      {hasFile && isPDF ? (
        <Box sx={{ my: 1 }}>
          <Typography variant="body2">
            <a href={file} target="__blank" rel="noopener" download>
              {file}
            </a>
          </Typography>
        </Box>
      ) : (
        <Box
          component={isAvatar ? AvatarDropZone : StyledDropZone}
          {...getRootProps()}
          sx={{
            ...(isDragActive && {
              opacity: 0.72,
            }),
            ...(isError && {
              color: "error.main",
              bgcolor: "error.lighter",
              borderColor: "error.light",
            }),
            ...(disabled && {
              opacity: 0.48,
              pointerEvents: "none",
            }),
            ...(hasFile &&
              !isAvatar && {
                padding: "32% 0",
              }),
            ...(isVideo &&
              !isAvatar && {
                padding: "10px",
              }),
          }}
        >
          <input {...getInputProps()} />

          {isAvatar ? (
            <AvatarPlaceholder
              sx={{
                ...(hasFile && {
                  opacity: 0,
                  display: "none",
                }),
              }}
              text={text}
            />
          ) : (
            <Placeholder
              sx={{
                ...(hasFile && {
                  opacity: 0,
                  display: "none",
                }),
              }}
              text={text}
            />
          )}

          {hasFile && !isVideo && !isPDF && !isAvatar && (
            <SingleFilePreview file={file} />
          )}
          {isVideo && hasFile && !isPDF && !isAvatar && (
            <video width={1000} controls>
              <source src={file?.preview} type="video/mp4" />
            </video>
          )}
          {isAvatar && hasFile && (
            <Avatar src={file?.preview} sx={{ width: 200, height: 200 }} />
          )}
        </Box>
      )}

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />

      {hasFile && onDelete && (
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: "absolute",
            color: (theme) => alpha(theme.palette.common.white, 0.8),
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            },
          }}
        >
          <Iconify icon="eva:close-fill" width={18} />
        </IconButton>
      )}

      {hasFiles && (
        <>
          <Box sx={{ my: 3 }}>
            <MultiFilePreview
              files={files}
              thumbnail={thumbnail}
              onRemove={onRemove}
            />
          </Box>

          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            {onRemoveAll && (
              <Button
                color="inherit"
                variant="outlined"
                size="small"
                onClick={onRemoveAll}
              >
                Remove all
              </Button>
            )}

            {onUpload && (
              <Button size="small" variant="contained" onClick={onUpload}>
                Upload files
              </Button>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

Placeholder.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
};

function Placeholder({ sx, text, ...other }) {
  return (
    <Stack
      spacing={5}
      alignItems="center"
      justifyContent="center"
      direction={{
        xs: "column",
        md: "row",
      }}
      sx={{
        width: 1,
        textAlign: {
          xs: "center",
          md: "left",
        },
        ...sx,
      }}
      {...other}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <div>
        <h1 className="text-center text-xl mb-2">{text}</h1>

        <p className="text-center" mx={1}>
          Drop files here or click
          <span className="text-primary mx-1">browse</span>
          thorough your machine
        </p>
      </div>
    </Stack>
  );
}

function AvatarPlaceholder({ sx, text, ...other }) {
  return (
    <Stack
      spacing={5}
      alignItems="center"
      justifyContent="center"
      direction={{
        xs: "column",
        md: "row",
      }}
      sx={{
        width: 1,
        textAlign: {
          xs: "center",
          md: "left",
        },
        ...sx,
      }}
      {...other}
    >
      <div>
        <h1 className="text-center text-xl mb-2">{text}</h1>

        <p className="text-center" mx={1}>
          Drop files here or click
          <span className="text-primary mx-1">browse</span>
          thorough your machine
        </p>
      </div>
    </Stack>
  );
}
