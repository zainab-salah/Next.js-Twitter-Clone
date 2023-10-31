"use client";
import { useSupabase } from "@/app/Provider";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import {
  BsBell,
  BsBookmark,
  BsTwitter,
  BsEnvelope,
  BsThreeDots,
} from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";

const LeftSidebar = () => {
  const supabase = createClientComponentClient<Database>();

  // const { data: userData, error: userError } = await supabase.auth.getUser();
  // console.log(userData);
  const { user } = useSupabase();
  console.log(user);
  // console.log(user);
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <section className="w-[20%] sticky top-0 xl:flex flex-col items-stretch h-screen hidden">
      <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            className="hover:bg-white/10 text-2xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6"
            href={item.title}
            key={item.title}
          >
            <div>
              <item.icon />
            </div>
            {item.title !== "Twitter" && <div>{item.title}</div>}
          </Link>
        ))}
        <button className="rounded-full m-4  bg-twitterColor p-2 text-2xl text-center hover:bg-opacity-70 transition duration-200">
          Tweet
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <button className="rounded-full flex items-center space-x-2 bg-transparent p-4 text-center hover:bg-white/10 transition duration-200 w-full justify-between">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-slate-400 w-10 h-10"></div>
          <div className="text-left text-sm">
            <div className="font-semibold">{user?.user_metadata.full_name}</div>
          </div>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </button>
    </section>
  );
};

export default LeftSidebar;

const NAVIGATION_ITEMS = [
  {
    title: "Twitter",
    icon: BsTwitter,
  },
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: HiOutlineHashtag,
  },
  {
    title: "Notifications",
    icon: BsBell,
  },
  {
    title: "Messages",
    icon: BsEnvelope,
  },
  {
    title: "Bookmarks",
    icon: BsBookmark,
  },
  {
    title: "Profile",
    icon: BiUser,
  },
];

import { useQuery } from "react-query";

function UserProfile() {
  const userEmail = "kainykawai@gmail.com"; // Get the user's email from your user object
  const googleApiKey = process.env.GOOGLE_CLIENT_ID; // Replace with your Google API key
  const googleAccessToken = "YOUR_GOOGLE_ACCESS_TOKEN"; // Obtain this from Supabase

  const {
    data: profileImage,
    isLoading,
    isError,
  } = useQuery<string>("googleProfileImage", () =>
    fetchGoogleProfileImage(userEmail, googleApiKey, googleAccessToken)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching the profile image</div>;
  }

  return <div>{/* <img src={profileImage} alt="Google Profile" /> */}</div>;
}

import axios from "axios";

const fetchGoogleProfileImage = async (
  email: string,
  apiKey: string,
  googleAccessToken: string
) => {
  const response = await axios.get(
    `https://people.googleapis.com/v1/people/me?personFields=photos&key=${apiKey}`,
    {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`, // You'll need to obtain the access token from Supabase
      },
      params: {
        "requestMask.includeField": "person.photos",
      },
    }
  );
  return response.data.photos[0].url;
};
