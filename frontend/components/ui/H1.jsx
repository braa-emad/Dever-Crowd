import React from "react";

const H1 = ({ title }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-6">
      <h2 className="text-transparent text-3xl sm:text-4xl md:text-5xl font-extrabold capitalize bg-gradient-to-r from-[#0c45a0] via-[#0c9aff] to-[#0c45a0] bg-clip-text animate-gradient bg-[length:200%_200%] tracking-tight drop-shadow-[0_1px_2px_rgba(12,69,160,0.4)]">
        {title}
      </h2>

      <div className="mt-4 w-3/4 sm:w-2/3 md:w-1/2 lg:w-[40%] h-[3px] bg-gradient-to-r from-transparent via-[#0c9aff] to-transparent rounded-full shadow-md shadow-[#0c9aff]/30" />
    </div>
  );
};

export default H1;
