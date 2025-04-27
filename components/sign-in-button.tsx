"use client";

import { Button } from "@heroui/button";
import { signIn } from "next-auth/react";

export function SignInButton() {
  function handleGoogleSignIn() {
    signIn("google", {
      callbackUrl: "/dashboard",
    });
  }

  return (
    <Button
      className="bg-amber-100"
      size="lg"
      startContent={<img alt="google icon" className="w-6 h-6" src="/baixados.png" />}
      onPress={handleGoogleSignIn}
    >
      Entrar com Google
    </Button>
  );
}
