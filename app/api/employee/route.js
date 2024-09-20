import connectMongoDB from "@/database/mongodb";
import Employees from "@/models/employees";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, mobileNo, designation, gender, courses, date } =
    await request.json();
  await connectMongoDB();
  await Employees.create({
    name,
    email,
    mobileNo,
    designation,
    gender,
    courses,
    date,
  });
  return NextResponse.json({ message: "Employee Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const employees = await Employees.find();
  return NextResponse.json({ employees });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Employees.findByIdAndDelete(id);
  return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
}
