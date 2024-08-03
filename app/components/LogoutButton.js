"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation"; // Use the Next.js client-side navigation hook
import { useEffect, useState } from "react";

function LogoutButton() {
  const { ready, authenticated, logout } = usePrivy();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout(); 
    router.push("/"); 
  };

  
  const disableLogout = !isMounted || !ready || (ready && !authenticated);

  if (!isMounted) return null;

  return (
    <button
      className="font-medium px-6 py-3 text-lg transition duration-300 ease-in-out hover:bg-blue-400 bg-blue-500 text-white rounded-lg"
      disabled={disableLogout}
      onClick={handleLogout}
    >
      Log out
    </button>
  );
}

export default LogoutButton;
