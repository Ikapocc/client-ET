import Link from "next/link";
import { LinkToProducts } from "./linktoproducts";
import headphones from "/public/images/product-xx99-mark-one-headphones/computer/image-category-page-preview.jpg"
import speaker from "/public/images/product-zx9-speaker/computer/image-category-page-preview.jpg"
import earphones from "/public/images/product-yx1-earphones/computer/image-category-page-preview.jpg"

export default function Products() {
    return(
        <section className="flex justify-between xl:px-[7.5rem] lg:px-20 max-lg:grid max-lg:justify-center max-lg:gap-8">
          <Link href={"/pages/headphones"}>
            <LinkToProducts image={headphones} title={"HEADPHONES"}/>
          </Link>
          <Link href={"/pages/speakers"}>
            <LinkToProducts image={speaker} title={"SPEAKER"} />
          </Link>
          <Link href={"/pages/earphones"}>
            <LinkToProducts image={earphones} title={"EARPHONES"} />
          </Link>
        </section>
    )
}