import React from "react";
import { Shadow, TitleMd } from "../../../routers";
import { Form } from "../reservation/Form";

export const UpcomingCheckIns = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Upcoming Check Ins</TitleMd>
        <Form />
      </Shadow>
    </>
  );
};
