import React from "react";
import { Shadow, TitleMd } from "../../routers";
import { IconButton } from "@material-tailwind/react";
import { BiTrash } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";

export const MaintenanceTypes = () => {
  return (
    <>
      <Shadow>
        <TitleMd>Maintenance Types</TitleMd>
        <br />

        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left text-primary">
            <thead className="text-md text-white uppercase bg-indigo-200">
              <tr>
                <th scope="col" className="px-6 py-5">
                  Product name
                </th>
                <th scope="col" className="px-12 py-5 flex justify-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <th scope="row" className="px-6 py-4 font-medium">
                  Air Condition
                </th>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-4 justify-end">
                    <IconButton color="red">
                      <BiTrash size="22" />
                    </IconButton>
                    <IconButton color="green">
                      <AiOutlineEdit size="22" />
                    </IconButton>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <th scope="row" className="px-6 py-4 font-medium">
                  Air Condition
                </th>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-4 justify-end">
                    <IconButton color="red">
                      <BiTrash size="22" />
                    </IconButton>
                    <IconButton color="green">
                      <AiOutlineEdit size="22" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Shadow>
    </>
  );
};
