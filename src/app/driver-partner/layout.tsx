import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Porter | Driver Partner",
};

export default function DriverPartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
