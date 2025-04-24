import { create } from "zustand";

export const useProductStore = create((set)=>({
    products:[],
    setProducts: (products)=>set({products}),
    createProduct: async (newProduct)=>{
        if(!newProduct.name || !newProduct.image || newProduct.price === undefined){
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch("/api/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct),

        })
        const data = await res.json()
        set((state)=>({products:[...state.products, data.data]}))
        return {success:true, message:"Product created successfully."}
    },
    fetchProducts: async ()=>{
        try {
            const res = await fetch("/api/products",{
                method:"GET",
            })
            const data = await res.json()
            set(()=>({products:data.data}))
            return {success:true, message:"Product list fetched successfully"}
        } catch (error) {
            return {success:false, message:error.message}
        }
    },
    deleteProduct: async (product_id)=>{
        const res = await fetch(`/api/products/${product_id}`,{
            method:"DELETE"
        })
        const data = await res.json()
        if (!data.success) return {success:data.success, message:data.message}

        set(state=>({products:state.products.filter(p=>p._id !== product_id)}))
        return {success:data.success, message:data.message}
    },
    updateProduct: async (product_id,updatedProduct)=>{
        const res = await fetch(`/api/products/${product_id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedProduct)
        })
        const data = await res.json()
        if(!data.success) return {success:false, message:data.message}

        set(state=>({products:
            state.products.map(p=>p._id === product_id ? data.data : p)
        }))
        return {success:data.success, message:data.message}
    }
}))
