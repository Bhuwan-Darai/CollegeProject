import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as FcIcons from "react-icons/fc";
import { FaBars } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useUserContext } from "../../userRoleContext";
import "../../App.css";
// eslint-disable-next-line react/prop-types
const Sidebar = ({ children }) => {
  //  get User from context when login
  const { userRole } = useUserContext();
  console.log("User role in mycomponent", userRole);

  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768); //? Toggle side bar based on screen size
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <AiIcons.AiFillHome />,
      allowedRoles: ["Admin", "Accountant", "User"],
    },
    {
      path: "/students",
      name: "Students",
      icon: <FaIcons.FaUserGraduate />,
      allowedRoles: ["Admin", "Accountant"],
    },
    {
      path: "/accountant",
      name: "Accountant",
      icon: <BsIcons.BsFillPersonFill />,
      allowedRoles: ["Admin"],
    },
    {
      path: "/payment",
      name: "Payment",
      icon: <BsIcons.BsCreditCard />,
      allowedRoles: ["User"],
    },
    {
      path: "/feeStructure",
      name: "Fee Structure",
      icon: <AiIcons.AiOutlineTable />,
      allowedRoles: ["Admin", "Accountant", "User"],
    },
    {
      path: "/statements",
      name: "Statements",
      icon: <FcIcons.FcDocument />,
      allowedRoles: ["Accountant"],
    },

    {
      path: "/invoice",
      name: "Invoice",
      icon: <IoIcons.IoMdNotifications />,
      allowedRoles: ["User"],
    },
    {
      path: "/sendMail",
      name: "Mail",
      icon: <BsIcons.BsEnvelope />,
      allowedRoles: ["Accountant"],
    },
    {
      path: "/logout",
      name: "Logout",
      icon: <FaIcons.FaPowerOff />,
      allowedRoles: ["Admin", "Accountant", "User"],
    },
  ];

  //  filter the menu items depending upon the roles from context api
  const filteredMenuItems = menuItem.filter((item) =>
    item.allowedRoles.includes(String(userRole)),
  );

  return (
    <div className="container-sidebar">
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            PayEase
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {filteredMenuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassname="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>

      <main className="content-container">{children}</main>
    </div>
  );
};

export default Sidebar;
