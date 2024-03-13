import { signOut } from "next-auth/react";

export default function SettingsPage() {
  const onClick = () => { signOut(); };

  return (
    <div>
      <button onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  );
}