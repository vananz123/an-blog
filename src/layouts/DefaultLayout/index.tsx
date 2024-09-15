import { Containner } from "@/components/Containner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LeftSide from "@/components/LeftSide";
export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >
      <Header/>
      <Containner className="mt-10">
        <div>{children}</div>
        {/* <section className="grid grid-cols-3 gap-6">
          <div className=''>
            <LeftSide/>
          </div>
          <main className="col-span-2">{children}</main>
        </section> */}
      </Containner>
      <Footer />
    </div>
  );
}
