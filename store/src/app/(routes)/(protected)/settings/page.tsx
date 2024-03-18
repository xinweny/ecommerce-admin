import { UpdateEmailForm } from "./_components/update-email-form";
import { UpdatePasswordForm } from "./_components/update-password-form";
import { UpdateUserInfoForm } from "./_components/update-user-info-form";

export default function SettingsPage() {
  return (
    <>
      <UpdateUserInfoForm />
      <UpdatePasswordForm />
      <UpdateEmailForm />
    </>
  );
}