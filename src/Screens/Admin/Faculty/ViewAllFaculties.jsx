import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseApiURL } from "../../../baseUrl";
import { CSVLink } from 'react-csv';

const ViewAllFaculties = () => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    axios.get(`${baseApiURL()}/faculty/details/getAllFaculties`)
      .then(response => {
        if (response.data.success) {
          setFaculties(response.data.faculties);
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
    { label: 'Employee ID', key: 'employeeId' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Department', key: 'department' },
    { label: 'Gender', key: 'gender' },
    { label: 'Post', key: 'post' },
    { label: 'Experience', key: 'experience' },
  ];

  const csvData = faculties.map((faculty, index) => ({
    index: index + 1,
    name: `${faculty.firstName} ${faculty.middleName || '-' } ${faculty.lastName}`,
    employeeId: faculty.employeeId,
    email: faculty.email,
    phoneNumber: faculty.phoneNumber,
    department: faculty.department,
    gender: faculty.gender,
    post: faculty.post,
    experience: faculty.experience,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Registered Faculties</h1>
      <div className="mb-4">
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename={'faculties_data.csv'}
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
              <th className="py-3 px-4 border-b border-r">Employee ID</th>
              <th className="py-3 px-4 border-b border-r">Email</th>
              <th className="py-3 px-4 border-b border-r">Phone Number</th>
              <th className="py-3 px-4 border-b border-r">Department</th>
              <th className="py-3 px-4 border-b border-r">Gender</th>
              <th className="py-3 px-4 border-b border-r">Post</th>
              <th className="py-3 px-4 border-b border-r">Experience</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((faculty, index) => (
              <tr key={faculty.employeeId}>
                <td className="py-2 px-4 border-b border-r">{index + 1}</td>
                <td className="py-2 px-4 border-b border-r">{`${faculty.firstName} ${faculty.middleName || '-' } ${faculty.lastName}`}</td>
                <td className="py-2 px-4 border-b border-r">{faculty.employeeId}</td>
                <td className="py-2 px-4 border-b border-r">{faculty.email}</td>
                <td className="py-2 px-4 border-b border-r">{faculty.phoneNumber}</td>
                <td className="py-2 px-4 border-b border-r">{faculty.department}</td>
                <td className="py-2 px-4 border-b border-r">{faculty.gender}</td>
                <td className="py-2 px-4 border-b border-r">{faculty.post}</td>
                <td className="py-2 px-4 border-b border-r">{faculty.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllFaculties;
