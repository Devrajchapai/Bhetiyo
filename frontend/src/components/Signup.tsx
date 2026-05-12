import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { HandHeart, X } from "lucide-react";
import { useNavigationBar } from "@/store/ui/navigationbar";

const BHETIYO_MEMENTO = [
  {
    headline: "Every lost item has a story",
    subtext:
      "Join Bhetiyo and help us give those stories a happy ending. Together, we bring cherished memories home.",
  },

  {
    headline: "Be the reason someone finds hope",
    subtext:
      "Become part of the Bhetiyo community and help reunite people with what they love. Your small act can make a big difference.",
  },

  {
    headline: "Start your story with us",
    subtext: "Join the Bhetiyo community and help bring lost items home",
  },

  {
    headline: "Turning 'Lost' into 'Found'",
    subtext:
      "Join Bhetiyo today to help bridge the gap between lost belongings and their rightful owners.",
  },
  {
    headline: "Find peace of mind with Bhetiyo",
    subtext:
      "Whether youve lost a treasure or found a memory, join us to help make the world a little more connected.",
  },
  {
    headline: "Your safety net for the things you love",
    subtext:
      "Join Bhetiyo and be the hero who helps a neighbor find what they've lost. Let's make the world feel a little smaller.",
  },
  {
    headline: "Help a memory find its way home",
    subtext:
      "Behind every lost item is a story waiting for a happy ending. Become part of the community that makes it happen.",
  },
  {
    headline: "Join the search. Be the find.",
    subtext:
      "Millions of items are lost every day. Join Bhetiyo and help us bring them back to where they belong.",
  },
  {
    headline: "A community built on care",
    subtext:
      "Connect with Bhetiyo and help us create a safer, more connected way to find what's missing.",
  },
  {
    headline: "Bring it back home",
    subtext:
      "Join Bhetiyo and help reunite people with their most cherished belongings.",
  },
];

export const SignUp = () => {
  const isSigningUp = useNavigationBar((state) => state.isSigningUp);
  const signingUp = useNavigationBar((state) => state.signingUp);

  const [displayHeadline, setDisplayHeadline] = useState(
    BHETIYO_MEMENTO[0].headline,
  );

  const [displayMemento, setDisplayMemento] = useState(
    BHETIYO_MEMENTO[0].subtext,
  );

  const handleGoogleAuth = () => {
    const backendURL = import.meta.env.VITE_API_URL;
    window.location.href = `${backendURL}/auth/google`;
  };

  useEffect(() => {
    const rand = Math.floor(Math.random() * BHETIYO_MEMENTO.length);
    setDisplayHeadline(BHETIYO_MEMENTO[rand].headline);
    setDisplayMemento(BHETIYO_MEMENTO[rand].subtext);
  }, [isSigningUp]);

  // place it right above return and below all the hooks
  // the number of hook calls should be same for every rerender
  // Could cause early return
  if (!isSigningUp) return; // hide oauth menu

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      {/* Added my-2.5 for that 10px top/bottom margin requirement */}
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-1 my-1 relative">
        <Button
          variant="ghost"
          size="lg"
          className="absolute right-4 top-4 bg-none"
          onClick={() => signingUp()} // close oauth menu
        >
          <X />
        </Button>

        {/* Centered Icon and Text Section */}
        <div className="flex flex-col items-center text-center mt-8 mb-8">
          <div className="flex justify-center items-center size-16 border rounded-full mb-4">
            <HandHeart size={30} className="text-rose-500" />
          </div>
          <h2 className="text-xl font-semibold">{displayHeadline}</h2>
          <p className="text-gray-600 mt-2">{displayMemento}</p>
        </div>

        <div className="space-y-4">
          {/* Google Button */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleGoogleAuth()}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>

          {/* Facebook Button */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </Button>

          {/* Corrected TikTok Button */}
          <Button
            variant="outline" // Changed from 'outline' to 'ghost' to remove the border
            className="w-full flex items-center justify-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 448 512"
              fill="#000000" // Icon set to solid black
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h.06a120.25 120.25 0 0 0 47.66 79.52 119.5 119.5 0 0 0 73.19 25.43V209.91z" />
            </svg>
            TikTok
          </Button>
        </div>
      </div>
    </div>
  );
};
