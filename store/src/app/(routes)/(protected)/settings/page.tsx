import { ChangePasswordForm } from "./_components/change-password-form";
import { UpdateUserInfoForm } from "./_components/update-user-info-form";

export default function SettingsPage() {
  return (
    <>
      <UpdateUserInfoForm />
      <ChangePasswordForm />
    </>
  );
}