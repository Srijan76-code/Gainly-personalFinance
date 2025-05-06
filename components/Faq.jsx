import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Divider from "./Divider"

export default function Faq({ data }) {
    return (
        <div className="w-full py-20 space-y-10">
        
            <div className="font-semibold text-2xl w-2/4 mx-auto  md:text-4xl text-white">Frequently asked questions</div>
            <Accordion type="single" collapsible className="w-2/4 mx-auto mb-30">
                {data.map(({ question, answer }, index) => (
                    <AccordionItem value={`item-${index + 1}}`}>
                        <AccordionTrigger>{question}</AccordionTrigger>
                        <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                ))}


            </Accordion>
            <Divider/>
        </div>
    )
}