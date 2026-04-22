import { useState } from "react";
import { CircleUser } from "lucide-react";
export const NavigationBar = () => {
  type Tabs = "home" | "lostitems" | "founditems" | "community";
  const [isUserLogedIn, setIsUserLogin] = useState(false);
  const [selectedTab, setSelectedTab] = useState<Tabs>("home");
  return (
    <div className="mx-12.75 mt-6 h-20.5 px-8 py-4 bg-[#FFFFFF]/70 border border-[#000000]/50  rounded-full">
      <div className="flex justify-between items-center">
        <div>
          <span className="w-22.5 h-8 text-[24px] text-[#2563E8]/90 font-medium">
            Bhetiyo
          </span>
          <span className="h-full text-[12px] text-[#C2C6D3] ml-2">
            Restoring Faith
          </span>
        </div>

        <div className="flex gap-8 h-7.5 text-[#475569] text-[14px] pb-1">
          <div
            className={`${selectedTab === "home" ? "text-[#2563EB] border-b-2 border-[#2563E8] " : ""}`}
            onClick={() => setSelectedTab("home")}
          >
            Home
          </div>
          <div
            className={`${selectedTab === "lostitems" ? "text-[#2563EB] border-b-2 border-[#2563E8] " : ""}`}
            onClick={() => setSelectedTab("lostitems")}
          >
            Harayo
          </div>
          <div
            className={`${selectedTab === "founditems" ? "text-[#2563EB] border-b-2 border-[#2563E8] " : ""}`}
            onClick={() => setSelectedTab("founditems")}
          >
            Bhetiyo
          </div>
          <div
            className={`${selectedTab === "community" ? "text-[#2563EB] border-b-2 border-[#2563E8] " : ""}`}
            onClick={() => setSelectedTab("community")}
          >
            Community
          </div>
        </div>

        <div>
          {!isUserLogedIn ? (
            <div className="flex flex-col h-9.5 w-27 justify-center items-center p-0.5 hover:bg-black/10 hover:text[#FFFFFF] hover:rounded-full">
              <div className="text-xs">Connect</div>
              <div className="text-[8px] ">
                with{" "}
                <span className="text-[10px] text-[#2563EB] font-medium ">
                  Bhetiyo
                </span>
              </div>
            </div>
          ) : (
            <div>
              <CircleUser size={24} className="hover:w-5 hover:h-5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
