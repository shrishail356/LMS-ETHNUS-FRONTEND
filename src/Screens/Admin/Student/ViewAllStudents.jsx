import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseApiURL } from "../../../baseUrl";
import { CSVLink } from 'react-csv';
const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`${baseApiURL()}/student/details/getAllDetails`)
      .then(response => {
        if (response.data.success) {
          setStudents(response.data.students);
        } else {
          console.error(response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const csvHeaders = [
    { label: 'Sl No', key: 'index' },
    { label: 'Name', key: 'name' },
    { label: 'Enrollment No', key: 'enrollmentNo' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Semester', key: 'semester' },
    { label: 'Branch', key: 'branch' },
    { label: 'Gender', key: 'gender' },
  ];

  const csvData = students.map((student, index) => ({
    index: index + 1,
    name: `${student.firstName} ${student.middleName || '-' } ${student.lastName}`,
    enrollmentNo: student.enrollmentNo,
    email: student.email,
    phoneNumber: student.phoneNumber,
    semester: student.semester,
    branch: student.branch,
    gender: student.gender,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Registered Students</h1>
      <div className="mb-4">
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename={'students_data.csv'}
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Download CSV
        </CSVLink>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-r">Sl No</th>
              <th className="py-3 px-4 border-b border-r">Name</th>
              <th className="py-3 px-4 border-b border-r">Enrollment No</th>
              <th className="py-3 px-4 border-b border-r">Email</th>
              <th className="py-3 px-4 border-b border-r">Phone Number</th>
              <th className="py-3 px-4 border-b border-r">Semester</th>
              <th className="py-3 px-4 border-b border-r">Branch</th>
              <th className="py-3 px-4 border-b border-r">Gender</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.enrollmentNo}>
                <td className="py-3 px-4 border-b border-r">{index + 1}</td>
                <td className="py-3 px-4 border-b border-r">{`${student.firstName} ${student.middleName || '-' } ${student.lastName}`}</td>
                <td className="py-3 px-4 border-b border-r">{student.enrollmentNo}</td>
                <td className="py-3 px-4 border-b border-r">{student.email}</td>
                <td className="py-3 px-4 border-b border-r">{student.phoneNumber}</td>
                <td className="py-3 px-4 border-b border-r">{student.semester}</td>
                <td className="py-3 px-4 border-b border-r">{student.branch}</td>
                <td className="py-3 px-4 border-b border-r">{student.gender}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllStudents;
