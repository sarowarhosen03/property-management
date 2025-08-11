"use client";
import { toast } from "sonner";

// Close button SVG icon
const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 4.00004L4 14M3.99996 4L13.9999 14"
      stroke="#979FA9"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// This is the custom Toast component
const ToastContent = ({
  type,
  title,
  message,
  actionText,
  onAction,
  onClose,
}) => {
  const toastStyles = {
    error: {
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      borderColor: "border-red-300",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="6" fill="#FF453A" />
          <path
            d="M15 9.00002L9 15M8.99997 9L14.9999 15"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    success: {
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-300",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="6" fill="#30D158" />
          <path
            d="M8.5 12.5L10.5 14.5L15.5 9.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    info: {
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-300",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="6" fill="#625676" />
          <path
            d="M12 16V11"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="1"
            cy="1"
            r="1"
            transform="matrix(1 0 0 -1 11 9)"
            fill="white"
          />
        </svg>
      ),
    },
    warning: {
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-300",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="24"
            height="24"
            rx="6"
            fill="url(#paint0_linear_89_29050)"
          />
          <path
            d="M12 9V14"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="17" r="1" fill="white" />
          <defs>
            <linearGradient
              id="paint0_linear_89_29050"
              x1="12"
              y1="0"
              x2="12"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DBA948" />
              <stop offset="0.0001" stopColor="#FFC46B" />
              <stop offset="1" stopColor="#FFA318" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
  };

  const { bgColor, textColor, borderColor, icon } = toastStyles[type] || {};

  return (
    <div
      className={`w-full p-4 ${bgColor} ${borderColor} ${textColor} flex items-center justify-between rounded-lg border`} // Adjusted for width and padding
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      {type === "success" || type === "warning" ? (
        <button onClick={onClose} className="ml-2 flex-shrink-0">
          <CloseIcon />
        </button>
      ) : null}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1 font-semibold text-gray-600 hover:bg-gray-100"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

// Wrapper function to use Sonner's toast and display the custom ToastContent component
export function showToast({
  type,
  title,
  message,
  actionText,
  onAction,
  duration = 2000,
}: {
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  duration?: number;
}) {
  const closeToast = () => {
    // Logic to close the toast should go here
    toast.dismiss(); // Call this if using Sonner's toast.dismiss() method
  };
  toast.dismiss();
  toast(
    <ToastContent
      type={type}
      title={title}
      message={message}
      actionText={actionText}
      onAction={onAction}
      onClose={closeToast} // Pass the close function
    />,
    {
      duration, // Adjust the duration as needed
      // You can also add additional options here if necessary
    },
  );
}
// LoaderToast component
function LoaderToast({ title, message }) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-lg border p-4`}
    >
      <div className="space-x-4">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
export default ToastContent;
