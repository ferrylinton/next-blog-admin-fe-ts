export default function ImageIcon({ className }: IconType) {

    return <svg xmlns="http://www.w3.org/2000/svg"
        className={`${className}`}
        viewBox="0 0 24 24">
        <path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z" />
    </svg>
}