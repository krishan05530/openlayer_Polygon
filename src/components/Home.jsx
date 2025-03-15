



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";

const Home = ({ setFormData }) => {
    const navigate = useNavigate(); // 
    const [search, setSearch] = useState("");
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phoneNo) {
            alert("Please fill all the fields");
            return;
        }

        if (phoneNo.length !== 10) {
            alert("Phone number should be 10 digits long");
            return;
        }
        setFormData({ name, phoneNo }); //
        navigate("/map"); //
    };
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
      };
    
  
      const handleSearchKeyPress = (e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // 
          setSearch(""); // Clears search field
        }
      };
    
    

    return (
        <div className="flex flex-col bg-slate-500 items-center justify-center min-h-screen p-4    ">

            {/* need the serch bar*/}
            <div className="relative mb-4 ">
                <CiSearch className="absolute left-3 top-3 text-gray-500" /> {/* 🖼️ Search Icon */}
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="w-full pl-10 p-2 border rounded-md"
                    value={search}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyPress}
                />
            </div>
            <div className=' flex flex-col items-center justify-center min-h-screen p-4 '>
                {/* <h1 className="text-2xl font-bold mb-4">User Form</h1> */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // 
                        required
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Enter your Phone No"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)} // t
                        required
                        className="border p-2 rounded w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                        Submit
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Home;
