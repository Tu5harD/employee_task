"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Image from "next/image";
const TeamMembersTable = () => {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  const getEmployees = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/employee", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await res.json();
      setEmployees(data.employees);
    } catch (error) {
      console.error("Error loading employees: ", error);
    }
  };

  const removeEmployee = async (id) => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/employee?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <section className="container px-4 mx-auto py-2">
      <div className="flex items-center justify-between gap-x-3">
        <div className="flex items-center justify-between gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Team members
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {employees.length} users
          </span>
        </div>
        <Link href="/createemployee">
          <button className="w-44 px-6 py-2.5 text-sm tracking-wide font-bold text-white capitalize transition-colors duration-300 transform bg-blue-800 rounded-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Create Employee
          </button>
        </Link>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                      Image
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                      Name
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                      Email address
                    </th>
                    <th className="px-4 py-3.5 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                      Mobile No.
                    </th>
                    <th className="px-4 py-3.5 text-sm text-center font-normal text-gray-500 dark:text-gray-400">
                      Designation
                    </th>
                    <th className="px-4 py-3.5 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                      Gender
                    </th>
                    <th className="px-4 py-3.5 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                      Course
                    </th>
                    <th className="px-4 py-3.5 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                      Create Date
                    </th>
                    <th className="px-4 py-3.5 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {employees.map((member) => (
                    <tr key={member._id}>
                      <td className="px-4 py-4 text-center text-sm font-medium text-gray-700 whitespace-nowrap flex items-center justify-center">
                        <Image
                          height={500}
                          width={500}
                          class="w-16 h-16"
                          src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84587/preview.svg"
                          alt=""
                        />
                      </td>
                      <td className="px-4 py-4 text-center text-sm font-medium text-gray-700 whitespace-nowrap f">
                        {member.name}
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {member.email}
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {member.mobileNo}
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {member.designation}
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {member.gender}
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {member.courses.join(", ")}
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {format(new Date(member.date), "MM/dd/yyyy")}
                      </td>
                      <td className="px-4 py-4 text-center text-sm whitespace-nowrap">
                        <button
                          onClick={() => removeEmployee(member._id)}
                          className="text-gray-500 mx-2 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-13.456 0m0 0c-.34-.059-.68-.114-1.022-.165m1.022.165L5.84 19.673a2.25 2.25 0 002.244 2.077h7.832a2.25 2.25 0 002.244-2.077L19.228 5.79z"
                            />
                          </svg>
                        </button>
                        <Link href={`/updateemployee/${member._id}`}>
                          <button className="text-gray-500 mx-2 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMembersTable;
