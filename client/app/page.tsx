import { SignInButton } from "@/components/sign-in-button";

export default function Home() {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <img src="/familia.webp" alt="jesus" className="w-full h-screen object-cover" />
      </div>
      <div className="col-span-1 flex flex-col justify-center items-center">
        <div className="w-[90%] max-w-[500px]">
            <h1 className="text-3xl font-extrabold mb-4">
              Transforme seu dia com meditações diárias da liturgia!
            </h1>
            <p className="mb-6 text-gray-700">
              Cadastre-se agora e receba conteúdos exclusivos diretamente no seu e-mail por apenas R$6,00.
            </p>
            <SignInButton />
        </div>
      </div>
    </div>
  );
}
