import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment, useState } from "react";
import { red } from "@mui/material/colors";

interface params {
  id: number;
  title: string;
  name: string;
  confirm: (e: number) => void;
}
const DeleteAlert = ({ id, title, name, confirm }: params) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Fragment>
      <DeleteIcon sx={{ color: red[600] }} onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            Are you absolutely sure?
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            This action cannot be undone. This will permanently delete this{" "}
            <b>{title || "Record"}</b> and remove <b>{name || "Record"}</b> from
            our servers.
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row-reverse" },
            }}
          >
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                confirm(id);
                setOpen(false);
              }}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Fragment>
  );
};

export default DeleteAlert;
