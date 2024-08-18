import { DefaultLayout } from "@/layouts";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }