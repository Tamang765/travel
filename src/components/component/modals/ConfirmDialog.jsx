import { Button } from "@material-tailwind/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import { default as React } from "react";

export function ConfirmDialog({
  open,
  action,
  handleClose,
  title,
  description = `Please re-confirm. This is irreversible process.`,
  handler,
}) {
  return (
    <>
      <Dialog open={open} onClose={handler}>
        <DialogTitle>
          <p>{title}</p>
        </DialogTitle>
        <Divider />

        <DialogContent>
          <p>{description}</p>
        </DialogContent>

        <Stack
          flexDirection={"row"}
          gap={2}
          justifyContent={"end"}
          mb={1}
          mr={3}
        >
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>

          {action && action}
        </Stack>
      </Dialog>
    </>
  );
}
