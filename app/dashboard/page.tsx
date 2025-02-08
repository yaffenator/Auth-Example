import { auth } from "@/auth";

const DashboardPage = async () => {
    const session = await auth();
    console.log(session)
    return (
        <div className="mt-5 flex justify-center">Dashboard Page</div>
    )
}

export default DashboardPage;