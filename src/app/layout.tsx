import "../styles/globals.css";

export const metadata = {
  title: "Mini Project React",
  description: "Reqres Auth App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
