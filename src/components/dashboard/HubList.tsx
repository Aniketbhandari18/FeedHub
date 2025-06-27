import prisma from "@/lib/prisma";
import DashboardCard from "./DashboardCard";
import { getDbUserId } from "@/lib/getDbUserId";

// TODO: Add OpenFeedback too

const HubList = async () => {
  const dbUserId = await getDbUserId();
  console.log("DB User ID:", dbUserId);

  const hubs = await prisma.hubUser.findMany({
    where: { userId: dbUserId },
    orderBy: { joinedAt: "desc" },
    include: { 
      hub: {
        include: {
          _count: {
            select: { users: true } // this gives the member count
          }
        }
      }
    }
  });

  return (
    <div>
      {hubs.map(({ hub, role, displayName }, idx) => (
        <div key={idx} className="mb-4">
          <DashboardCard
            title={hub.title}
            description={hub.description}
            role={role}
            roleDisplayName={displayName}
            createdOn={new Date(Date.now())}
            memberCount={hub._count.users}
            feedbackSpaceCount={2} // need to change later
            type="hub"
          />
        </div>
      ))}
    </div>
  )
}
export default HubList;