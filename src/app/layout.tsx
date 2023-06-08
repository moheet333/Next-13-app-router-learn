import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Inter } from "next/font/google";
import { Container, SSRProvider } from "@/components/bootstrap";
import NavBar from "./NavBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learning Next",
  description: "Your one stop to learn Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SSRProvider>
          <NavBar />
          <main>
            <Container className="py-4">
              {/* <div>This div is shared across the layouts</div> */}
              {children}
            </Container>
          </main>
        </SSRProvider>
      </body>
    </html>
  );
}
