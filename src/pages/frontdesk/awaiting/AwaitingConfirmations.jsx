import { Card } from "@material-tailwind/react";
import React from "react";
import EnhancedTable from "../../../components/component/table/Table";
import { Shadow } from "../../../routers";

export const AwaitingConfirmations = () => {
  return (
    <>
      <Shadow>
        <Card color="transparent" shadow={false}>
          <EnhancedTable title="Awaiting Confirmations" />
        </Card>
      </Shadow>
    </>
  );
};
