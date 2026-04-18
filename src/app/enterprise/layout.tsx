import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Porter | Enterprise",
};

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
