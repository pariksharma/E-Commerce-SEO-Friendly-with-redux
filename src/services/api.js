// Function to fetch product details by ID
export const getProductsById = async (productId) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching product details:', error.message);
        throw error; // Re-throwing the error for handling in components
    }
};

// Function to fetch list of all products
export const getProductsList = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
            throw new Error('Failed to fetch products list');
        }

        return response;
    } catch (error) {
        console.error('Error fetching products list:', error.message);
        throw error; // Re-throwing the error for handling in components
    }
};
