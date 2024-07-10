"use client";

import { useParams, useRouter } from "next/navigation";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const SingleRoomPage = () => {
  const { roomId } = useParams();
  const router = useRouter();
  const roomID = useRef(getUrlParams().get("roomID") || randomID(5));
  const role_str = useRef(getUrlParams().get("role") || "Host");
  const uiRef = useRef<HTMLDivElement | null>(null);
  const zegoInstance = useRef<ReturnType<typeof ZegoUIKitPrebuilt.create> | null>(null);

  useEffect(() => {
    if (uiRef.current) {
      init(uiRef.current);
    }
    // Clean up function to leave room and clean up resources
    return () => {
      if (zegoInstance.current) {
        zegoInstance.current.destroy(); // Assuming destroy method exists for clean up
      }
    };
  }, [uiRef]);

  function randomID(len: number): string {
    let result = "";
    if (result) return result;
    const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
    const maxPos = chars.length;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  function getUrlParams(url: string = window.location.href): URLSearchParams {
    const urlStr = url.split("?")[1];
    return new URLSearchParams(urlStr);
  }

  const role =
    role_str.current === "Host"
      ? ZegoUIKitPrebuilt.Host
      : role_str.current === "Cohost"
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  const sharedLinks = [
    {
      name: "Join as audience",
      url: `${window.location.protocol}//${window.location.host}/room/${roomID.current}`,
    },
  ];

  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.unshift({
      name: "Join as co-host",
      url: `${window.location.protocol}//${window.location.host}${window.location.pathname}/${roomID.current}`,
    });
  }

  async function init(element: HTMLDivElement) {
    const appId = 1227206404;
    const serverSecret = "712b1cc0b5c29f51f2b4f30d00c7cec6";
    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      "mmmmm",
      v4(),
      "user1"
    );

    const ui = ZegoUIKitPrebuilt.create(KitToken);
    zegoInstance.current = ui; // Store instance for cleanup

    ui.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
        config: {
          role,
        },
      },
      sharedLinks,
    });
  }

  const handleExit = () => {
    if (zegoInstance.current) {
      zegoInstance.current.destroy(); // Clean up resources and leave room
    }
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex justify-end p-4">
        <Button onClick={handleExit} variant="primaryOutline">
          Exit
        </Button>
      </div>
      <div ref={uiRef} className="flex-grow"></div>
    </div>
  );
};

export default SingleRoomPage;
