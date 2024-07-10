import { cookies } from "next/headers";
import axios from "axios";
import apiUrl from '@/config';
import Settingcomponenets from "../../teacher/settings/settingcompoenets";
import ParentSetting from "./parentseeting";

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
      <ParentSetting user={user.data} />
    </>
  );
};
export default TeacherSettingsPage;
