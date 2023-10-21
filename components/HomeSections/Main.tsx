import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ComposeTweetForm from "../InputTweet";
import { Database } from "@/lib/database.types";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import AuthModule from "../AuthModule";

const MainComponent = async () => {
  const supabase = createClientComponentClient<Database>();
  const { data, error } = await supabase.auth.getUser();
  console.log({ data, error });
  return (
    <main className="flex  w-[55%] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
        Home
      </h1>
      <AuthModule error={error} />
      <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-gray-600 relative">
        <div className="w-11 h-11 bg-slate-400 rounded-full flex-none"></div>
        <ComposeTweetForm />
      </div>
      <div className="w-full"></div>
    </main>
  );
};

export default MainComponent;
