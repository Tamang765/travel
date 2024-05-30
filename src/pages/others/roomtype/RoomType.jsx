import React from "react";
import { Shadow, TitleMd } from "../../../routers";
import { RoomTypeCard } from "./RoomTypeCard";
import { RoomTypeCardDetails } from "./RoomTypeCardDetails";

const logoImg1 = "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const logoImg2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTBhFdpSqV2dxdUQ7Ma4m98bzjBOUXUBZi8Q&usqp=CAU";
const logoImg3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXH4-rZ3LQsvxZwMvlbfHXfS4HyZt8Vd0GNA&usqp=CAU";
const logoImg4 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2M-b-tHFLrQRdPpDsv22PHRezSdQ2oYnT3A&usqp=CAU";
const logoImg5 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnC89lpl0btV1cUQbWBpYCpN4uK1wgSjFrtQ&usqp=CAU";
const logoImg6 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbAWC2zVgtNfB4ElER7wKn9HzCqnyjiErunQ&usqp=CAU";
const logoImg7 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSU6tW7S1K4GRmnhzZD8wMlVGOETgK1odI0w&usqp=CAU";

export const RoomType = () => {
  return (
    <>
      <Shadow>
        <TitleMd>RoomType</TitleMd>
        <div className="grid grid-cols-3 gap-10 p-8">
          <RoomTypeCard title="triple" amenities="television, wifi" type="single" img={logoImg1} />
          <RoomTypeCard title="triple" amenities="television, wifi" type="single" img={logoImg2} />
          <RoomTypeCard title="triple" amenities="television, wifi" type="single" img={logoImg3} />
          <RoomTypeCard title="triple" amenities="television, wifi" type="single" img={logoImg4} />
          <RoomTypeCard title="triple" amenities="television, wifi" type="single" img={logoImg5} />
          <RoomTypeCard title="triple" amenities="television, wifi" type="single" img={logoImg6} />
          <RoomTypeCard title="triple" amenities="television, wifi" type="single" img={logoImg7} />
        </div>
      </Shadow>
      <RoomTypeCardDetails />
    </>
  );
};
