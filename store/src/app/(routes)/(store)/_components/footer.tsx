

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto p-4 text-center">
        <span className="text-xs text-black">
          {`© ${new Date().getFullYear()} Songbird Instruments`}
        </span>
      </div>
    </footer>
  );
}