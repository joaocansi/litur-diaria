import Link from "next/link";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { CircularProgress } from "@heroui/progress";
import { Chip } from '@heroui/chip'
import { signOut } from "next-auth/react";
import { FaEdit, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { useCallback, useState } from "react";

import { Subscription, SubscriptionStatus, translateStripeStatus, useSubscription } from "@/hooks/subscription";
import { formatUnixTimestamp } from "@/date";

type FilledSubscriptionCardProps = {
  subscription: Subscription;
};

const statusToColor = (status: SubscriptionStatus): any => {
  switch(status) {
    case 'active':
      return 'success'
    case 'canceled':
      return 'danger'
    case 'inactive': 
      return 'danger'
    default:
      return 'warning'  
  }
}

const FilledSubscriptionCard = ({
  subscription,
}: FilledSubscriptionCardProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1 items-center">
        <h6 className="font-medium">Status: </h6>
        <Chip color={statusToColor(subscription.status)}>{translateStripeStatus(subscription.status)}</Chip>
      </div>
      {subscription.status !== 'active' && (
        <p className="text-sm text-muted-foreground">
          {'>'} Sua assinatura não está ativa. Para gerenciar sua assinatura ou reativá-la, clique no botão "Gerenciar assinatura" abaixo.
        </p>
      )}
      <div className="flex gap-1 items-center">
        <h6 className="font-medium">Data de renovação: </h6>
        <span className="text-default-800">{formatUnixTimestamp(subscription.endDate)}</span>
      </div>
    </div>
  );
};

export function SubscriptionCard() {
  const { session, loading, error, subscription } = useSubscription();
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSignOut = () => signOut();
  const buildSubscriptionBody = useCallback(() => {
    if (loading)
      return (
        <div className="w-full flex justify-center items-center">
          <CircularProgress aria-label="Carregando..." />
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
        <div className="flex justify-between w-full items-center gap-2 max-lg:flex-col max-lg:items-start">
          <div className="flex gap-2">
            {!loading && subscription && (
              <form action="/api/assinatura/portal" method="POST" onSubmit={() => setButtonLoading(true)}>
                <Button aria-label="Gerenciar assinatura" color="primary" type="submit" isLoading={buttonLoading}>
                  <FaEdit /> Gerenciar assinatura
                </Button>
              </form>
            )}
            {!loading && !subscription && (
              <form action="/api/assinatura" method="POST" onSubmit={() => setButtonLoading(true)}>
                <Button
                  type="submit"
                  isLoading={buttonLoading}
                  aria-label="Assinar agora"
                  className="bg-amber-300">
                  Assinar
                </Button>
              </form>
            )}
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
            href="/perguntas-frequentes?from=dashboard"
            replace
          >
            <FaInfoCircle /> Precisa de ajuda?
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
