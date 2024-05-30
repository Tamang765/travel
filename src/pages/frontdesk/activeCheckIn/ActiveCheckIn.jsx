import { Card } from "@material-tailwind/react";
import React from "react";
import { Shadow, TitleMd } from "../../../routers";
import { Form } from "./Form";

export const ActiveCheckIn = () => {
  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <TitleMd>Active Check In</TitleMd>
          <Form />
        </Card>
      </Shadow>
    </>
  );
};
