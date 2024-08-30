import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Loading({ children }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 8000);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 80);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-[100vw] h-[100vh] overflow-hidden">
      {children}
      {loading && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#242a58]  z-50">
          <LoadComponent />
          <div className="w-24 h-2 mt-4 overflow-hidden bg-gray-600 rounded-full">
            <div
              className="bg-[#c8c8c8] h-full w-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadComponent() {
  return (
    <img
      className="ml-6"
      src="/navbar/icon.svg"
      width={100}
      height={100}
      alt="Loading icon"
    />
  );
}

Loading.propTypes = {
  children: PropTypes.node.isRequired,
};
