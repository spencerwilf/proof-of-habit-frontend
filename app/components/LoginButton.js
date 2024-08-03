"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function LoginButton() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async () => {
    await login(); 
    router.push("/dashboard"); 
  };

  const disableLogin = !isMounted || !ready || (ready && authenticated);

  if (!isMounted) return null;

  return (
    <button
      className="font-medium px-6 py-3 text-lg transition duration-300 ease-in-out hover:bg-blue-400 bg-blue-500 text-white rounded-lg"
      disabled={disableLogin}
      onClick={handleLogin}
    >
      Log in
    </button>
  );
}

export default LoginButton;
