"use client"

import { useQuery } from "@tanstack/react-query";
import { ProductProps } from "./type";
import { IndividualItems } from "@/components/cardProduct";
import { AudioStore } from "./store/audioStore2";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { CheckboxOption } from "@/components/checkbox";

async function GettingAllProducts(token : string) : Promise<ProductProps[]> {
  const data = await fetch("http://localhost:4000/api/user", {
    headers : {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  })

  if (!data.ok) {
    if (data.status === 401) {
      throw new Error("Unauthorized: Token is invalid or missing");
    } else {
      throw new Error(`Error ${data.status}: ${data.statusText}`);
    }
  }
  
  return data.json()
}

export default function Home() {
  

  const {addProduct, isUserLog, user_token} = AudioStore(state => state)
  const [range, setRange] = useState([100, 35000]);
  const [selectCategories, setSelectCategories] = useState<string[]>([])
  
  const {data : all_products, isFetching : fetched_All_products, isLoading : isLoading_All_products} = useQuery({
    queryKey : ["user_products"],
    queryFn : () => GettingAllProducts(user_token)
  })
  
  function sendDataProduct(data : ProductProps) {
    addProduct({
      id: data!._id, 
      image: data!.thumbnail, 
      price : data!.price, 
      quantity : 1, 
      title : data!.product_name,
      category : data.category,
      createBy : data.createBy,
      description : data.description,
      sku : data.sku,
      stock : data.stock
    })
  }

  function handleOption(data : string) {
    setSelectCategories((prev) => selectCategories.includes(data) ? 
    selectCategories.filter(items => items !== data) : [...prev, data]
  )
  }

  const todosFilter = selectCategories.length > 0 ? all_products?.filter(items => selectCategories.includes(items.category)).filter(data => data.price >= range[0])
  : selectCategories.length === 0 && range[0] > 100 ? all_products?.filter(data => data.price >= range[0]) : all_products
  
  if (fetched_All_products || isLoading_All_products) return <div>...Loading</div>

  const categories = ["smartphones", "beauty", "furniture", "groceries", "home-decoration", "laptops", "vehicle", "womens-jewellery", "skin-care"]

  console.log(range[0]);
  
  return (
    <article className="flex gap-16">
      <aside className="gap-10 w-[25%] justify-between">
        <div className="w-full max-w-md mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p>Options</p>
            {categories.map((items, id) => (
              <CheckboxOption key={id} data={items} passOption={handleOption}/>
            ))}
          </div>

          <div className="items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Rangos de Precio</h2>
            <p className="text-sm text-gray-500 mb-4">
              Fija un mínimo y un máximo
            </p>
            <span className="text-lg font-medium text-gray-700">
              ${range[0].toLocaleString()} - ${range[1].toLocaleString()}
            </span>
          </div>

          <Slider
            className={cn("w-[100%]")}
            defaultValue={range}
            min={100} 
            max={35000}
            onValueChange={(value) => setRange(value)} 
          />

          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Mínimo</span>
            <span>Máximo</span>
          </div>
        </div>
      </aside>
      {isUserLog ? <IndividualItems allProdiucts={todosFilter} gettingDataProduct={sendDataProduct}/> : <div>Please log in to see the products</div>}
    </article>
  );
}
