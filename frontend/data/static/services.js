import { MdDesignServices } from "react-icons/md";
import { IoTerminal } from "react-icons/io5";
import { BsShieldLockFill } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";

export const services = [
  {
    color: "#3B82F6",
    darkColor: "#0a010d",
    title: "Design",
    icon: <MdDesignServices />,
    text: "Turn ideas into interfaces that wow. We design sleek, modern visuals that grab attention, build trust, and keep users coming back.",
  },
  {
    title: "Development",

    color: "#3B82F6",
    darkColor: "#0a010d",
    icon: <IoTerminal />,
    text: "We build blazing-fast, scalable websites and platforms that work flawlessly — helping you grow, sell, and succeed online.",
  },
  {
    title: "Security",

    icon: <BsShieldLockFill />,
    color: "#3B82F6",
    darkColor: "#0a010d",
    text: "Sleep easy — your platform is protected. We secure your data, block threats, and ensure your users always feel safe.",
  },
  {
    title: "Support",

    icon: <FaHandsHelping />,
    color: "#3B82F6",
    darkColor: "#0a010d",
    text: "We're your tech partner, not just your developers. Get quick fixes, updates, and ongoing guidance to keep your platform running perfectly.",
  },
];