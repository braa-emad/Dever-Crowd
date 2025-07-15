import Image from "next/image";

const Logo = ({ width, height,className }) => {
  return (
    <Image
      alt="DeverCrowd logo"
      width={width}
      height={height}
      src="/logo.webp"
      className={`${className}`}
    />
  );
};

export default Logo;
