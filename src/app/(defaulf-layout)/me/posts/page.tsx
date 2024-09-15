"use client"
import BlogForMeSection from "@/views/Me/BlogForMeSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionForMeSection from "@/views/Me/QuestionForMeSection";
import useStatePostStore from "@/services/client/useStatePostStore";
export default function Posts() {
  const {statePost,setStatePost} = useStatePostStore()
  return (
    <section>
      <Tabs value={statePost} className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
        <TabsTrigger value="blog" onClick={()=> setStatePost('blog')}>Blogs</TabsTrigger>
        <TabsTrigger value="question"  onClick={()=> setStatePost('question')}>Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="blog">
        <BlogForMeSection />
        </TabsContent>
        <TabsContent value="question">
          <QuestionForMeSection/>
        </TabsContent>
      </Tabs>
    </section>
  );
}
