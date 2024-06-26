import {
  useUpdateUserProfileHook,
  userGetUserProfileHook,
} from "@/api/UserApi";
import UserProfileForm from "@/components/forms/UserProfileForm";
import LoadSpinner from "@/components/shared/LoadSpinner";

export default function UserProfilePage() {
  const { currentUser, isLoading } = userGetUserProfileHook();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUserProfileHook();

  if (isLoading) {
    return <LoadSpinner />;
  }

  if (!currentUser) {
    return <span>Unable to fetch user . Login again please</span>;
  }
  return (
    <>
      <UserProfileForm
        currentUser={currentUser}
        isLoading={isUpdateLoading}
        onSave={updateUser}
      />
    </>
  );
}
