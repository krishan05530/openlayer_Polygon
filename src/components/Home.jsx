



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ setFormData }) => {
    const navigate = useNavigate(); // ✅ Correct useNavigate()
    
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();

               if(!name || !phoneNo ) {
            alert("Please fill all the fields"); 
            return;
        }

        if(phoneNo.length !== 10) {
            alert("Phone number should be 10 digits long");
            return;
        }
        setFormData({ name, phoneNo }); // ✅ Properly setting formData
        navigate("/map"); // ✅ Navigate correctly
    };

    return (
        <div className="flex flex-col bg-slate-500 items-center justify-center min-h-screen p-4    ">
            <h1 className="text-2xl font-bold mb-4">User Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // ✅ Controlled Input
                    required
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Enter your Phone No"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)} // ✅ Controlled Input
                    required
                    className="border p-2 rounded w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Home;
