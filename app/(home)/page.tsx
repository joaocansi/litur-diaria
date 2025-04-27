import { Footer } from "@/components/footer";
import { SignInButton } from "@/components/sign-in-button";
import { Divider } from "@heroui/divider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession();
    if (session && session.user)
        redirect('/dashboard')

    return (
        <div className="min-h-screen w-full px-3 py-2 overflow-auto flex flex-col justify-between items-center">
            <span />
            <div className="w-[90%] max-w-[500px]">
                <h1 className="text-6xl font-extrabold text-amber-900 mb-4">Liturgia Diária</h1>
                <Divider />
                <h2 className="text-3xl font-extrabold mb-4 mt-6">Transforme seu dia com meditações diárias da liturgia!</h2>
                <p className="mb-6 text-gray-700">Cadastre-se agora e receba conteúdos exclusivos diretamente no seu e-mail por apenas R$6,00.</p>
                <SignInButton />
            </div>
            <Footer />
        </div>
    );
}
