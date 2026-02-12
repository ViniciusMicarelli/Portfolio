import * as React from "react";
import { Toaster as Sonner } from "sonner";
import { toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      theme="dark"
      className="toaster group"
      style={{ zIndex: 9999 }}
      toastOptions={{
        style: {
          background: "rgba(34, 160, 72, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          color: "#fff",
          borderRadius: "12px",
          padding: "12px 20px",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center" as const,
        },
        classNames: {
          toast: "group toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
