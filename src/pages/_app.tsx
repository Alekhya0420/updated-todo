import { AbilityContext, AbilityProvider } from "@/context/AbilityContext";
import Wrapper from "@/layout/wrapper/wrapper";
import "@/styles/globals.css";
import { defineAbilitiesFor } from "@/utils/casl";
import { trpc } from "@/utils/trpc";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";


function App({ Component, pageProps }: AppProps) {
  // const [ability, setAbility] = useState(() => defineAbilitiesFor("USER", {}));

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("auth_user") || "{}");
  //   console.log("🟢 Stored user from localStorage:", storedUser); // Debugging log

  //   if (storedUser.role) {
  //     console.log("🔵 Calling defineAbilitiesFor with:", storedUser.role, storedUser.permissions);
  //     setAbility(defineAbilitiesFor(storedUser.role, storedUser.permissions || {}));
  //   }
  // }, []);

  const [user, setUser] = useState({ role: "USER", permissions: {} });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("auth_user") || "{}");
    setUser(storedUser);
  }, []);

  
  return (
    <AbilityProvider role={user.role} permissions={user.permissions}>
      <Wrapper>
      <Toaster position="top-right" reverseOrder={false} />
        <Component {...pageProps} />
      </Wrapper>
    </AbilityProvider>
  );
}

export default trpc.withTRPC(App);

