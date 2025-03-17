import { useEffect, useState } from "react";
import { fetchSales, fetchProducts, fetchCustomers } from "../apiService";
import { auth } from "../firebase";
import ProductsManager from "./ProductsManager";
import CustomersManager from "./CustomersManager";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const salesData = await fetchSales();
        const productsData = await fetchProducts();
        const customersData = await fetchCustomers();
        
        setSales(salesData);
        setProducts(productsData);
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div className="flex">
      <Sidebar onLogout={handleLogout} />
      <div className="p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Store Dashboard</h1>
          <ProductsManager />
          <CustomersManager />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-200 p-4 rounded">
              <h2 className="text-xl font-semibold">Total Sales</h2>
              <p className="text-lg">{sales.reduce((sum, sale) => sum + sale.amount, 0)} USD</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;