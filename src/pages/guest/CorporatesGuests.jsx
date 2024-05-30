import React from "react";
import EnhancedTable from "../../components/component/table/Table";
import { Shadow, TitleMd } from "../../routers";

export const CorporatesGuests = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Corporates Guests </TitleMd>
        <EnhancedTable />
      </Shadow>
    </>
  );
};
