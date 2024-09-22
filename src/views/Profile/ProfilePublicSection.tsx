"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/services/client/useAuthStore";
import { useFollow } from "@/services/server/user/mutation";
import { useProfileBySlug } from "@/services/server/user/queries";
import { Flag, Minus, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
const ListTabs = [
  {
    id: 1,
    value: "blogs",
    text: "Blog",
    content: "this this all blogs",
  },
  {
    id: 2,
    value: "questions",
    text: "Question",
    content: "this this all questions",
  },
  {
    id: 3,
    value: "follewer",
    text: "Follower",
    content: "this this all follower",
  },
  {
    id: 4,
    value: "following",
    text: "Following",
    content: "this this all following",
  },
  {
    id: 5,
    value: "contact",
    text: "Contact",
    content: "contact",
  },
];
function ProfilePublicSection() {
  const { slug } = useParams();
  const { clientId } = useAuthStore();
  const { data, refetch } = useProfileBySlug(slug as string, clientId);
  const user = data?.metadata;
  const router = useRouter();
  console.log(clientId);
  const follow = useFollow();
  const handleFollow = () => {
    if (clientId && user) {
      follow
        .mutateAsync({
          userId: clientId,
          userIdFollow: user._id,
        })
        .then((data) => {
          refetch();
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      router.push("/login");
    }
  };
  return (
    <section>
      {user ? (
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <Avatar className="h-28 w-28">
                <AvatarImage
                  src={
                    user.usr_avatar != ""
                      ? user.usr_avatar
                      : "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-[28px]">{user.usr_name}</p>
                <p className="text-ellipsis text-[20px]">{user.usr_slug}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Flag size={14} /> <p>Report</p>
                </div>
              </div>
            </div>
            {clientId != user._id && (
              <>
                {!user.usr_follower_check ? (
                  <Button onClick={() => handleFollow()}>
                    <Plus /> Follow
                  </Button>
                ) : (
                  <Button
                    className="text-blue-500"
                    onClick={() => handleFollow()}
                  >
                    Following
                  </Button>
                )}
              </>
            )}
          </div>
          <p className="my-2 text-sm">Follower: {user.usr_follower_count}</p>
          <p className="text-sm">Following: {user.usr_following_count}</p>
        </div>
      ) : (
        <div>loading</div>
      )}
      {/* <Separator className="my-3" />
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          {ListTabs.map((e) => (
            <TabsTrigger key={e.id} value={e.value}>
              {e.text}
            </TabsTrigger>
          ))}
        </TabsList>
        {ListTabs.map((e) => (
          <TabsContent value={e.value} key={e.id}>
            {e.content}
          </TabsContent>
        ))}
      </Tabs> */}
    </section>
  );
}

export default ProfilePublicSection;
