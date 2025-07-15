import Image from "next/image";
const TestCard = ({ name, image, test }) => {
  return (
    <div className="flex flex-col items-center justify-between text-center bg-[#0f172a]/60 border border-[#1e3a8a]/30 rounded-3xl p-6 shadow-lg max-w-md mx-auto ">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
          <Image
            src={image}
            alt={name}
            width={60}
            height={60}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="text-white text-lg font-medium tracking-wide capitalize group-hover:text-blue-400 transition-colors duration-300">
          {name}
        </h3>
      </div>

      <div className="relative text-white/80 text-sm md:text-base font-light leading-relaxed bg-white/5 border border-white/10 p-4 rounded-2xl shadow-inner backdrop-blur-2xl">
        <span className="absolute top-[-10px] left-[-10px] text-blue-500 text-4xl font-bold opacity-20">
          “
        </span>
        <p className="relative z-10">{test}</p>
        <span className="absolute bottom-[-10px] right-[-10px] text-blue-500 text-4xl font-bold opacity-20">
          ”
        </span>
      </div>

      <div className="mt-6 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full" />
    </div>
  );
};

export default TestCard;
