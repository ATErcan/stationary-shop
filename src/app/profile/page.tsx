
import ProfileForm from "@/components/forms/ProfileForm";

export default function ProfilePage() {
  return (
    <main className="w-full min-h-[calc(100vh-4rem)] py-4 flex items-center justify-center">
      <div className="w-full px-3">
        <ProfileForm />
      </div>
    </main>
  );
}