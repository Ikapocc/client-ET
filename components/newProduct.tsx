import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import React from "react"
import { SelectGroupItems } from "./selectItem"
import { CreateInputAndTextArea } from "./createinputorarea"
import { DialogSizes } from "./DialogSizes"
import { AudioStore } from "@/app/store/audioStore2"

async function CreatingNewPost(data : any, token : string) {
    await fetch("http://localhost:4000/api/admin/create", {
        method : "POST",
        body : JSON.stringify(data)
    })
    
}

export const DialogAddPost : React.FC = () => {

  const {userInfo, user_token} = AudioStore(state => state)

  function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const title = formData.get("product_title")
    const textarea = formData.get("text_area_product")
    const select = formData.get("select_category")
    const stockValue = formData.get("product_stock")
    const sku = formData.get("product_sku")
    const price = formData.get("product_price")
    
    const option = {
        product_name : title,
        category : select,
        price : price,
        stock : stockValue,
        sku : sku,
        description : textarea,
        createBy : userInfo?._id,
        createdAt : new Date
    }
    
    CreatingNewPost(option, user_token)
  }

  const categories = ["smartphones", "beauty", "furniture", "groceries", "home-decoration", "laptops", "vehicle", "womens-jewellery", "skin-care"]
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="border-2 border-white py-4 px-6 rounded-xl">New Product</button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white max-w-[850px] h-[750px] max-sm:max-w-[360px] max-sm:h-[480px]">
        <DialogHeader>
          <DialogTitle className="max-lg:text-sm">New Product</DialogTitle>
          <DialogDescription className="max-lg:text-xs">
            Add a new product
          </DialogDescription>
        </DialogHeader>
        <section>
          <form onSubmit={handleSubmit} className="grid gap-10">
              
              <CreateInputAndTextArea input_name="product_title" title="Product title" typeOfElement="input"/>
              <DialogSizes>
                <Label htmlFor="product_title" className="text-left col-span-7 max-lg:text-xs max-sm:mb-4">
                  Select a category
                </Label>
                <SelectGroupItems<string> arr={categories} title="select_category"/>
              </DialogSizes>
              <CreateInputAndTextArea input_name="text_area_product" title="Product Details" typeOfElement="textArea"/>
              <CreateInputAndTextArea input_name="product_price" title="Product Price" typeOfElement="input"/>
              <CreateInputAndTextArea input_name="product_stock" title="Product stock" typeOfElement="input"/>
              <CreateInputAndTextArea input_name="product_sku" title="Product sku" typeOfElement="input"/>

              <div className="flex justify-between w-full">
                <DialogClose>
                  <Button className="max-lg:text-xs max-lg:px-3 max-lg:py-2 bg-white text-black" type="reset">Cancel</Button>
                </DialogClose>
                <Button className="max-lg:text-xs max-lg:px-3 max-lg:py-2 bg-white text-black" type="submit">Save changes</Button>
              </div>
            </form>
        </section>
      </DialogContent>
    </Dialog>
  )
}
