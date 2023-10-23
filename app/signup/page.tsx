"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/lib/database.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

const SignUpPAge = () => {
  const supabase = createClientComponentClient<Database>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  async function handleSignUp() {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("username", username.trim());

    if (data && data?.length > 0) {
      return toast.error("username already exists, please use another");
    } else if (error) {
      return toast.error(error.message);
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: email.trim(),
        password: password,
        options: {
          captchaToken: undefined,
          data: {
            username,
            full_name: fullName,
          },
        },
      }
    );
    console.log(signUpData);
    if (signUpError) {
      return toast.error(signUpError.message);
    }

    toast.success("magic link sent successfully");
    setIsLoading(false);
  }
  return (
    <div className="m-auto">
      <Toaster />

      <h3 className="text-lg my-1">Please sign in to continue</h3>
      <form
        className="text-black"
        onSubmit={async (e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="username"
          min={3}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="my-2"
        />
        <Input
          type="text"
          placeholder="your name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="my-2"
        />
        <p className="text-sm text-gray-900 my-2">
          you will receive a login magic link!
        </p>
        <div className="flex w-full justify-end">
          <Button disabled={isLoading}>Sign Up</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPAge;
