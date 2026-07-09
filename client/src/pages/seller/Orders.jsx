/*import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import axios from 'axios';
import toast from 'react-hot-toast';

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update Order Status
  /*const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(`/api/order/status/${id}`, { status });
      if (data.success) {
        toast.success("Status updated");
        fetchOrders(); // Refresh orders after update
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };/
  const updateStatus = async (id, status) => {
  try {
    const { data } = await axios.put(
      `/api/order/status/${id}`, // check your backend route
      { status },                // request body
      {
        headers: {
          Authorization: `Bearer ${user.token}` // send token
        }
      }
    );

    if (data.success) {
      toast.success("Status updated");
      fetchOrders(); // Refresh orders after update
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error.response); // see backend error details
    toast.error(error.response?.data?.message || error.message);
  }
};


  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-l h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
          >
           
            <div className="flex gap-5 max-w-80">
              <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-medium">
                    {item.product.name} <span className="text-primary">x {item.quantity}</span>
                  </p>
                ))}
              </div>
            </div>

            
            <div className="text-sm md:text-base text-black/60">
              <p className="text-black/80">{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}, {order.address.city}</p>
              <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
              <p>{order.address.phone}</p>
            </div>

            
            <p className="font-medium text-lg my-auto">{currency}{order.amount}</p>

            
            <div className="flex flex-col text-sm md:text-base text-black/60">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>

             
              <div className="mt-2">
                <label className="font-medium">Status:</label>
                <select
                  className="border p-1 rounded ml-2"
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;*/

import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import axios from 'axios';
import toast from 'react-hot-toast';

const Orders = () => {
  const { currency, user } = useAppContext(); // ✅ included user for token
  const [orders, setOrders] = useState([]);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller', {
        headers: {
          Authorization: `Bearer ${user.token}`, // send token for auth
        },
      });
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Update Order Status
  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `/api/order/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // send token for auth
          },
        }
      );

      if (data.success) {
        toast.success('Status updated');
        fetchOrders(); // Refresh orders after update
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.response); // check backend error
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="no-scrollbar flex-l h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
          >
            {/* Product */}
            <div className="flex gap-5 max-w-80">
              <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-medium">
                    {item.product.name} <span className="text-primary">x {item.quantity}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="text-sm md:text-base text-black/60">
              <p className="text-black/80">{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}, {order.address.city}</p>
              <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
              <p>{order.address.phone}</p>
            </div>

            {/* Amount */}
            <p className="font-medium text-lg my-auto">{currency}{order.amount}</p>

            {/* Payment + Status */}
            <div className="flex flex-col text-sm md:text-base text-black/60">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? 'Paid' : 'Pending'}</p>

              {/* Status Dropdown */}
              <div className="mt-2">
                <label className="font-medium">Status:</label>
                <select
                  className="border p-1 rounded ml-2"
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
