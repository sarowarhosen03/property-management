"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "./common/toaster/toaster";

export default function ToastNotifications() {
  const showErrorToast = () => {
    showToast({
      type: "error",
      title: "Error occurred",
      message: "Sorry, please try again later.",
      actionText: "Try again",
      onAction: () => console.log("Trying again..."),
    });
  };

  const showSuccessToast = () => {
    showToast({
      type: "success",
      title: "Message sent",
      message: "Your message has been sent. We'll get back to you soon.",
    });
  };

  const showInfoToast = () => {
    showToast({
      type: "info",
      title: "Scheduled maintenance",
      message:
        "Our website will be undergoing scheduled maintenance tonight from 10 PM to 2 AM.",
    });
  };

  const showWarningToast = () => {
    showToast({
      type: "warning",
      title: "Subscription expiring",
      message:
        "Your subscription is about to expire in 3 days. Renew now to avoid any service interruptions.",
    });
  };

  return (
    <div className="mx-auto mt-8 max-w-md space-y-4">
      <h2 className="mb-4 text-2xl font-bold">Toast Notifications</h2>
      <Button onClick={showErrorToast} variant="destructive">
        Show Error Toast
      </Button>
      <Button onClick={showSuccessToast} variant="default">
        Show Success Toast
      </Button>
      <Button onClick={showInfoToast} variant="secondary">
        Show Info Toast
      </Button>
      <Button onClick={showWarningToast} variant="outline">
        Show Warning Toast
      </Button>
    </div>
  );
}
