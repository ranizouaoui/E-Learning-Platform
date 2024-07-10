import { useCookies } from "next-client-cookies";

export function signOut() {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
