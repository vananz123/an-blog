import { Containner } from "@/components/Containner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <Containner>
        <main>{children}</main>
      </Containner>
      <Footer />
    </div>
  );
}
