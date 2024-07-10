
import { cookies } from "next/headers";
import axios from "axios";


import Settingcomponenets from "./settingcompoenets";
import apiUrl from "@/config";

const TeacherSettingsPage = async () => {
  const email = cookies().get("email")?.value;
  const fetchUser = async () => {
    const data = axios.get(`${apiUrl}/api/auth/user/${email}`);
    console.log(data);
    return data;
  };
  const user = await fetchUser();
  console.log(user);

  return (
    <>
      <Settingcomponenets user={user.data} />
    </>
  );
};
export default TeacherSettingsPage;
