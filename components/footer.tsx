import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <motion.footer
      className="gradient-bg text-black py-4 px-4 sm:px-6 lg:px-8 mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto text-center text-xs">
        <p>
          Developed with 💖 by{" "}
          <Link href={"https://masudur-rahman.vercel.app/"} target="_blank">Masud Parvez</Link>{" "}
          with the help of 🤖
        </p>
      </div>
    </motion.footer>
  );
}
