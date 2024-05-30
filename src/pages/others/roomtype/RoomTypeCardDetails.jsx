import React, { useState } from "react";
import { Drawer, Typography, CardHeader, Dialog, IconButton } from "@material-tailwind/react";
import { Divider } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

const logoImg1 = "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export const RoomTypeCardDetails = (props) => {
  const [openRight, setOpenRight] = useState(false);
  const [openImg, setOpenImg] = useState(false);

  const handleOpenImg = () => setOpenImg(!openImg);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  return (
    <>
      <CardHeader onClick={openDrawerRight} floated={false} shadow={false} color="transparent" className="m-0 h-60">
        <img src={props.img} alt="ui/ux review check" className="w-full h-full object-cover cursor-pointer" />
      </CardHeader>
      {openRight && (
        <Drawer size={1200} overlay={false} placement="right" open={openRight} onClose={closeDrawerRight} className="overflow-y-scroll">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <Typography variant="h4" className="px-8">
                Overview
              </Typography>
              <IconButton color="blue-gray" onClick={closeDrawerRight} className="rounded-full mr-5">
                <AiOutlineClose size={25} />
              </IconButton>
            </div>
            <Divider className="pt-2" />
          </div>
          <div className="px-8 pb-16">
            <div className="relative capitalize">
              <table className="w-full text-sm text-left text-primary">
                <tr className="border-b border-gray-200">
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Type Name</th>
                  <td className="px-6 py-4 w-1/2">Triple</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Bed Type</th>
                  <td className="px-6 py-4 w-1/2">Triple</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Number Of Child</th>
                  <td className="px-6 py-4 w-1/2">3</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Number Of Extra Adults</th>
                  <td className="px-6 py-4 w-1/2">1</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Number Of Adults</th>
                  <td className="px-6 py-4 w-1/2">1</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Image</th>
                  <td className="px-6 py-4 w-1/2">
                    <img src={logoImg1} onClick={handleOpenImg} alt="logoImg1" className="w-40 h-32 object-cover rounded-lg" />
                    <Dialog
                      open={openImg}
                      handler={handleOpenImg}
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                      }}
                    >
                      <figure className="relative h-full w-full">
                        <img className="w-full h-full object-cover rounded-lg" src={logoImg1} alt="nature image" />
                        <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                          <div>
                            <Typography variant="h5" color="blue-gray">
                              Triple
                            </Typography>
                            <Typography color="gray" className="mt-2 font-normal">
                              Television, Wifi
                            </Typography>
                          </div>
                        </figcaption>
                      </figure>
                    </Dialog>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Available With</th>
                  <td className="px-6 py-4 w-1/2">true</td>
                </tr>
              </table>
            </div>
            <Typography variant="h5" className="mt-9">
              Amenities
            </Typography>
            <div className="relative overflow-x-auto mt-5">
              <table className="w-full text-sm text-left text-primary">
                <thead className="text-xs text-gray-700 uppercase bg-blue-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 ">
                      Amenity Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="px-6 py-4">Television ,wifi</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Typography variant="h5" className="mt-9">
              Rates
            </Typography>

            <div className="relative overflow-x-auto mt-5">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-primary uppercase bg-blue-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Rate Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rate Per Night
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Charge Per Extra Adult
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-primary">
                      standar rate
                    </th>
                    <td className="px-6 py-4">$ 2,500.00</td>
                    <td className="px-6 py-4">$ 160.00</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-primary">
                      standar rate
                    </th>
                    <td className="px-6 py-4">$ 2,500.00</td>
                    <td className="px-6 py-4">$ 160.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
};
