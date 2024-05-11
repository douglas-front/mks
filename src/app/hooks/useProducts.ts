

import { Products } from "@/app/types/products";
import { useQuery, UseQueryResult } from "react-query";

type UseProductsReturnType = UseQueryResult<Products, unknown>;

//função de requisição a api
const api = async () => {
    const response =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}`)
    const data = await response.json()

    return data
}

export function useProducts(){
    //usando a biblioteca react query
    const query: UseProductsReturnType = useQuery({
        queryFn: api,
        queryKey: ['product-data']
    })
    return {
        ...query,
        data: query.data
    }
}