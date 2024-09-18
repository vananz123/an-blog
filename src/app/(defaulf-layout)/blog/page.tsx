import LeftSide from "@/components/LeftSide";
import ListBlogSection from "@/views/Post/ListBlogSection";
import { Suspense } from "react";


export default function Blog (){
    return (
        <LeftSide><Suspense fallback={<div>Loading...</div>}><ListBlogSection/></Suspense></LeftSide>
    )
}