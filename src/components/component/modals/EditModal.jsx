import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { default as React } from "react";
import Iconify from "../../iconify";

export function EditDialog({
  open,
  maxWidth = "lg",
  handleClose,
  title,
  handler,
  children,
}) {
  return (
    <>
      <Dialog open={open} onClose={handler} maxWidth={maxWidth} fullWidth>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <DialogTitle>
            <Typography variant="button">
              <p>{title}</p>
            </Typography>
          </DialogTitle>
          <Button onClick={handleClose}>
            <Iconify icon="line-md:close" />
          </Button>
        </Stack>
        <Divider />
        {children}
      </Dialog>
    </>
  );
}
