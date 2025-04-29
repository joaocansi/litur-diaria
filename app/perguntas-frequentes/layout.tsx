import { DefaultLayout } from "@/components/default-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Liturgia Diária - Perguntas Frequentes",
    template: "%s"
  },
  description: "Encontre respostas para as perguntas mais frequentes sobre o site Liturgia Diária, ajudando você a aproveitar ao máximo sua experiência espiritual.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  );
}