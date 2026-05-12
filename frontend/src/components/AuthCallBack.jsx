import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/store/data/auth";
import { useNavigationBar } from "@/store/ui/navigationbar";
import { MagnifyingGlass } from "react-loader-spinner";

function AuthCallBack() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  //variables
  const getToken = useAuth((state) => state.token);
  const getEmail = useAuth((state) => state.email);
  const getName = useAuth((state) => state.name);

  // actions
  const setToken = useAuth((state) => state.setToken);
  const setEmai = useAuth((state) => state.setEmail);
  const setName = useAuth((state) => state.setName);
  const connect = useAuth((state) => state.connect);

  const tokenParam = searchParams.get("token");
  const userParam = searchParams.get("userJson");

  useEffect(() => {
    setToken(tokenParam);
    setEmai(userParam.email);
    setName(userParam.name);
    connect();
    navigate("/");
  }, [setToken, userParam]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/40 bg-white/80 px-12 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-md">
        <MagnifyingGlass
          visible={true}
          height="140"
          width="140"
          ariaLabel="magnifying-glass-loading"
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#bae6fd"
          color="#0ea5e9"
        />

        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Redirecting to Bhetiyo
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please wait while we prepare everything for you...
          </p>
        </div>

        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-sky-500 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-sky-500 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-sky-500" />
        </div>
      </div>
    </div>
  );
}

export default AuthCallBack;
