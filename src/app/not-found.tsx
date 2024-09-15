"use-client";

import { Containner } from "@/components/Containner";
import Header from "@/components/Header";
import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <Header />
      <Containner>
        <main>
            <Image src={'/error404.svg'} alt="" height={200} width={200}/>
        </main>
      </Containner>
    </div>
  );
}
