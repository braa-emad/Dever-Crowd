import H1 from "../ui/H1";
import { motion } from "framer-motion";
import Link from "next/link";
import { informations, socials } from "@/data/static/contact";
const Info = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <H1 title="contact info" />

      <div className="w-[90%] flex items-center justify-center flex-col py-9">

        <motion.div
          className="flex flex-col w-[90%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{once:true}}
        >
          {informations.map((info, i) => (
            <motion.div
              key={i}
              className="w-full flex items-center gap-4 p-4 m-3
                         rounded-2xl
                         bg-gradient-to-br from-[#0a0f1c00] to-[#0c1e3b]
                         text-white
                         shadow-[0_4px_12px_rgba(0,0,0,0.25)]
                         border border-sky-900/40
                         hover:border-sky-500 hover:shadow-xl 
                         transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl text-sky-400">{info.icon}</div>
              <div className="text-sky-200">{info.value}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="border-t border-white/10 m-6 w-[70%]" />

        <motion.div
          className="flex flex-col items-center gap-4 w-[90%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{once:true}}
        >
          <p className="text-sky-200 text-sm uppercase tracking-widest">Find us on</p>

          <div className="flex gap-3 flex-wrap items-center justify-center">
            {socials.map((social, i) => (
              <motion.div
                key={i}
                className="p-3 bg-[#0c1e3b] rounded-full
                           shadow-[0_4px_10px_rgba(0,0,0,0.3)]
                           hover:bg-sky-700 hover:scale-110 
                           transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Link href={social.link} className="text-sky-400 text-2xl">
                  {social.icon}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Info;
