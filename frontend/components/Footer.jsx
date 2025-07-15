import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative w-full border-t border-primary px-4 sm:px-6 lg:px-12 pt-10 pb-6 "
    >
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10">
        {/* Logo and Info */}
        <div className="relative flex flex-col items-center lg:items-start w-full lg:w-1/2 text-center lg:text-left">
          {/* Logo خلفية شفافة أو تأثير بصري */}
          <div className="relative">
            <Logo width={1000} height={159} className="opacity-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:left-12 lg:top-10">
              <p className="font-extrabold text-2xl md:text-3xl xl:text-5xl">
                Dever<span className="text-primary">Crowd</span>
              </p>
              <p className="text-white/60 text-sm mt-2">©2025 Dever Crowd Ltd.</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="w-full lg:w-1/2 flex flex-col sm:flex-row justify-center lg:justify-center lg:gap-60 gap-10 p-5">
          {/* Site Links */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <h3 className="pb-3 font-semibold text-white">SITE</h3>
            <Link href="#home" className="text-white/50 hover:text-primary transition">Home</Link>
            <Link href="#about" className="text-white/50 hover:text-primary transition">About</Link>
            <Link href="#service" className="text-white/50 hover:text-primary transition">Service</Link>
            <Link href="#works" className="text-white/50 hover:text-primary transition">Works</Link>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <h3 className="pb-3 font-semibold text-white">SOCIAL</h3>
            <Link href="https://github.com/DeverCrowd" className="text-white/50 hover:text-primary transition">GitHub</Link>
            <Link href="https://www.instagram.com/devercrowd/" className="text-white/50 hover:text-primary transition">Instagram</Link>
            <Link href="https://www.tiktok.com/@devercrowd.com" className="text-white/50 hover:text-primary transition">TikTok</Link>
            <Link href="https://www.facebook.com/profile.php?id=61577937253222" className="text-white/50 hover:text-primary transition">Facebook</Link>
            <Link href="https://www.linkedin.com/company/devercrowd/" className="text-white/50 hover:text-primary transition">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
