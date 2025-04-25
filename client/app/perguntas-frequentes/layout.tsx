import { DefaultLayout } from "@/components/default-layout";

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  );
}