import { IconButton } from "@material-tailwind/react";
import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const SearchAwaiting = ({ searchText = "Search..." }) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <Box>
      <Stack flexDirection={"row"} gap={2}>
        <input
          label={searchText}
          placeholder={searchText}
          className={`border outline-none bg-transparent p-2 box-border border-gray-500 rounded-xl scale-x-0 ${
            showSearch && "scale-x-100"
          } transition-all duration-150 origin-right`}
        />

        <IconButton
          onClick={() => setShowSearch(!showSearch)}
          variant="outlined"
          color="gray"
          fullWidth
          className="w-14 h-12"
        >
          <AiOutlineSearch size={20} />
        </IconButton>
      </Stack>
    </Box>
  );
};
