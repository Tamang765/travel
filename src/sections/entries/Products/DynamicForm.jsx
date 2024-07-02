import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { RHFEditor } from "../../../components/hook-form";

const DynamicForm = () => {
  const [inputFields, setInputFields] = useState([
    { sectionTitle: "", sectionDescription: "" },
  ]);

  const handleChangeInput = (index, event) => {
    console.log(event.target);
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { sectionTitle: "", sectionDescription: "" },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  console.log(inputFields);
  return (
    <div className="w-full flex">
      {inputFields.map((inputField, index) => (
        <div key={index} className="flex flex-col w-full gap-2 ">
          <TextField
            fullWidth
            name="sectionTitle"
            label="Section Title"
            variant="outlined"
            size="small"
            value={inputField.firstName}
            onChange={(event) => handleChangeInput(index, event)}
          />
          {/* <TextField
            fullWidth
            name="sectionDescription"
            label="Section Description"
            variant="outlined"
            size="small"
            value={inputField.lastName}
            onChange={(event) => handleChangeInput(index, event)}
            maxRows={4}
            multiline
          /> */}
          <RHFEditor
            name={"sectionDescription"}
            placeholder="Write anwser here..."
            value={inputField.lastName}
            onChange={(event) => handleChangeInput(index, event)}
          />

          <Box
            sx={{
              position: "absolute",
              right: "0",
              transform: "translateY(-10px)",
              //   background: "yellow",
            }}
          >
            <IconButton onClick={() => handleRemoveFields(index)}>-</IconButton>
            <IconButton onClick={() => handleAddFields()}>+</IconButton>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
