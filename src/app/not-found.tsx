import { Containner } from "@/components/Containner";
import Header from "@/components/Header";
import Image from "next/image";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Header />
        <Containner>
          <main>
              <Image src={'/error404.svg'} alt="" height={200} width={200}/>
          </main>
        </Containner>
      </div>
    </Suspense>
  );
}
