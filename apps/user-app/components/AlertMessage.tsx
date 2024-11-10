interface AlertMessageProps {
  description: string;
  status: "success" | "failure"; // Status prop to control color
}

export function alertMessage({ description, status }: AlertMessageProps) {

  const alertColors = 
    status === "success"
      ? "bg-blue-500"
      : "bg-red-500";

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 max-w-sm p-4 text-white rounded-lg shadow-lg transition-all transform ease-in-out duration-300 
        ${alertColors}
      `}
    >
      <div className="text-sm font-medium">{description}</div>
    </div>
  );
}
