import { Earth, Mail, Share2 } from "lucide-react";

export const Footer = () => {
  return (
    <div className="w-full h-85.5 bg-[#F8FAFC] border-t border-t-[#E2E8F0]">
      <div className="my-12 mx-8 flex  gap-12 h-36 ">
        <div className="flex-col w-67 ">
          <div className="text-[#1E293B] font-bold mb-4 text-[20px]">
            Bhetiyo
          </div>
          <div className="text-[#64748B] text-[14px]">
            Turning every lost items's into a happy ending. Join the high-trust
            community for lost and found.
          </div>
        </div>

        <div className=" flex flex-col w-67 gap-4">
          <div className=" text-[#1E293B] text-[16px] font-bold">Resources</div>
          <div className="text-[#64748B] text-[14px] flex flex-col gap-2">
            <div>How it Works</div>
            <div>Safety Guide</div>
            <div>Success Stories</div>
            <div>Leaderboard</div>
          </div>
        </div>

        <div className="flex flex-col w-67 gap-4">
          <div className=" text-[#1E293B] text-[16px] font-bold">Support</div>
          <div className="text-[#64748B] text-[14px] flex flex-col gap-2">
            <div>Contact Support</div>
            <div>FQA</div>
            <div>Community Guidelines</div>
            <div>Report Abuse</div>
          </div>
        </div>

        <div className="flex flex-col w-67 gap-4">
          <div className="text-[#1E293B] text-[16px] font-bold">Legal</div>
          <div className="text-[#64748B] text-[14px] flex flex-col gap-2">
            <div>Term of Service</div>
            <div>Privacy Policy</div>
            <div>Cookie Policy</div>
          </div>
        </div>
      </div>

      <div className="mb-12 mx-8 pt-8 border-t border-t-[#E2E8F0] flex justify-between">
        <div className="text-[#64788B] text-[14px]">
          &copy; 2026 Bhetiyo. Every lost item has a story.
        </div>
        <div className="flex gap-6">
          <div>
            <Earth size={20} />
          </div>
          <div>
            <Share2 size={20} />
          </div>
          <div>
            <Mail size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
