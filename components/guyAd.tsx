import Image from "next/image"
import guy from "/public/images/shared/desktop/image-best-gear.jpg"
import guy_mobile from "/public/images/shared/mobile/image-best-gear.jpg"
import guy_tablet from "/public/images/shared/tablet/image-best-gear.jpg"

export default function AudioAd() {
    return(
        <section className="flex items-center gap-24 lg:flex-row-reverse max-lg:grid max-lg:justify-center max-lg:text-center">
            <Image className="rounded-2xl" src={guy} alt="guy audiophone image" width={700} height={500}/>

            <div className="grid gap-12 lg:pr-[8.5rem]">
                <h2 className="lg:text-5xl max-lg:text-3xl font-extrabold text-black">BRINGING YOU THE <span className="text-orange-400">BEST</span> AUDIO GEAR</h2>

                <p className="text-lg text-gray-500">Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide 
                range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
            </div>
        </section>
    )
}