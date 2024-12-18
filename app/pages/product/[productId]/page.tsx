"use client"

import { FetchSingleProductResults } from "@/app/type";
import Header from "@/components/header";
import { SingleProduct } from "@/components/singleproduct";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

async function GettingProducts(product : string) : Promise<FetchSingleProductResults[]> {
    const data = await fetch(`http://localhost:8080/api/product/${product}`,{
        method : "GET"
    })
    const infoProduct = await data.json()

    return infoProduct
}

export default function PageProduct() {
    
    const params = useParams<{productId : string}>()

    const {data : productData, isLoading, isFetching} = useQuery({
        queryKey : ["get_product_data"],
        queryFn : () => GettingProducts(params.productId)
    })

    if (isLoading || isFetching) return <div>...Loading</div>
    
    return(
        <article>
            <section className="flex flex-col">
                <Header />
                <SingleProduct data={productData} />
            </section>
        </article>
    )
}