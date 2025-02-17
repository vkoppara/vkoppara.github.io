import React from "react";

const DownloadCSVButton = () => {
  const jsonData = [
    {
      name: "John Doe",
      age: 30,
      address: { city: "New York", zip: "10001" },
      skills: ["JavaScript", "React"],
      experience: [
        { company: "Google", years: 3 },
        { company: "Microsoft", years: 2 }
      ]
    },
    {
      name: "Jane Smith",
      age: 25,
      address: { city: "Los Angeles", zip: "90001" },
      skills: ["Python", "Django"],
      experience: [
        { company: "Facebook", years: 4 }
      ]
    }
  ];

  // Function to flatten JSON objects including array of objects
  const flattenObject = (obj, prefix = "") => {
    let flattened = {};

    for (let key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        // Recursively flatten nested objects
        Object.assign(flattened, flattenObject(obj[key], prefix + key + "_"));
      } else if (Array.isArray(obj[key])) {
        if (obj[key].length > 0 && typeof obj[key][0] === "object") {
          // If the array contains objects, flatten them separately
          obj[key].forEach((item, index) => {
            Object.assign(flattened, flattenObject(item, `${prefix}${key}_${index + 1}_`));
          });
        } else {
          // Convert simple arrays to comma-separated values
          flattened[prefix + key] = obj[key].join(", ");
        }
      } else {
        flattened[prefix + key] = obj[key];
      }
    }

    return flattened;
  };

  const convertToCSV = (data) => {
    const flatData = data.map(item => flattenObject(item));
    const headers = Object.keys(flatData[0]).join(",") + "\n"; // Extract headers
    const rows = flatData.map(row => Object.values(row).join(",")).join("\n"); // Convert rows to CSV format
    return headers + rows;
  };

  const downloadCSV = () => {
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


import React from "react";

// Define the JSON data type (optional but recommended)
type JSONData = Record<string, any>[];

interface DownloadCSVButtonProps {
  jsonData: JSONData;
}

const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({ jsonData }) => {
  // Function to flatten nested JSON objects, including arrays
  const flattenObject = (obj: Record<string, any>, prefix = ""): Record<string, any> => {
    let flattened: Record<string, any> = {};

    for (let key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        // Recursively flatten nested objects
        Object.assign(flattened, flattenObject(obj[key], `${prefix}${key}_`));
      } else if (Array.isArray(obj[key])) {
        if (obj[key].length > 0 && typeof obj[key][0] === "object") {
          // If the array contains objects, flatten them separately
          obj[key].forEach((item, index) => {
            Object.assign(flattened, flattenObject(item, `${prefix}${key}_${index + 1}_`));
          });
        } else {
          // Convert simple arrays to comma-separated values
          flattened[`${prefix}${key}`] = obj[key].join(", ");
        }
      } else {
        flattened[`${prefix}${key}`] = obj[key];
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
