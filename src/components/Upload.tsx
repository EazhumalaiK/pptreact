import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { components } from "react-select";

type ReportType = "Report 1" | "Report 2" | "Report 3" | "Report 4";
type RecommendationCategory = "Format" | "Numeric" | "Language" | "Narrative";

interface FileInfo {
  name: string;
  size: number;
  slideCount: number;
}

const Upload: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>("Report 1");
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [selectedRecommendations, setSelectedRecommendations] = useState<
    RecommendationCategory[]
  >([]);
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate(); // React Router hook to navigate

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files ? e.target.files[0] : null;
    if (uploadedFile && uploadedFile.name.endsWith(".pptx")) {
      // Handle PPT file upload (you can extract info here using a library)
      setFile(uploadedFile);

      // Simulating extracting file info like slide count
      const fileInfo = {
        name: uploadedFile.name,
        size: uploadedFile.size,
        slideCount: 10, // This would be dynamically calculated from the PPT file
      };

      setFileInfo(fileInfo);
    } else {
      alert("Please upload a valid PPT file.");
    }
  };

  const handleRecommendationChange = (selectedOptions: any) => {
    setSelectedRecommendations(
      selectedOptions ? selectedOptions.map((option: any) => option.value) : []
    );
  };

  // Handle Start button click to navigate to the Review page
  const handleStartReview = () => {
    // Navigate to the review page
    navigate("/recommendations");
  };

  return (
    <div className="p-8 space-y-8 bg-gray-100 rounded-lg shadow-xl">
      {/* Row Layout - Start */}
      <div className="flex items-center gap-8">
        {/* Report Dropdown */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-300">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Report
          </label>
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value as ReportType)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="Report 1">Report 1</option>
            <option value="Report 2">Report 2</option>
            <option value="Report 3">Report 3</option>
            <option value="Report 4">Report 4</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-300">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload PPT
          </label>
          <input
            type="file"
            accept=".pptx"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Recommendations - Multi-select dropdown */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-300">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Recommendations
          </label>
          <Select
            isMulti
            options={[
              { value: "Format", label: "Format" },
              { value: "Numeric", label: "Numeric" },
              { value: "Language", label: "Language" },
              { value: "Narrative", label: "Narrative" },
            ]}
            value={selectedRecommendations.map((val) => ({
              value: val,
              label: val,
            }))}
            onChange={handleRecommendationChange}
            className="w-full"
            classNamePrefix="custom-select"
            components={{
              MultiValue: (props: any) => {
                return (
                  <components.MultiValue {...props}>
                    <div className="px-2 py-1 bg-orange-100 rounded-lg text-sm font-medium">
                      {props.data.label}
                    </div>
                  </components.MultiValue>
                );
              },
            }}
          />
        </div>

        {/* Start Review Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleStartReview}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Review
          </button>
        </div>
      </div>
      {/* Row Layout - End */}

      {/* File Info Section */}
      {fileInfo && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            File Info
          </h3>
          <p className="text-sm text-gray-600">Name: {fileInfo.name}</p>
          <p className="text-sm text-gray-600">
            Size: {Math.round(fileInfo.size / 1024)} KB
          </p>
          <p className="text-sm text-gray-600">
            Number of Slides: {fileInfo.slideCount}
          </p>
        </div>
      )}
    </div>
  );
};

export default Upload;
