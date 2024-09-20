import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import TeamMembersTable from "@/components/Tables/TeamMembersTable";

const Page = async () => {
  return (
    <div>
      <NavBar />
      <TeamMembersTable />
    </div>
  );
};

export default Page;
