import { Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link
          to="/"
          className="flex items-center md:text-base hover:text-blue-100 transition-colors"
        >
          Home
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link
          to="/psychologists"
          className="flex items-center md:text-base hover:text-blue-100 transition-colors"
        >
          Psychologists
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link
          to="/session"
          className="flex items-center md:text-base hover:text-blue-100 transition-colors"
        >
          Session
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link
          to="/psychological-tasks"
          className="flex items-center md:text-base hover:text-blue-100 transition-colors"
        >
          Psychological Tasks
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="flex items-center md:text-base hover:text-blue-100 transition-colors"
      >
        <Link>Testimonials</Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link
          to="/contact-us"
          className="flex items-center md:text-base hover:text-blue-100 transition-colors"
        >
          Contact Us
        </Link>
      </Typography>
    </ul>
  );
}

export default NavList;
