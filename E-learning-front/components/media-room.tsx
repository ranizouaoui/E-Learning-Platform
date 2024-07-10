"use client";

import "@livekit/components-styles";

import React from "react";

import { User } from "@/types";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

interface MediaRoomProps {
  user: User;
}

export function MediaRoom({ user }: MediaRoomProps) {
  const room = "quickstart-room";
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    if (!user) return;

    //@ts-ignore
    const name = user.firstname + user.lastname;

    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${name}`,
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user]);

  if (token === "") {
    return <div>Getting token...</div>;
  }
  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: "100dvh" }}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
