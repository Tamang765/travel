import React from "react";
import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { RoomTypeCardDetails } from "./RoomTypeCardDetails";

export const RoomTypeCard = (props) => {
  return (
    <>
      <Card className="capitalize relative">
        <RoomTypeCardDetails img={props.img} />
        <CardBody className="text-center">
          <Typography variant="h5">{props.title}</Typography>
          <Typography variant="body" className="mt-3 font-normal">
            {props.amenities}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <Typography className="flex items-center -space-x-3">Ture</Typography>
          <Typography className="font-normal">{props.title}</Typography>
        </CardFooter>
      </Card>
    </>
  );
};
