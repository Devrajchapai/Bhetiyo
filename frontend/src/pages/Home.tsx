import { NavigationBar } from "@/components/NavigationBar";
import { SignUp } from "@/components/Signup";

export const Home = () => {
  return (
    <div>
      {/* all the logic are defined inside of the SignUp.tsx file  */}
      <SignUp />

      <NavigationBar />
      {/* all the logic are defined inside of the Navigation.tsx file  */}

      {/* Home contains  */}
      <div></div>
    </div>
  );
};
