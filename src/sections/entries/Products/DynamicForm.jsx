import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { RHFEditor, RHFTextField } from "../../../components/hook-form";

const DynamicForm = () => {
  const [inputFields, setInputFields] = useState([
    { sectionTitle: "", sectionDescription: "" },
  ]);

  const handleChangeInput = (index, event) => {
    const { name, value } = event.target;
    const values = [...inputFields];
    values[index][name] = value;
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
    <div className="w-full flex flex-col mt-3">
      {inputFields.map((inputField, index) => (
        <div key={index} className="flex flex-col w-full gap-2  ">
          <RHFTextField
            fullWidth
            name="sectionTitle"
            label="Section Title"
            variant="outlined"
            size="small"
            value={inputField.sectionTitle}
            onChange={(event) => handleChangeInput(index, event)}
          />

          <RHFEditor
            name={"sectionDescription"}
            placeholder="Write anwser here..."
            value={inputField.sectionDescription}
            onChange={(event) =>
              handleChangeInput(index, {
                target: {
                  name: "sectionDescription",
                  value: event,
                },
              })
            }
          />

          <Box>
            <IconButton onClick={() => handleRemoveFields(index)}>-</IconButton>
            <IconButton onClick={() => handleAddFields()}>+</IconButton>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
