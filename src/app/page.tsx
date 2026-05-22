import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="m-4">
      <Show when={"signed-out"}>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </Show>
      <Show when={"signed-in"}>
        <UserButton />
      </Show>
    </div>
  );
}
