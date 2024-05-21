import { UpdateEmailForm } from "./update-email-form";
import { UpdatePasswordForm } from "./update-password-form";
import { UpdateTwoFactorForm } from "./update-two-factor-form";
import { UpdateUserInfoForm } from "./update-user-info-form";

export function SettingsForm() {
  return (
    <div>
      <UpdateUserInfoForm />
      <UpdateTwoFactorForm />
      <UpdatePasswordForm />
      <UpdateEmailForm />
    </div>
  );
}