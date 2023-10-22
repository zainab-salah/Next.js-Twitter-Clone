"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Database } from "@/lib/database.types";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    // await supabase.auth.signUp({
    //   username,
    //   password,

    //   options: {
    //     emailRedirectTo: `${location.origin}/auth/callback`,
    //   },
    // });
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("username", username.trim());

    if (data && data?.length > 0) {
      console.log(error);
    }

    const { data: signUpData, error: signUpError } =
      await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          data: {
            username,
            full_name: fullName,
          },
        },
      });
    console.log(signUpData);
    if (signUpError) {
      console.log(signUpError);
    }
  };

  // const handleSignIn = async () => {
  //   await supabase.auth.signInWithPassword({

  //     email,
  //     password,
  //   });
  //   router.refresh();
  // };

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  //   router.refresh();
  // };

  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-black">
      <input
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        placeholder="User Name"
        className="text-black"
      />{" "}
      <input
        type="text"
        placeholder="your name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="text-black"
      />
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
        className="text-black"
      />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        className="text-black"
      />
      <button onClick={handleSignUp}>Sign up</button>
      {/* <button onClick={handleSignIn}>Sign in</button> */}
      {/* <button onClick={handleSignOut}>Sign out</button> */}
    </div>
  );
}
