import {create} from "zustand"


export const useProductStore = create((set)=> ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success: false , message: "please fill in allfields."}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers:{
                "content-type" : "application/json"
            },
            body:JSON.stringify(newProduct) 
        }) 
        const data = await res.json();
        set((state) => ({products:[...state.products,data.data]}))
        return {success: true , message: "Product created successfully."};
    },
    fetchProducts : async () => {
        const res = await fetch("/api/products")
        const data = await res.json()
        set({products: data.data});
    },
    deleteProduct: async (pid) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {  // Fix: use backticks
                method: "DELETE",
            });
    
            const data = await res.json();
    
            if (!data.success) {
                return { success: false, message: data.message };
            }
    
            // Update the UI immediately by filtering out the deleted product
            set(state => ({
                products: state.products.filter(product => product._id !== pid)
            }));
    
            return { success: true, message: data.message };
        } catch (error) {
            // Handle any network or server errors
            return { success: false, message: 'Failed to delete product.' };
        }
    },
    
    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {  // Use backticks for template literals
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",  // Ensure the header is correctly capitalized
                },
                body: JSON.stringify(updatedProduct),
            });
    
            const data = await res.json();
    
            if (!data.success) {
                return { success: false, message: data.message };
            }
    
            // Update the UI immediately without a refresh
            set(state => ({
                products: state.products.map(product =>
                    product._id === pid ? data.data : product  // Ensure the correct field (`_id`) is used
                ),
            }));
    
            return { success: true, message: "Product updated successfully." };
    
        } catch (error) {
            return { success: false, message: 'Failed to update product.' };
        }
    },
    
}))