import React from "react";

// Define the JSON structure using TypeScript
type Address = {
  city: string;
  zip: string;
};

type Experience = {
  company: string;
  years: number;
};

type Person = {
  name: string;
  age: number;
  address: Address;
  skills: string[];
  experience: Experience[]; // This field will remain as an array in CSV
};

type JSONData = Person[];

interface DownloadCSVButtonProps {
  jsonData: JSONData;
}

const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({ jsonData }) => {
  // Field to keep in array format (instead of flattening)
  const keepAsArray = "experience"; // Change this field as needed

  const flattenObject = (obj: Record<string, any>, prefix = ""): Record<string, string> => {
    let flattened: Record<string, string> = {};

    for (let key in obj) {
      if (key === keepAsArray) {
        // Serialize the array into a JSON string and keep it in a single field
        flattened[key] = `"${JSON.stringify(obj[key]).replace(/"/g, '""')}"`;
      } else if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
        // Recursively flatten nested objects
        Object.assign(flattened, flattenObject(obj[key], `${prefix}${key}_`));
      } else if (Array.isArray(obj[key])) {
        // Convert arrays to comma-separated values enclosed in double quotes
        flattened[`${prefix}${key}`] = `"${obj[key].join(", ")}"`;
      } else {
        // Ensure all values are strings and escape double quotes
        flattened[`${prefix}${key}`] = `"${String(obj[key]).replace(/"/g, '""')}"`;
      }
    }

    return flattened;
  };

  const convertToCSV = (data: JSONData): string => {
    if (!data || data.length === 0) return "";

    const flatData = data.map(item => flattenObject(item));
    const headers = Object.keys(flatData[0]).join(",") + "\n"; // Extract headers
    const rows = flatData.map(row => Object.values(row).join(",")).join("\n"); // Convert rows to CSV format
    return headers + rows;
  };

  const downloadCSV = () => {
    if (!jsonData || jsonData.length === 0) {
      alert("No data available for download");
      return;
    }

    const csvString = convertToCSV(jsonData);
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv"; // File name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return <button onClick={downloadCSV}>Download CSV</button>;
};

export default DownloadCSVButton;
