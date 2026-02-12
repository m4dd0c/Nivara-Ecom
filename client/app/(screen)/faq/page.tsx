import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "$/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl p-4 pb-28 pt-36 sm:px-6 md:px-0">
      <h1 className="mb-4 text-center text-[22px] font-bold sm:text-[25px] md:text-[30px] lg:text-[36px]">
        FAQs
      </h1>

      <p className="mb-6 text-center text-[12px] sm:text-[12px] md:text-[13px] lg:text-[13px]">
        Find answers to common questions about our products, shipping, and more.
      </p>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="pt-5 text-left no-underline sm:text-center md:pt-10">
            What sizes do you offer?
          </AccordionTrigger>
          <AccordionContent className="text-left text-[12px] sm:text-[12px] md:text-[13px] lg:text-[13px]">
            We offer a variety of sizes for men's clothing, ranging from Small
            (S) to Extra-Large (XL). Please refer to the size chart on each
            product page for more details.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left no-underline sm:text-center">
            How do I track my order?
          </AccordionTrigger>
          <AccordionContent className="text-left text-[12px] sm:text-[12px] md:text-[13px] lg:text-[13px]">
            After placing your order, you will receive an email with a tracking
            number. You can use this number to track your order on our website's
            tracking page.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left no-underline sm:text-center">
            What is your return policy?
          </AccordionTrigger>
          <AccordionContent className="text-left text-[12px] sm:text-[12px] md:text-[13px] lg:text-[13px]">
            We offer a 30-day return policy. If you're not satisfied with your
            purchase, you can return or exchange the item within 30 days from
            the delivery date. Please ensure the item is in its original
            condition with tags intact.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left no-underline sm:text-center">
            How long will shipping take?
          </AccordionTrigger>
          <AccordionContent className="text-left text-[12px] sm:text-[12px] md:text-[13px] lg:text-[13px]">
            Standard shipping usually takes 5-7 business days. Expedited
            shipping options are available at checkout.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-left no-underline sm:text-center">
            Can I cancel or modify my order?
          </AccordionTrigger>
          <AccordionContent className="text-left text-[12px] sm:text-[12px] md:text-[13px] lg:text-[13px]">
            If your order has not yet been processed, you can modify or cancel
            it by contacting our customer support team.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
