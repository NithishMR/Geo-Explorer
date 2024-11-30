import Link from "next/link";
import { StepForward } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <div className="max-w-4xl w-full text-center">
        {/* Title Section */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Welcome to IP-Based Geo Explorer! 👋
        </h1>
        {/* Description Section */}
        <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed">
          This is a simple tool that shows your IP address and provides details
          about your location, such as the city, region, and country. You can
          even view your country’s flag and explore your digital coordinates on
          a map.
        </p>
        {/* Get Started Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href={"/main"}
            className="flex items-center space-x-2 text-xl sm:text-2xl font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Get Started...</span>
            <StepForward className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
