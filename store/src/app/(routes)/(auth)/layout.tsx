export default function AuthLayout({ children }: any) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-200">
      {children}
    </div>
  );
}