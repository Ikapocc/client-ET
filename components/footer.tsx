import Image from "next/image"
import logo from "/public/images/shared/desktop/logo.svg"
import fb from "/public/images/shared/desktop/icon-facebook.svg"
import twitter from "/public/images/shared/desktop/icon-twitter.svg"
import insta from "/public/images/shared/desktop/icon-instagram.svg"
import Link from "next/link"

export default function Footer() {
    return(
        <footer className="text-white text-lg bg-bg-original lg:px-36 p-8 max-lg:px-8 max-lg:grid max-lg:text-center">
                <section className="flex lg:justify-between py-8 max-lg:grid max-lg:justify-center max-lg:gap-12">
                    <Image src={logo} alt="company logo"></Image>
                    <ul className="lg:flex justify-between lg:gap-12 text-lg max-lg:grid max-lg:gap-5">
                        <li><Link href={"/"}>Home</Link></li>
                        <li><Link href={`/pages/${"headphones"}`}>Headphones</Link></li>
                        <li><Link href={"/pages/speakers"}>Speakers</Link></li>
                        <li><Link href={"/pages/earphones"}>Earphones</Link></li>
                    </ul>
                </section>

                <section className="grid lg:grid-cols-2 max-lg:gap-10">
                    <div className="grid lg:gap-24 max-lg:gap-12">
                        <p>Audiophile is an all in one stop to fulfill your audio needs. 
                        we’re a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - 
                        we’re open 7 days a week.</p>

                        <p>Copyright 2022. All Rights Reserved</p>
                    </div>

                    <div className="flex items-center lg:justify-end max-lg:justify-center">
                        <ul className="flex gap-12">
                        <li>
                            <Image src={fb} alt="facebook logo"/>
                        </li>
                        <li>
                            <Image src={twitter} alt="facebook logo"/>
                        </li>
                        <li>
                            <Image src={insta} alt="facebook logo"/>
                        </li>
                        </ul>
                    </div>
                </section>
      </footer>
    )
}
