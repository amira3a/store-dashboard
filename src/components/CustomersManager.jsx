import { useState, useEffect } from "react";
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } from "../apiService";

const CustomersManager = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", purchases: "" });
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      const customersData = await fetchCustomers();
      setCustomers(customersData);
      setLoading(false);
    };
    loadCustomers();
  }, []);

  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.email) return;
    await addCustomer(newCustomer);
    setCustomers([...customers, { id: Math.random(), ...newCustomer }]);
    setNewCustomer({ name: "", email: "", purchases: "" });
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setNewCustomer(customer);
  };

  const handleUpdateCustomer = async () => {
    if (!editingCustomer) return;
    await updateCustomer(editingCustomer.id, newCustomer);
    setCustomers(customers.map((c) => (c.id === editingCustomer.id ? newCustomer : c)));
    setEditingCustomer(null);
    setNewCustomer({ name: "", email: "", purchases: 0 });
  };

  const handleDeleteCustomer = async (id) => {
    await deleteCustomer(id);
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Customers</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          className="border p-3 rounded-md w-full sm:w-1/3"
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          className="border p-3 rounded-md w-full sm:w-1/3"
        />
        <input
          type="number"
          placeholder="Purchases"
          value={newCustomer.purchases}
          onChange={(e) => setNewCustomer({ ...newCustomer, purchases: parseInt(e.target.value) })}
          className="border p-3 rounded-md w-full sm:w-1/4"
        />

        {editingCustomer ? (
          <button
            onClick={handleUpdateCustomer}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Update Customer
          </button>
        ) : (
          <button
            onClick={handleAddCustomer}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Add Customer
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
                <th className="border p-3">Email</th>
                <th className="border p-3">Purchases</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="text-center border-b hover:bg-gray-50">
                  <td className="border p-3">{customer.name}</td>
                  <td className="border p-3">{customer.email}</td>
                  <td className="border p-3">{customer.purchases}</td>
                  <td className="p-3 flex gap-1">
                    <button
                      onClick={() => handleEditCustomer(customer)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
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

      {/* Total Customers Card */}
      <div className="mt-6 bg-yellow-100 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-yellow-800">Total Customers</h2>
        <p className="text-2xl font-bold text-yellow-900">{customers.length}</p>
      </div>
    </div>
  );
};

export default CustomersManager;
