import type { AppProps } from 'next/app'

// Import CSS stylesheet
import '../styles/main.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
