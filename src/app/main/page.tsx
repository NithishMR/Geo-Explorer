import Link from "next/link";

export default function DisplayItems() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <div className="max-w-md w-full space-y-6">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Choose an Option
        </h1>
        {/* Options */}
        <div className="flex flex-col space-y-4">
          <Link
            href={"/main/findMyDetails"}
            className="block w-full text-center py-4 px-6 bg-cyan-600 rounded-lg text-lg font-medium hover:bg-cyan-500 transition-colors shadow-md"
          >
            Find details about your IP
          </Link>
          <Link
            href={"/main/findIpDetails"}
            className="block w-full text-center py-4 px-6 bg-cyan-600 rounded-lg text-lg font-medium hover:bg-cyan-500 transition-colors shadow-md"
          >
            Find details about a specific IP
          </Link>
        </div>
      </div>
    </div>
  );
}
