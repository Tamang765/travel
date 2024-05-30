import { useState } from "react";

import { IconButtonAnimate } from "../../../components/animate";
import MenuPopover from "../../../components/menu-popover";

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: "action.selected",
          }),
        }}
      ></IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
      ></MenuPopover>
    </>
  );
}
