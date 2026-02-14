import { SignIn } from "@clerk/nextjs";
export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center py-8 mt-35">
      <SignIn />
    </div>
  );
}
