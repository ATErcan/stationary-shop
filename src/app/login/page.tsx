import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="w-full min-h-[calc(100vh-4rem)] py-4 flex items-center justify-center">
      <div className="w-full px-3">
        <h1 className="font-bold text-3xl max-w-80 mx-auto mb-2">Login</h1>
        <LoginForm />
      </div>
    </main>
  );
}