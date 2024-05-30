import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Shadow } from "../../../routers";
import { Form } from "./Form";

export const HomeReservation = () => {
  return (
    <Shadow>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Reservation
        </Typography>

        <Form show={false} />
      </Card>
    </Shadow>
  );
};
