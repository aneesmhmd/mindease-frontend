import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {TbReportAnalytics} from 'react-icons/tb'
import {BiTask,BiSolidLockAlt} from 'react-icons/bi'
import ChangePassword from "./ChangePassword";
import SubscribedTasks from "./SubscribedTasks/SubscribedTasks";
import UserAppointments from "./Appointments/UserAppointments";
 
export default function ProfileTabs() {
  const data = [
    {
      label: "Appointments",
      value: "appointments",
      icon: TbReportAnalytics,
      desc: <UserAppointments/>,
    },
    {
      label: "Subscriptions",
      value: "subscriptions",
      icon: BiTask,
      desc: <SubscribedTasks/>,
    },
    {
      label: "Change Password",
      value: "change_password",
      icon: BiSolidLockAlt,
      desc: <ChangePassword />,
    },
  ];
  return (
    <Tabs value="appointments">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2 py-1 md:w-auto w-10 overflow-hidden md:text-base text-xs">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="flex items-center justify-center">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}