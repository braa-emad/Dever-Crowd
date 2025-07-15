import Image from "next/image";
import Form from "./Form"
import Info from "./Info"

const ContactPage = () => {
  return (
    <section
      className="relative flex items-center justify-center w-full min-h-[100vh] py-10 px-5 z-40"
      id="contact"
    >
      <Image
        src="/bgs/bg4.webp"
        fill
        quality={100}
        alt="bg"
        className="object-cover sticky top-0 z-0"
      />
      <div className="flex lg:flex-row flex-col justify-center w-full xl:w-[90%] gap-2 z-1">
        <div className=" w-full lg:w-1/3 bg- rounded-4xl border-t border-l border-primary shadow-[-9px_-9px_15px_#3B82F6]">
          <Info />
        </div>
        <div className="w-full lg:w-1/2 rounded-4xl border-b border-r border-primary shadow-[9px_9px_15px_#3B82F6]">
          <Form />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
