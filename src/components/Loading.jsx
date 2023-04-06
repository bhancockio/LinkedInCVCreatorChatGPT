import React from "react";

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <svg
          className="mx-auto mb-4 h-16 w-16 animate-spin text-[#74aa9c]"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 01-8 8V24c10.627 0 16-5.373 16-12h-4zm-8-8a4 4 0 014-4V0c-2.21 0-4 1.79-4 4h4z"
          />
        </svg>
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
