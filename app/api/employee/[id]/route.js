import connectMongoDB from "@/database/mongodb";
import Employees from "@/models/employees";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newName: name,
    newEmail: email,
    newMobileNo: mobileNo,
    newDesignation: designation,
    newGender: gender,
    newCourses: courses,
    newDate: date,
  } = await request.json();
  await connectMongoDB();
  await Employees.findByIdAndUpdate(id, {
    name,
    email,
    mobileNo,
    designation,
    gender,
    courses,
    date,
  });
  return NextResponse.json({ message: "Employee updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const employee = await Employees.findOne({ _id: id });
  return NextResponse.json({ employee }, { status: 200 });
}
