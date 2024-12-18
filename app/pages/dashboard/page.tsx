"use client"

import { AudioStore } from "@/app/store/audioStore2"
import { useQuery } from "@tanstack/react-query"

async function GettingSells(id : string) {
    
    const data = await fetch("http://localhost:4000/api/admin/check", {
        method: "GET", 
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({ id }) 
    });

    const adminData = await data.json()

    console.log(JSON.stringify({ id }) );
    

    return adminData
}

export default function Dashboard() {
    
    const {userInfo} = AudioStore(state => state)

    const {data, isLoading, isFetching} = useQuery({
        queryKey : ["admin_sells"],
        queryFn : () => GettingSells(userInfo._id)
    })

    console.log(data)

    if (isLoading || isFetching) return <div>...Loading</div>
    
    return(
        <h1>Dashboard</h1>
    )
}