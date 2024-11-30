"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  MapPin,
  Network,
  Flag,
  Server,
  Clock,
  Copy,
  AlertTriangle,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface IpData {
  ip?: string;
  country?: string;
  city?: string;
  loc?: string;
  org?: string;
  postal?: string;
  region?: string;
  timezone?: string;
}

export default function AdvancedIpTracker() {
  const [data, setData] = useState<IpData | null>(null);
  const [ip, setIp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const validateIpAddress = (ipAddress: string) => {
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Pattern.test(ipAddress);
  };

  const getIpDetails = async (ipToFetch: string) => {
    setLoading(true);
    setError("");

    if (!validateIpAddress(ipToFetch)) {
      setError("Invalid IP address format");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://ipinfo.io/${ipToFetch}/geo`);
      if (!response.ok) {
        throw new Error("Failed to fetch IP details");
      }
      const data1: IpData = await response.json();
      setData(data1);
      toast.success("IP details retrieved successfully!");
    } catch (err) {
      setError("Could not fetch IP details. Please try again.");
      toast.error("Error fetching IP information");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ip) getIpDetails(ip);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const location = data?.loc ? data.loc.split(",") : [null, null];
  const lat = location[0] ? parseFloat(location[0]) : null;
  const lon = location[1] ? parseFloat(location[1]) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-gray-800/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-700 overflow-hidden"
      >
        <div className="grid md:grid-cols-3 gap-8 p-8">
          {/* IP Search Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 bg-gray-900/50 p-6 rounded-xl col-span-1"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Network className="w-10 h-10 text-cyan-400" />
              <h2 className="text-3xl font-bold text-cyan-300">
                IP Geolocation
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter IPv4 address"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="w-full bg-gray-800 border-gray-700 focus:ring-cyan-500"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-500 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching
                  </>
                ) : (
                  "Trace IP"
                )}
              </Button>
            </form>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center text-red-400 space-x-2 mt-4"
                >
                  <AlertTriangle className="w-5 h-5" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* IP Details Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 bg-gray-900/50 p-6 rounded-xl col-span-2"
          >
            {data ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Network className="w-10 h-10 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-cyan-300">
                      IP Insights
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(JSON.stringify(data, null, 2))
                    }
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>

                {data.country && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={`https://flagsapi.com/${data.country}/flat/64.png`}
                      alt="Country Flag"
                      className="w-24 h-24 hover:scale-110 transition-transform shadow-lg"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {[
                    {
                      icon: <Globe className="w-5 h-5 text-cyan-500" />,
                      label: "IP",
                      value: data.ip,
                    },
                    {
                      icon: <Flag className="w-5 h-5 text-cyan-500" />,
                      label: "Country",
                      value: data.country,
                    },
                    {
                      icon: <MapPin className="w-5 h-5 text-cyan-500" />,
                      label: "City",
                      value: data.city,
                    },
                    {
                      icon: <Server className="w-5 h-5 text-cyan-500" />,
                      label: "Organisation",
                      value: data.org,
                    },
                    {
                      icon: <Clock className="w-5 h-5 text-cyan-500" />,
                      label: "Timezone",
                      value: data.timezone,
                    },
                    {
                      icon: <Check className="w-5 h-5 text-cyan-500" />,
                      label: "Postal Code",
                      value: data.postal,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      {item.icon}
                      <div>
                        <div className="text-xs text-gray-400">
                          {item.label}
                        </div>
                        <div className="font-semibold">
                          {item.value || "N/A"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 italic py-12">
                Enter an IP address to discover its geospatial story
              </div>
            )}
          </motion.div>
        </div>

        {/* Geo Coordinates Section */}
        {lat && lon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900/50 p-6 border-t border-gray-700"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <MapPin className="w-10 h-10 text-cyan-400" />
              <h2 className="text-3xl font-bold text-cyan-300">
                Geo Coordinates
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden border-2 border-gray-700">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    lon - 0.05
                  }%2C${lat - 0.05}%2C${lon + 0.05}%2C${
                    lat + 0.05
                  }&layer=mapnik&marker=${lat}%2C${lon}`}
                  width="100%"
                  height="400"
                  style={{ border: "none" }}
                  title="Location Map"
                ></iframe>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 flex flex-col justify-center">
                <div className="text-center space-y-4">
                  <div className="text-xl font-semibold text-cyan-300">
                    Precise Location
                  </div>
                  <div className="text-3xl font-bold">
                    <span className="text-cyan-500">Lat:</span> {lat}
                    <br />
                    <span className="text-cyan-500">Lon:</span> {lon}
                  </div>
                  <Button
                    onClick={() => {
                      const coordinates = `${lat}, ${lon}`;
                      copyToClipboard(coordinates);
                    }}
                    className="mt-4 bg-cyan-600 hover:bg-cyan-500"
                  >
                    <Copy className="mr-2 h-4 w-4" /> Copy Coordinates
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
