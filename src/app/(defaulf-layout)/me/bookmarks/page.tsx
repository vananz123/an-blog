"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useStatePostStore from "@/services/client/useStatePostStore";
import BlogBookmarkForMeSection from "@/views/Me/BlogBookmarkForMeSection";
export default function Bookmarks() {
  const { statePost, setStatePost } = useStatePostStore();
  return (
    <section>
      <Tabs value={statePost} className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="blog" onClick={() => setStatePost("blog")}>
            Blogs
          </TabsTrigger>
          <TabsTrigger
            value="question"
            onClick={() => setStatePost("question")}
          >
            Questions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="blog">
            <BlogBookmarkForMeSection/>
        </TabsContent>
        <TabsContent value="question">
          
        </TabsContent>
      </Tabs>
    </section>
  );
}
