import { Dialog } from "@material-tailwind/react";
import { Divider, Paper } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TitleMd } from "../../routers";

const logoImg = "https://cdn-icons-png.flaticon.com/512/5968/5968292.png";
export const HotelInfo = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div className="w-2/3">
        <Paper className="py-5">
          <div className=" p-3 px-5">
            <TitleMd>Hotel Info</TitleMd>
          </div>
          <Divider />
          <div divider className="flex justify-between items-center text-primary  p-3 px-5">
            <h2 className="font-medium w-1/2">Hotel Name</h2>
            <h2 className="w-1/2">Freedom Resort</h2>
          </div>
          <Divider />
          <div divider className="flex justify-between items-center text-primary  p-3 px-5">
            <h2 className="font-medium w-1/2">Contact Number</h2>
            <h2 className="w-1/2">+97748540164</h2>
          </div>
          <Divider />
          <div divider className="flex justify-between items-center text-primary  p-3 px-5">
            <h2 className="font-medium w-1/2">Email</h2>
            <div className="w-1/2">
              <NavLink to="https://apptechnologies.co/" target="_blank" className="text-blue-500 underline">
                freedomresort@gmail.com
              </NavLink>
            </div>
          </div>
          <Divider />
          <div divider className="flex justify-between items-center text-primary  p-3 px-5">
            <h2 className="font-medium w-1/2">Address</h2>
            <h2 className="w-1/2">Manthali, New Baneswor, Ramechhap, Janakpur, 56900, Nepal</h2>
          </div>
          <Divider />
          <div divider className="flex justify-between items-center text-primary  p-3 px-5">
            <h2 className="font-medium w-1/2">Website</h2>
            <div className="w-1/2">
              <NavLink to="https://apptechnologies.co/" target="_blank" className="text-blue-500 underline">
                App tech
              </NavLink>
            </div>
          </div>
          <Divider />
          <div divider className="flex justify-between items-center text-primary  p-3 px-5">
            <h2 className="font-medium w-1/2">Logo</h2>
            <div className="w-1/2">
              <button onClick={handleOpen}>
                <img src={logoImg} className="w-32 h-32 object-cover rounded-full" alt="logo" />
              </button>
            </div>
          </div>
          <Dialog
            open={open}
            handler={handleOpen}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <div className="w-full h-full p-5">
              <img src={logoImg} className="w-full h-full object-cover" alt="logo" />
            </div>
          </Dialog>
          <Divider />
          <div divider className="flex justify-between items-center text-primary  p-3 px-5">
            <h2 className="font-medium w-1/2">Check In Time</h2>
            <h2 className="w-1/2">14.00</h2>
          </div>
          <Divider />
          <div divider className="flex justify-between items-center text-primary  p-3 px-5">
            <h2 className="font-medium w-1/2">Check Out Time</h2>
            <h2 className="w-1/2">14.00</h2>
          </div>
        </Paper>
      </div>
    </>
  );
};
