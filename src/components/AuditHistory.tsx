import React from "react";
import { Link } from "react-router-dom";

const dummyData = [
  {
    id: 1,
    fileName: "Report 1",
    numberOfSlides: 20,
    size: "15MB",
    uploadedOn: "2023-07-15",
    uploadedBy: "John Doe",
    totalRecommendations: 5,
    totalApprovals: 3,
    totalRejections: 2,
    totalVersions: 2,
  },
  {
    id: 2,
    fileName: "Report 2",
    numberOfSlides: 30,
    size: "22MB",
    uploadedOn: "2023-08-12",
    uploadedBy: "Jane Smith",
    totalRecommendations: 7,
    totalApprovals: 5,
    totalRejections: 2,
    totalVersions: 3,
  },
  // Add more dummy data as required
];

const AuditHistory: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Audit History
      </h2>

      <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium">
                File Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">
                No. of Slides
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">Size</th>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Uploaded On
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Uploaded By
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Total Recommendations
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Total Approvals
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Total Rejections
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {dummyData.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gradient-to-r from-blue-100 to-blue-200 transition-all duration-300"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  {item.fileName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.numberOfSlides}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.size}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.uploadedOn}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.uploadedBy}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.totalRecommendations}
                </td>
                <td className="px-6 py-4 text-sm text-green-600">
                  {item.totalApprovals}
                </td>
                <td className="px-6 py-4 text-sm text-red-600">
                  {item.totalRejections}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <Link
                    to={`/audit-detail/${item.id}`}
                    className="text-blue-500 hover:text-blue-700 font-semibold transition-colors"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditHistory;
