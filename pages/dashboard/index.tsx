import ValorantCoachDashboard from "@/app/membersonly/page";
import {withPageAuthRequired } from "@auth0/nextjs-auth0";

const Dashboard = () => {
    return (
        <ValorantCoachDashboard />
    );
}

export default Dashboard;
export const getServerSideProps = withPageAuthRequired()