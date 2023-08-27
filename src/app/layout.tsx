import "../styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Provider } from "@/utils/Provider";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "Gerenciador de Estabelecimentos",
    description: "Gerenciador de Estabelecimentos de Oticas",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className={poppins.className}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
