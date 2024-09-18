"use client";
import { Containner } from "@/components/Containner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoAndInviSection from "@/views/Setting/InfoAndInviSection";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Setting() {
  const router = useRouter();
  return (
    <div>
      <Containner>
        <section>
          <Tabs
            defaultValue="account"
            orientation="vertical"
            className="flex w-full"
          >
            <TabsList className="flex flex-col gap-1 w-[40%] h-screen">
              <TabsTrigger value="account" className="w-[200px] block h-[40px]">
                Information and Invididual
              </TabsTrigger>
              <TabsTrigger value="password" className="w-[200px] h-[40px]">
                Password and Security
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 pl-4 pt-4 w-full">
              <TabsContent value="account">
                <h2>Information and Invididual</h2>
                <InfoAndInviSection />
              </TabsContent>
              <TabsContent value="password">
                <h2>Password and Security</h2>
              </TabsContent>
            </div>
          </Tabs>
        </section>
      </Containner>
      <div
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <X />
      </div>
    </div>
  );
}
