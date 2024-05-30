/* ----------Pages-------------- */

// Reservation Routes
export { ActiveCheckIn } from "../pages/frontdesk/activeCheckIn/ActiveCheckIn";
export { AwaitingConfirmations } from "../pages/frontdesk/awaiting/AwaitingConfirmations";
export { CheckIn } from "../pages/frontdesk/CheckIn";
export { CheckInHistory } from "../pages/frontdesk/CheckInHistory";
export { NoShow } from "../pages/frontdesk/noshow/NoShow";
export { Form } from "../pages/frontdesk/reservation/Form";
export { HomeReservation } from "../pages/frontdesk/reservation/Home";
export { ReservationTable } from "../pages/frontdesk/reservation/ReservationTable";
export { UpcomingCheckIns } from "../pages/frontdesk/upcoming/Upcoming_Check_Ins";

//Room Routes
export { DirtyRoom } from "../pages/rooms/dirty/DirtyRoom";
export { AddRoom } from "../pages/rooms/room/AddRoom";
export { AllRooms } from "../pages/rooms/room/AllRooms";
export { RoomAmenities } from "../pages/rooms/RoomAmenities/RoomAmenities";

//Restaurant Routes
export { NewKot } from "../pages/restaurant/NewKot";
export { NewOrder } from "../pages/restaurant/NewOrder";

//Payment Routes
export { AddCorporatePayment } from "../pages/payment/AddCorporatePayment";
export { PendingCorporateInvoices } from "../pages/payment/PendingCorporateInvoices";

//Payment Routes
export { AddGuest } from "../pages/guest/AddGuest";
export { CorporatesGuests } from "../pages/guest/CorporatesGuests";
export { OtherGuests } from "../pages/guest/OtherGuests";

//Service Usage Routes
export { AddAmenitiesBill } from "../pages/serviceUsage/AddAmenitiesBill";
export { GenerateServiceBill } from "../pages/serviceUsage/GenerateServiceBill";

//Maintenance Routes
export { MaintenanceBlock } from "../pages/maintenance/MaintenanceBlock";
export { MaintenanceTypes } from "../pages/maintenance/MaintenanceTypes";
export { UpcomingMaintenance } from "../pages/maintenance/upcoming/UpcomingMaintenance";

//Raise handling Routes
export { RaiseNewComplaint } from "../pages/raisehandling/RaiseNewComplaint";
export { ShiftRoom } from "../pages/raisehandling/ShiftRoom";

//Other Routes
export { FoodsAndBeverages } from "../pages/others/food/FoodsAndBeverages";
export { FoodTiming } from "../pages/others/food/FoodTiming";
export { HotelInfo } from "../pages/others/HotelInfo";
export { RoomType } from "../pages/others/roomtype/RoomType";
export { RoomTypeTable } from "../pages/others/roomtype/RoomTypeTable";
export { Service } from "../pages/others/Service";
export { AddStaff } from "../pages/others/staff/AddStaff";
export { Staffs } from "../pages/others/staff/Staffs";
export { TablesPage } from "../pages/others/table/TablesPage";
export { Tax } from "../pages/others/Tax";

//Progress Routes
export { MonthlyProgress } from "../pages/progress/MonthlyProgress";
export { TodayProgress } from "../pages/progress/TodayProgress";
export { WeeklyProgress } from "../pages/progress/WeeklyProgress";
/* -----------------end----------------------- */
//Design
export { FormCard } from "../components/component/form/FormCard";
export { Shadow } from "../components/design/Shadow";
export {
  Caption,
  Description,
  TitleMd,
  TitleS,
  TitleSm,
} from "../components/design/Title";

//Charts
export { LineChart, RadialBar } from "../components/component/charts/LineChart";

//TODO: Component
export { CardSm } from "../components/component/card/Card";

//TODO: Components
export { Layout } from "../components/common/Layout";

// TODO: header and sidebar
export { Header } from "../components/header/Header";
export { Sidebar } from "../components/sidebar/Sidebar";

// TODO: user section
export { Users } from "../pages/users/Users";
