"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  SupabaseClient,
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Database } from "@/lib/database.types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import Link from "next/link";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  user: User | null; // Add user to the context
};

export const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    supabase.auth.getSession().then((res) => {
      if (!res.data.session) {
        setIsOpen(true);
        return;
      }
      setUser(res.data.session.user);
      setIsOpen(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase, user }}>
      <>
        <Toaster />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="p-6">
            <h3 className="text-lg my-1">Please sign in to continue</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                setIsLoading(true);

                const { data: signUpData, error: signUpError } =
                  await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password: password, // Use the password state variable
                  });
                console.log(signUpData);
                if (signUpError) {
                  return toast.error(signUpError.message);
                }

                toast.success("Done !");
                setIsLoading(false);
              }}
            >
              <Input
                type="email"
                placeholder="email"
                value={email}
                className="my-3"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password"
                value={password}
                className="my-3"
                onChange={(e) => setPassword(e.target.value)}
              />

              <p className="text-sm text-gray-900 my-2">
                dont have account ?<Link href="/signup">Sign up now!</Link>
              </p>
              <div className="flex w-full justify-end">
                <Button disabled={isLoading}>Login</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        {children}
      </>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};
