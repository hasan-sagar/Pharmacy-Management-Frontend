import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadSpinner from "../shared/LoadSpinner";

type Props = {
  createUser: any;
  isSuccess: boolean;
  isLoading: boolean;
};

export default function Login({ createUser, isLoading, isSuccess }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      <LoadSpinner />;
    }
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="h-screen w-screen bg-image">
      <div className="pt-20">
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Pharmacy Management System
            </CardTitle>
            <CardDescription className="text-center text-base">
              Welcome User. Sign in with Google to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <GoogleOAuthProvider clientId="860380625664-lfrtfjgjs4pjg3d99f73me1dsfluv8rn.apps.googleusercontent.com">
                <Button
                  type="submit"
                  className="w-full bg-white hover:bg-white"
                >
                  <GoogleLogin
                    useOneTap
                    onSuccess={async (credentialResponse) => {
                      try {
                        await createUser(
                          credentialResponse.credential as string
                        );
                      } catch (error) {
                        console.error("Error during fetch", error);
                      }
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </Button>
              </GoogleOAuthProvider>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
