import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";

// 🔹 Fetch Sales Data
export const fetchSales = async () => {
  const querySnapshot = await getDocs(collection(db, "sales"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 🔹 Fetch Products Data
export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 🔹 Fetch Customers Data
export const fetchCustomers = async () => {
  const querySnapshot = await getDocs(collection(db, "customers"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 🔹 Add New Sale
export const addSale = async (sale) => {
  await addDoc(collection(db, "sales"), sale);
};

// 🔹 Add New Product
export const addProduct = async (product) => {
  await addDoc(collection(db, "products"), product);
};

// 🔹 Add New Customer
export const addCustomer = async (customer) => {
  await addDoc(collection(db, "customers"), customer);
};

// 🔹 Update Product
export const updateProduct = async (id, updatedProduct) => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, updatedProduct);
};

// 🔹 Delete Product
export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};

// 🔹 Update Customer ✅ (NEW)
export const updateCustomer = async (id, updatedCustomer) => {
  try {
    const customerRef = doc(db, "customers", id);
    await updateDoc(customerRef, updatedCustomer);
    console.log(`Customer ${id} updated successfully.`);
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};


// 🔹 Delete Customer ✅ (NEW)
export const deleteCustomer = async (id) => {
  await deleteDoc(doc(db, "customers", id));
};
