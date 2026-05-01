import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/smoothie-codex")({
  beforeLoad: () => {
    throw redirect({ to: "/smoothie/start-here" });
  },
  component: () => null,
});
