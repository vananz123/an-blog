import ProfilePublicSection from "@/views/Profile/ProfilePublicSection";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileBlogsSection from "@/views/Profile/ProfileBlogsSection";
const ListTabs = [
  {
    id: 1,
    value: "blogs",
    text: "Blog",
    content: <ProfileBlogsSection />,
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
export default function Profile() {
  return (
    <div>
      <ProfilePublicSection />
      <Separator className="my-3" />
      <Tabs defaultValue="blogs">
        <TabsList className="w-[400px]">
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
      </Tabs>
    </div>
  );
}
