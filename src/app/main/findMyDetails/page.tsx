"use client";
import React, { useState, useEffect } from "react";
import { Globe, MapPin, Network, Flag, Server, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

export default function IpTracker() {
  const [data, setData] = useState<IpData | null>(null);
  const [ip, setIp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [flagUrl, setFlagUrl] = useState<string | null>(null);

  const getIpDetails = async () => {
    try {
      const response = await fetch(`https://ipinfo.io/${ip}/geo`);
      if (!response.ok) {
        throw new Error("Failed to fetch IP details");
      }
      const data1: IpData = await response.json();
      setData(data1);

      if (data1.country) {
        const flag = `https://flagsapi.com/${data1.country}/flat/64.png`;
        setFlagUrl(flag);
      }
    } catch (err) {
      setError("Could not fetch IP details. Please try again.");
      console.error(err);
    }
  };

  const handleGetIp = async () => {
    try {
      setError("");
      const response = await fetch("https://api.ipify.org/?format=json");
      if (!response.ok) {
        throw new Error("Failed to fetch IP address");
      }
      const data2: { ip: string } = await response.json();
      setIp(data2.ip);
      await getIpDetails();
    } catch (err) {
      setError("Could not fetch IP address. Please try again.");
      console.error(err);
    }
  };

  const location = data?.loc ? data.loc.split(",") : [null, null];
  const lat = location[0] ? parseFloat(location[0]) : null;
  const lon = location[1] ? parseFloat(location[1]) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* IP Details Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6 bg-gray-900/50 p-6 rounded-xl"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Network className="w-10 h-10 text-cyan-400" />
              <h2 className="text-3xl font-bold text-cyan-300">IP Insights</h2>
            </div>

            {flagUrl && (
              <div className="flex justify-center mb-4">
                <img
                  src={flagUrl}
                  alt="Country Flag"
                  className="w-20 h-20 hover:scale-110 transition-transform"
                />
              </div>
            )}

            {data ? (
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  {
                    icon: <Globe className="w-5 h-5 text-cyan-500" />,
                    label: "IP",
                    value: ip,
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
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg"
                  >
                    {item.icon}
                    <div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                      <div className="font-semibold">{item.value || "N/A"}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 italic">
                Waiting to uncover digital coordinates...
              </div>
            )}

            <div className="flex justify-center mt-6">
              <Button
                onClick={handleGetIp}
                className="bg-cyan-600 hover:bg-cyan-500 text-white transition-colors duration-300"
              >
                Trace My Digital Footprint
              </Button>
            </div>
          </motion.div>

          {/* Map Section */}
          {lat && lon && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gray-900/50 p-6 rounded-xl flex flex-col"
            >
              <div className="flex items-center justify-center space-x-4 mb-6">
                <MapPin className="w-10 h-10 text-cyan-400" />
                <h2 className="text-3xl font-bold text-cyan-300">
                  Geo Coordinates
                </h2>
              </div>
              <div className="flex-grow rounded-lg overflow-hidden border-2 border-gray-700">
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
              <div className="mt-4 text-center text-sm text-gray-400">
                Latitude: {lat} | Longitude: {lon}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
