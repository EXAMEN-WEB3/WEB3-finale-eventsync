﻿import './globals.css'
import Providers from '../components/Providers'
import AppChrome from '../components/AppChrome'

export const metadata = {
    title: 'EventSync',
    description: "Gestion d'événements en temps réel",
}

export default function RootLayout({ children }) {
    return (
        <html lang="fr" data-theme="dark" suppressHydrationWarning>
        <body>
        <Providers>
            <AppChrome />
            {children}
        </Providers>
        </body>
        </html>
    )
}
