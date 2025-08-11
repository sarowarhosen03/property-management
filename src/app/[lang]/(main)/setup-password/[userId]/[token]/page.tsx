import { langType } from "../../../page";
import SetupPassword from "./_components/SetupPassword";

type SetupPageProps = {
  params: {
    lang: langType;
    userId: string;
    token: string;
  };
};

const SetUpPage = ({ params }: SetupPageProps) => {
  const { lang, userId, token } = params;
  return (
    <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center py-20">
      <div className="container">
        <SetupPassword userId={userId} token={token} />
      </div>
    </div>
  );
};

export default SetUpPage;
