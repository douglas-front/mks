

import { Products } from "@/app/types/products";
import { useQuery, UseQueryResult } from "react-query";

type UseProductsReturnType = UseQueryResult<Products, unknown>;

//função de requisição a api
const api = async () => {
    const response =  await fetch("https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=10&sortBy=name&orderBy=ASC")
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