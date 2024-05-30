import React from "react";
import EnhancedTable from "../../components/component/table/Table";
import { Shadow, TitleMd } from "../../routers";

export const OtherGuests = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Other Guests </TitleMd>
        <EnhancedTable />
      </Shadow>
    </>
  );
};
