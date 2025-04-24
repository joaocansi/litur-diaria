import Link from "next/link";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { CircularProgress } from "@heroui/progress";
import { signOut } from "next-auth/react";
import { FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { useCallback } from "react";

import { Subscription, useSubscription } from "@/hooks/subscription";

type FilledSubscriptionCardProps = {
  subscription: Subscription;
};

const FilledSubscriptionCard = ({
  subscription,
}: FilledSubscriptionCardProps) => {
  return <div>faodsijfiads</div>;
};

export function SubscriptionCard() {
  const { session, loading, error, subscription } = useSubscription();

  const handleSignOut = () => signOut();
  const handleSubscribe = () => (window.location.href = "/api/subscribe");

  const buildSubscriptionBody = useCallback(() => {
    if (loading)
      return (
        <div className="w-full flex justify-center items-center">
          <CircularProgress />
        </div>
      );
    if (error)
      return (
        <p className="text-center text-muted-foreground mt-1">
          ⚠️ Ocorreu um problema e não foi possível processar sua solicitação.
          Por favor, tente novamente mais tarde. 🙏
        </p>
      );
    if (subscription)
      return <FilledSubscriptionCard subscription={subscription} />;

    return (
      <p className="text-center text-muted-foreground mt-1">
        🌟 Assine agora por apenas R$ 6,00 e tenha acesso à liturgia diária com
        reflexões inspiradoras sobre o evangelho. 🎉
      </p>
    );
  }, [loading, error, subscription]);

  return (
    <Card className="w-full max-w-[560px] p-2">
      <CardHeader className="justify-between">
        <div className="flex gap-4">
          <Avatar
            isBordered
            alt={`Avatar de ${session.user?.name}`}
            className="w-20 h-20"
            radius="full"
            src={session.user?.image as string}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-xl font-semibold leading-none">
              {session.user?.name}
            </h4>
            <h5 className="text-md tracking-tight">{session.user?.email}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 min-h-20">{buildSubscriptionBody()}</CardBody>
      <CardFooter className="gap-3">
        <div className="flex justify-between w-full items-center">
          <div className="flex gap-2">
            <Button
              aria-label="Assinar agora"
              className="bg-amber-100"
              onPress={handleSubscribe}
            >
              Assinar
            </Button>
            <Button
              aria-label="Sair da conta"
              className="bg-red-400 text-white"
              startContent={<FaSignOutAlt />}
              onPress={handleSignOut}
            >
              Sair
            </Button>
          </div>

          <Link
            aria-label="Precisa de ajuda? Acesse a FAQ"
            className="flex items-center gap-2 text-default-600 hover:underline"
            href="/faq"
          >
            <FaInfoCircle /> Precisa de ajuda?
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
