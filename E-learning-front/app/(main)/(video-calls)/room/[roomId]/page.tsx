import { GhostIcon } from "lucide-react";

import SingleRoomPage from "./_components/singlerrompage";

const Page = async (params: {
  params: {
    roomId: string;
  };
}) => {
  return (
    <>
      <SingleRoomPage />
    </>
  );
};

export default Page;
