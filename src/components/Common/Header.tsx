import Link from "next/link"

const Header = () => {
  return (
    <div className="w-full h-full p-6 bg-primary">
        <nav className="flex justify-between items-center mx-48 my-2">
            <div className="bg-destructive-foreground rounded-lg p-2">
                <h1 className="text-2xl">FotStat</h1>
            </div>
            <div>

            {/* Replace with actual links */}
            <ul className="flex justify-center gap-16">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
            </div>
        </nav>
    </div>
  )
}
export default Header