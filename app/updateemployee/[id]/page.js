import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import EmployeeUpdateForm from "@/components/UpdateEmployee/updateemployee";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function page({ params }) {
  const { id } = params;
  const employeeData = await getTopicById(id);
  if (!employeeData) {
    return <div>Error loading employee data.</div>;
  }

  const { employee } = employeeData;

  if (!employee) {
    return <div>No employee found.</div>;
  }

  const { name, email, mobileNo, designation, gender, courses, date } =
    employee;

  return (
    <>
      <NavBar />
      <EmployeeUpdateForm
        id={id}
        name={name}
        email={email}
        mobileNo={mobileNo}
        designation={designation}
        gender={gender}
        courses={courses}
        date={date}
      />
      <Footer />
    </>
  );
}
