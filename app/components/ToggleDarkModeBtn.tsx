"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeProvider";

function ToggleDarkModeBtn() {
  const [mounted, setMounted] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div>로딩중</div>;

  const variants = {
    light: {
      d: "M20 10C20 12.6951 18.9338 15.1412 17.2002 16.9395C15.3813 18.8263 12.8277 20 10 20C8.76868 20 7.58934 19.7775 6.5 19.3704C5.23326 18.897 4.08823 18.1742 3.1247 17.2616C2.07827 16.2705 1.24592 15.0556 0.704261 13.6936C0.249831 12.5509 0 11.3046 0 10C0 7.74835 0.744179 5.67051 2 3.99902C3.82446 1.57069 6.7288 0 10 0C11.6921 0 13.286 0.420253 14.6831 1.16208C15.9483 1.83392 17.0522 2.76952 17.9212 3.89557C18.6044 4.78082 19.1426 5.78379 19.5 6.86884C19.8245 7.8538 20 8.9064 20 10Z", // 라이트모드 아이콘 (예: 사각형)
      fill: "#f1f5f9",
    },
    dark: {
      d: "M10.1 20C8.7 20 7.3875 19.7333 6.1625 19.2C4.9375 18.6667 3.87083 17.9458 2.9625 17.0375C2.05417 16.1292 1.33333 15.0625 0.8 13.8375C0.266667 12.6125 0 11.3 0 9.9C0 7.46667 0.775 5.32083 2.325 3.4625C3.875 1.60417 5.85 0.45 8.25 0C7.95 1.65 8.04167 3.2625 8.525 4.8375C9.00833 6.4125 9.84167 7.79167 11.025 8.975C12.2083 10.1583 13.5875 10.9917 15.1625 11.475C16.7375 11.9583 18.35 12.05 20 11.75C19.5667 14.15 18.4167 16.125 16.55 17.675C14.6833 19.225 12.5333 20 10.1 20Z", // 다크모드 아이콘 (예: 원형에 가까운 모양)
      fill: "#262626",
    },
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`${
        isDarkMode ? "bg-neutral-100" : "bg-neutral-800"
      } w-10 p-1 rounded-full transition-colors duration-500 ease-in-out`}
    >
      <svg
        className={`${
          isDarkMode ? "translate-x-0" : "translate-x-4"
        } w-4 h-4 transition-transform`}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          animate={isDarkMode ? "dark" : "light"}
          variants={variants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
    </button>
  );
}

export default ToggleDarkModeBtn;
