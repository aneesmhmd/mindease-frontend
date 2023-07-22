import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdOutlinePayments,MdOutlineMedicalServices } from "react-icons/md";
import {BiTask} from 'react-icons/bi'
import { RiSettings4Line } from "react-icons/ri";
import {GrTasks} from 'react-icons/gr'
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { FaUserNurse,FaRegComments } from 'react-icons/fa'
import { Link } from "react-router-dom";

const SideBar = () => {
  const menus = [
    { name: "Dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard },
    { name: "Users", link: "/admin/users", icon: AiOutlineUser },
    { name: "Counselors", link: "/admin/add-counselor", icon: FaUserNurse },
    { name: "Appointments", link: "/admin/appointments", icon: TbReportAnalytics },
    { name: "Appointment Payment", link: "/admin/appointment-payments", icon: MdOutlinePayments },
    { name: "Psychological tasks", link: "/admin/tasks", icon: GrTasks },
    { name: "Subscriptions taken", link: "/admin/task-subscription", icon: BiTask},
    { name: "Subscriptions payment", link: "/admin/task-payments", icon: MdOutlinePayments },
    { name: "Testimonials", link: "/admin/testimonials", icon: FaRegComments },
    { name: "Services", link: "/admin/services", icon: MdOutlineMedicalServices },
  ];

  // FiMessageSquare , , margin: true
  const [open, setOpen] = useState(true);
  return (
      <div
        className={`bg-white border-r-2 border-gray-500 min-h-screen ${open ? "w-72" : "w-16"
          } duration-500 text-dark-900 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>

  );
};

export default SideBar;