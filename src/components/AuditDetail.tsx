import React from "react";
import { useParams } from "react-router-dom";

// Dummy Data with Recommendations Categories
const dummyDetails = {
  1: {
    fileName: "Report 1",
    numberOfSlides: 20,
    size: "15MB",
    uploadedOn: "2023-07-15",
    uploadedBy: "John Doe",
    totalRecommendations: 5,
    totalApprovals: 3,
    totalRejections: 2,
    totalVersions: 2,
    versions: [
      { version: "v1.0", date: "2023-07-10", updatedBy: "John Doe" },
      { version: "v1.1", date: "2023-07-15", updatedBy: "Jane Smith" },
    ],
    approvalHistory: [
      {
        approvedBy: "John Doe",
        date: "2023-07-11",
        recommendationCategory: "Format",
      },
      {
        approvedBy: "Jane Smith",
        date: "2023-07-16",
        recommendationCategory: "Numeric",
      },
    ],
    rejectionHistory: [
      {
        rejectedBy: "Alex Brown",
        date: "2023-07-12",
        recommendationCategory: "Language",
      },
    ],
  },
  2: {
    fileName: "Report 2",
    numberOfSlides: 30,
    size: "22MB",
    uploadedOn: "2023-08-12",
    uploadedBy: "Jane Smith",
    totalRecommendations: 7,
    totalApprovals: 5,
    totalRejections: 2,
    totalVersions: 3,
    versions: [
      { version: "v1.0", date: "2023-08-05", updatedBy: "Jane Smith" },
      { version: "v1.1", date: "2023-08-12", updatedBy: "John Doe" },
      { version: "v1.2", date: "2023-08-14", updatedBy: "Alice Johnson" },
    ],
    approvalHistory: [
      {
        approvedBy: "John Doe",
        date: "2023-08-06",
        recommendationCategory: "Narrative",
      },
      {
        approvedBy: "Jane Smith",
        date: "2023-08-15",
        recommendationCategory: "Format",
      },
    ],
    rejectionHistory: [
      {
        rejectedBy: "Alex Brown",
        date: "2023-08-07",
        recommendationCategory: "Numeric",
      },
    ],
  },
};

const AuditDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const fileDetails = dummyDetails[Number(id)];

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Audit Detail
      </h2>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-sm text-gray-600">
            File Name: {fileDetails.fileName}
          </div>
          <div className="text-sm text-gray-600">
            No. of Slides: {fileDetails.numberOfSlides}
          </div>
          <div className="text-sm text-gray-600">Size: {fileDetails.size}</div>
          <div className="text-sm text-gray-600">
            Uploaded On: {fileDetails.uploadedOn}
          </div>
          <div className="text-sm text-gray-600">
            Uploaded By: {fileDetails.uploadedBy}
          </div>
          <div className="text-sm text-gray-600">
            Total Recommendations: {fileDetails.totalRecommendations}
          </div>
          <div className="text-sm text-gray-600">
            Total Approvals: {fileDetails.totalApprovals}
          </div>
          <div className="text-sm text-gray-600">
            Total Rejections: {fileDetails.totalRejections}
          </div>
          <div className="text-sm text-gray-600">
            Total Versions: {fileDetails.totalVersions}
          </div>
        </div>
      </div>

      {/* Version History */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Version History
        </h4>
        <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Version
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Updated By
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {fileDetails.versions.map((version, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gradient-to-r from-blue-100 to-blue-200 transition-all duration-300"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {version.version}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {version.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {version.updatedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval History */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Approval History
        </h4>
        <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Approved By
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Recommendation Category
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {fileDetails.approvalHistory.map((approval, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gradient-to-r from-green-100 to-green-200 transition-all duration-300"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {approval.approvedBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {approval.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {approval.recommendationCategory}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection History */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Rejection History
        </h4>
        <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-red-500 to-red-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Rejected By
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Recommendation Category
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {fileDetails.rejectionHistory.map((rejection, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gradient-to-r from-red-100 to-red-200 transition-all duration-300"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {rejection.rejectedBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {rejection.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {rejection.recommendationCategory}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditDetail;
