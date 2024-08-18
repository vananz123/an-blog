import { EmptyLayout } from "@/layouts";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EmptyLayout>{children}</EmptyLayout>;
}
