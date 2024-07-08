import { Box, IconButton } from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import { RHFEditor, RHFTextField } from "../../../components/hook-form";

const DynamicForm = ({ setContent, isView = false, data }) => {
  
  const initialFields = data?.content
    ? JSON.parse(data.content)
    : [{ sectionTitle: "", sectionDescription: "" }];
  const [inputFields, setInputFields] = useState(initialFields);

  useEffect(() => {
    setContent(inputFields);
  }, [inputFields, setContent]);

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

  return (
    <div className="w-full flex flex-col mt-3">
      {inputFields.map((inputField, index) => (
        <div key={index} className="flex flex-col w-full gap-2">
          <RHFTextField
            fullWidth
            name="sectionTitle"
            label="Section Title"
            variant="outlined"
            size="small"
            value={inputField.sectionTitle || ""}
            onChange={(event) => handleChangeInput(index, event)}
            disabled={isView}
          />

          <RHFEditor
            name="sectionDescription"
            placeholder="Write answer here..."
            value={inputField.sectionDescription || ""}
            disabled={isView}
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

export default memo(DynamicForm);
