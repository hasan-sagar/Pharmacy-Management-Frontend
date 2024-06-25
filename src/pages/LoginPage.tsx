import { useCreateUserHook } from "@/api/UserApi";
import Login from "@/components/authentication/Login";

export default function LoginPage() {
  const { createUser, isSuccess, isLoading } = useCreateUserHook();
  return (
    <>
      <Login
        createUser={createUser}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </>
  );
}
