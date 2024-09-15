"use client"

import CardQuestion from "@/components/CardQuestion"
import { useGetQuestion } from "@/services/server/post/queries"
export default function ListQuestionSection (){
    const {data} = useGetQuestion({})
    const question = data?.metadata
    return (
        <div className="gap-4">
           {question ? (
            <>
                {question.length > 0 ? (
                    <> {question.map((e)=>(
                        <CardQuestion question={e} className="mb-5" link={`/question/${e.question_slug}`} key={e._id}/>
                    ))}</>
                ):(
                    <div>not</div> 
                )}
            </>
           ):(<div>loading</div>)}
        </div>
    )
}
