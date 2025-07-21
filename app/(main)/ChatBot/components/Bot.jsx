"use client"

import { gemini } from "@/actions/gemini";
import { Button } from "@/components/ui/button";

import Markdown from "react-markdown";

import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkEmoji from 'remark-emoji'
import { Input } from "@/components/ui/input";
import { BotIcon, CornerRightUp, Sparkles, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import Divider from "@/components/Divider";
import { useState } from "react";
import Greetings from "../../dashboard/_components/Greetings";

const Bot = () => {
    const [prompt, setPrompt] = useState("")
    const [res, setRes] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [conv, setConv] = useState([])
    const formattedTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })


    const handleSubmit = async () => {

        setIsLoading(true)
        const { text, error } = await gemini({ prompt })
        setRes(text || error)
        setConv([...conv, prompt, text || error])
        setPrompt("")
        setIsLoading(false)
    }

    return (
        <div className=" p-6 mx-auto w-4xl pb-16 ">
                {conv.length==0 ? (
            <div className="text-center w-full h-[70vh] flex justify-center items-center " >
                
                <Greetings/>
            </div>
            ):
            <Card className="rounded-2xl  bg-transparent p-6  ">

      
            {conv.map((conversation, i) => (
               
                    i % 2 == 0 ? (
                    // prompt 
                    <div className="flex gap-3 py-2 justify-end ">
                    

                        <div className="">


                            <Card className="bg-[#431C90] rounded-tr-none   p-4 px-6 ">

                                <Markdown remarkPlugins={[
                                    remarkGfm,            // tables, strikethrough, checkboxes
                                    remarkBreaks,         // auto line breaks
                                    remarkSmartypants,    // “smart quotes” and dashes
                                    remarkEmoji           // :chart: → 📊
                                ]}>
                                    {conversation}

                                </Markdown>

                            </Card>
                            <div className="text-[12px] text-end font-extralight p-2">{formattedTime}</div>
                        </div>

                        <div className="rounded-full w-10 h-10 p-2 bg-[#151419] flex items-center justify-center shadow-md">
                            <User className="w-5 h-5 " />
                        </div>
                    </div>

                    ) : (
                    // res
                    <>
                    <div className="flex justify-start gap-3">
                        <div className="rounded-full w-10 h-10 p-2 bg-[#151419] flex items-center justify-center shadow-md">
                            <BotIcon className="w-5 h-5 " />
                        </div>

                        <div>


                            <Card className="bg-[#151419] rounded-tl-none p-4 px-6 ">

                                <Markdown remarkPlugins={[
                                    remarkGfm,            // tables, strikethrough, checkboxes
                                    remarkBreaks,         // auto line breaks
                                    remarkSmartypants,    // “smart quotes” and dashes
                                    remarkEmoji           // :chart: → 📊
                                ]}>
                                    {conversation}

                                </Markdown>

                            </Card>
                            <div className="text-[12px] font-extralight p-2">{formattedTime}</div>
                        </div>
                       
                    </div>
                    <Divider />
                    </>
                    )
                    
               
            ))}
                   
                   {isLoading && (
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-[#151419] px-4 py-2">
            <Sparkles className="h-4 w-4 animate-pulse text-purple-500" />
            <span className="animate-pulse text-purple-500 ">
              Generating response...
            </span>
          </div>
        )}



</Card>}







            <div className=" flex justify-center items-center mx-auto  absolute bottom-10 gap-2 max-w-4xl  " >

                <Input className="w-3xl  h-12" value={prompt} placeholder="Ask me anything!" onChange={(e) => setPrompt(e.target.value)} />
                <Button className={prompt == "" ? `opacity-40 bg-[#6832d2]` : "bg-[#6832d2]"} onClick={handleSubmit}  ><CornerRightUp /></Button>

            </div>
        </div>
    )
}
export default Bot
