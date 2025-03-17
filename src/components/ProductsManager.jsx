import { useState, useEffect } from "react";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../apiService";

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", category: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) return;
    await addProduct(newProduct);
    setProducts([...products, { id: Math.random(), ...newProduct }]);
    setNewProduct({ name: "", price: "", stock: "", category: "" });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    await updateProduct(editingProduct.id, newProduct);
    setProducts(products.map((p) => (p.id === editingProduct.id ? newProduct : p)));
    setEditingProduct(null);
    setNewProduct({ name: "", price: "", stock: "", category: "" });
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Products</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-3 rounded-md w-full sm:w-1/5"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-3 rounded-md w-full sm:w-1/5"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          className="border p-3 rounded-md w-full sm:w-1/5"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="border p-3 rounded-md w-full sm:w-1/5"
        />
        {editingProduct ? (
          <button
            onClick={handleUpdateProduct}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Update Product
          </button>
        ) : (
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Name</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Stock</th>
                <th className="border p-3">Category</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-center border-b hover:bg-gray-50">
                  <td className="border p-3">{product.name}</td>
                  <td className="border p-3">${product.price}</td>
                  <td className="border p-3">{product.stock}</td>
                  <td className="border p-3">{product.category}</td>
                  <td className="border p-3">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Total Products Card */}
      <div className="mt-6 bg-green-100 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-green-800">Total Products</h2>
        <p className="text-2xl font-bold text-green-900">{products.length}</p>
      </div>
    </div>
  );
};

export default ProductsManager;
