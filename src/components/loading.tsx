// components/Loading.tsx
import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[rgb(24,26,42)]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
};

export default Loading;
