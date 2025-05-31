import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../components/User/LoginForm";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return <LoginForm />;
}
