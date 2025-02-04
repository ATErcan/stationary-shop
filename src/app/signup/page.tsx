import SignUpForm from "@/components/forms/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="w-full min-h-[calc(100vh-4rem)] py-4 flex items-center justify-center">
      <div className="w-full px-3">
        <h1 className="font-bold text-3xl max-w-80 mx-auto mb-2">Sign Up</h1>
        <SignUpForm />
      </div>
    </main>
  );
}