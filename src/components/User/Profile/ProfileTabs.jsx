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
 
export default function ProfileTabs({id}) {
  const data = [
    {
      label: "Appointments",
      value: "dashboard",
      icon: TbReportAnalytics,
      desc: `Appointments, its status, everything will be shown here`,
    },
    {
      label: "Subscriptions",
      value: "profile",
      icon: BiTask,
      desc: `All of the subscription and its status will be shown here`,
    },
    {
      label: "Change Password",
      value: "settings",
      icon: BiSolidLockAlt,
      desc: <ChangePassword id={id}/>,
    },
  ];
  return (
    <Tabs value="dashboard">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
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