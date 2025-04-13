import { useEffect, useState } from "react";
import { fetchSales, fetchProducts, fetchCustomers } from "../apiService";
import { auth } from "../firebase";
import ProductsManager from "./ProductsManager";
import CustomersManager from "./CustomersManager";
import Sidebar from "./Sidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // overview, products, customers
  const [darkMode, setDarkMode] = useState(false);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode to document if you want to implement app-wide dark mode
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Calculate metrics
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalProducts = products.length;
  const totalCustomers = customers.length;
  const avgOrderValue = sales.length ? totalSales / sales.length : 0;

  // Example data - in a real scenario, you would transform your sales data
  const monthlySalesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
  ];

  // Example data for category distribution
  const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Books', value: 300 },
    { name: 'Home', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <Sidebar 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode} 
        onLogout={handleLogout} 
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Store Dashboard
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Welcome to your store management system
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 border-b">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium ${activeTab === 'overview' 
              ? `border-b-2 ${darkMode ? 'border-blue-400 text-blue-400' : 'border-blue-600 text-blue-600'}` 
              : `${darkMode ? 'text-gray-400' : 'text-gray-600'}`}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 font-medium ${activeTab === 'products' 
              ? `border-b-2 ${darkMode ? 'border-blue-400 text-blue-400' : 'border-blue-600 text-blue-600'}` 
              : `${darkMode ? 'text-gray-400' : 'text-gray-600'}`}`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab("customers")}
            className={`px-4 py-2 font-medium ${activeTab === 'customers' 
              ? `border-b-2 ${darkMode ? 'border-blue-400 text-blue-400' : 'border-blue-600 text-blue-600'}` 
              : `${darkMode ? 'text-gray-400' : 'text-gray-600'}`}`}
          >
            Customers
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${darkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className="text-lg font-semibold text-gray-500">Total Sales</h2>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      ${totalSales.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className="text-lg font-semibold text-gray-500">Products</h2>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {totalProducts}
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className="text-lg font-semibold text-gray-500">Customers</h2>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      {totalCustomers}
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className="text-lg font-semibold text-gray-500">Avg. Order</h2>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                      ${avgOrderValue.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Monthly Sales
                    </h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={monthlySalesData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#eee"} />
                          <XAxis dataKey="name" stroke={darkMode ? "#aaa" : "#666"} />
                          <YAxis stroke={darkMode ? "#aaa" : "#666"} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: darkMode ? '#333' : '#fff',
                              borderColor: darkMode ? '#555' : '#ddd',
                              color: darkMode ? '#fff' : '#333'
                            }} 
                          />
                          <Legend />
                          <Bar dataKey="sales" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Category Distribution
                    </h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: darkMode ? '#333' : '#fff',
                              borderColor: darkMode ? '#555' : '#ddd',
                              color: darkMode ? '#fff' : '#333'
                            }} 
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                {/* Recent Sales Table */}
                <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Recent Sales
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                        <tr>
                          <th className="p-3 text-left">Date</th>
                          <th className="p-3 text-left">Customer</th>
                          <th className="p-3 text-left">Product</th>
                          <th className="p-3 text-left">Amount</th>
                          <th className="p-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sales.slice(0, 5).map((sale, index) => (
                          <tr key={sale.id || index} className={darkMode ? 'border-b border-gray-700' : 'border-b'}>
                            <td className="p-3">{sale.date || '2023-01-01'}</td>
                            <td className="p-3">{sale.customer || 'Customer Name'}</td>
                            <td className="p-3">{sale.product || 'Product Name'}</td>
                            <td className="p-3">${sale.amount || '0.00'}</td>
                            <td className="p-3">
                              <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                                Completed
                              </span>
                            </td>
                          </tr>
                        ))}
                        {sales.length === 0 && (
                          <tr>
                            <td colSpan="5" className="p-3 text-center text-gray-500">
                              No sales data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products Tab */}
            {activeTab === "products" && <ProductsManager />}
            
            {/* Customers Tab */}
            {activeTab === "customers" && <CustomersManager />}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;