"use client";
import Nav from "./Nav";

const Header = () => {
  return (
    <>
      <header className="xl:flex fixed z-50 items-center xl:w-[30%] xl:left-[35%] lg:w-[40%] lg:left-[30%] md:left-[25%] md:w-[50%]  w-full top-5">
        <Nav />
      </header>
    </>
  );
};

export default Header;
