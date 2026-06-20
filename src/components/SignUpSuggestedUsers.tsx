import { SignInButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function SignUpSuggestedUsers() {
  return (
    <Card className="gap-4">
      <CardHeader className="gap-">
        <CardTitle className="text-center">Who To Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <CardContent className="px-0">
          <div className="space-y-4">
            {/** Content */}
            <p className="text-center text-muted-foreground mb-4">
              Login to see who to follow.
            </p>
            <SignInButton mode="modal">
              <Button className="w-full" variant="outline">
                Login
              </Button>
            </SignInButton>
          </div>
        </CardContent>
      </CardContent>
    </Card>
  );
}
