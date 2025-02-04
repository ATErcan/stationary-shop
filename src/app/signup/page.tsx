import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full px-3">
        <h1 className="font-bold text-3xl max-w-80 mx-auto mb-2">Sign Up</h1>
        <SignUpForm />
      </div>
    </main>
  );
}