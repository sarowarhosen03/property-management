import { Users } from "@/lib/db/type";
import { User } from "@/types/userType";
import { FC } from "react";

type UserDetailsProps = {
  user: User;
  userDict: Users;
};

const UserSummary: FC<UserDetailsProps> = ({ user, userDict }) => {
  const { bio, _id: id, firstName, lastName, branchId = {} } = user || {};
  const branchName = branchId?.name;

  return (
    <div className="col-span-2 flex flex-col rounded-xl border border-secondary-100">
      <div className="border-b border-secondary-100 px-5 py-3">
        <h3 className="font-semibold">{userDict.AgentDetails}</h3>
      </div>
      <div className="px-5 py-3">
        <div className="text-sm">
          <p>{bio}</p>

          <div className="mt-6 flex flex-col rounded-xl border border-secondary-100 text-xs font-medium">
            <div className="flex justify-between border-b border-secondary-100 px-3 py-2 last:border-b-0">
              <span>{userDict.IdentificationNumber}</span>
              <strong>{id}</strong>
            </div>

            <div className="flex justify-between border-b border-secondary-100 px-3 py-2 last:border-b-0">
              <span className="capitalize">{userDict.NAME}</span>
              <strong>
                {firstName} {lastName}
              </strong>
            </div>

            <div className="flex justify-between border-b border-secondary-100 px-3 py-2 last:border-b-0">
              <span>{userDict.Branch}</span>
              <strong>{branchName && branchName}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSummary;
