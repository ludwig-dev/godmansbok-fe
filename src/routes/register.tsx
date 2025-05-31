import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm } from "../components/User/RegisterForm";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  return <RegisterForm />;
}
