import { auth } from "@/auth";
import { API_URL } from "@/config/site";
import { AgentType } from "@/lib/AgentSchema";
import { ApiResponse } from "@/types";
import Image from "next/image";
import { AgentContact } from "./AgentContact";

async function getAgent(
  token: string,
  agentId: string,
): Promise<ApiResponse<AgentType>> {
  const agentResponse = await fetch(`${API_URL}/users/${agentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  if (!agentResponse.ok) {
    throw new Error(`Failed to fetch agent details for agentId ${agentId}`);
  }

  const agetData = await agentResponse.json();
  if (!agetData.success) {
    console.log("Failed to fetch agent details");
  }
  return agetData;
}

export const AgentInfo = async ({ agentId }: { agentId: string }) => {
  const session = await auth();
  const token = session?.user.token as string;

  const { data: agent } = await getAgent(token, agentId);
  const { firstName, lastName, avatar, phoneNumbers } = agent || {};

  return (
    <div className="flex flex-col">
      <div className="property__agent flex gap-4 rounded-2xl bg-white p-6 lg:border-t-0 2xl:p-10">
        <div className="relative w-[205px] overflow-hidden rounded-2xl bg-gray-100">
          {avatar && (
            <Image
              src={avatar}
              width={205}
              height={243}
              alt={`${firstName} ${lastName}`}
              className="bg-[#9f9aa6] object-cover"
            />
          )}
        </div>
        <div className="flex w-full flex-col pt-4">
          <h4 className="text-sm font-semibold 2xl:text-lg">
            {firstName} {lastName}
          </h4>
          <div className="mt-6 flex flex-col gap-5 text-sm 2xl:text-lg">
            <AgentContact phoneNumbers={phoneNumbers} />
          </div>
        </div>
      </div>
    </div>
  );
};
