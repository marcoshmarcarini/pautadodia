import localFont from "next/font/local"

const ConstructioGrotesk = localFont({
    src: '../../app/fonts/Constructio_Grotesk/Regular.woff',
    variable: '--font-constructio-grotesk'
})

const Zamora = localFont({
    src: '../../app/fonts/Zamora/Zamora-Regular.woff',
    variable: '--font-zamora'
})

const Extenda = localFont(
    {
        src: [
            {
                path: '../../app/fonts/Extenda/30Deca.woff',
                weight: '100',
                style: 'normal'
            },
            {
                path: '../../app/fonts/Extenda/50Mega.woff',
                weight: '500',
                style: 'normal'
            },
            {
                path: '../../app/fonts/Extenda/70Tera.woff',
                weight: '700',
                style: 'normal'
            },
            {
                path: '../../app/fonts/Extenda/100Yotta.woff',
                weight: '900',
                style: 'normal'
            },
        ],
    }
)

const RocGrotesk = localFont(
    {
        src: [
            {
                path: '../../app/fonts/RocGrotesk/RocGrotesk-Thin.woff',
                weight: '100',
                style: 'normal'
            },
            {
                path: '../../app/fonts/RocGrotesk/RocGrotesk-Light.woff',
                weight: '300',
                style: 'normal'
            },

            {
                path: '../../app/fonts/RocGrotesk/RocGrotesk-Regular.woff',
                weight: '400',
                style: 'normal'
            },
            {
                path: '../../app/fonts/RocGrotesk/RocGrotesk-Medium.woff',
                weight: '500',
                style: 'normal'
            },
            {
                path: '../../app/fonts/RocGrotesk/RocGrotesk-Bold.woff',
                weight: '700',
                style: 'normal'
            },
            {
                path: '../../app/fonts/RocGrotesk/RocGrotesk-Black.woff',
                weight: '900',
                style: 'normal'
            },
        ],
    }
)

export { ConstructioGrotesk, Zamora, Extenda, RocGrotesk }