"use client"
import { NewPostSection } from "@/views/Post/NewPostSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewQuestionSection } from "@/views/Post/NewQuestionSection";
import useStatePostStore from "@/services/client/useStatePostStore";
export default function NewPostPage() {
  const {statePost , setStatePost} = useStatePostStore()
  return (
    <section>
      <Tabs value={statePost} className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="blog" onClick={()=> setStatePost('blog')}>Blog</TabsTrigger>
          <TabsTrigger value="question"  onClick={()=> setStatePost('question')}>Question</TabsTrigger>
        </TabsList>
        <TabsContent value="blog">
          <NewPostSection />
        </TabsContent>
        <TabsContent value="question">
          <NewQuestionSection/>
        </TabsContent>
      </Tabs>{" "}
    </section>
  );
}
