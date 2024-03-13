interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <div>
      {children}
    </div>
  );
}