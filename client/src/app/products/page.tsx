"use client";

import { useCreateProductMutation, useGetProductsQuery } from '@/state/api';
import { PlusCircleIcon, Search, SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import Header from '../(components)/Header';
import Image from 'next/image';
import Rating from '../(components)/Rating';
import CreateProductModal from './CreateProductModal';

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};


const Products = () => {
 
const [searchTerm, setSearchTerm] =useState("");
const [isModalOpen ,setIsModalOpen] = useState(false); 

const {data : products, isError,isLoading} = useGetProductsQuery(searchTerm);


const [ createProduct ] = useCreateProductMutation();

const handleCreateProduct = async (productData : ProductFormData) =>{
  await createProduct(productData);
};

if(isLoading){

  return (
    <div className='text-2xl py-6'>Loading...</div>
  );
}
if(isLoading || !products){
    return (
    <div className='text-center text-red-500 py-4'>
        Failed to Load Products!
    </div>
    );
};


  return (
    <div className='mx-auto pb-5 w-full'>
     {/*  SEARCH BAR */}

    <div className='mb-6'>
      <div className='flex items-center  bg-gray-100 border-2 border-gray-200  focus:border-dark-blue-400 rounded-lg '>
        <SearchIcon className='w-5 h-5  text-gray-600 m-2 '/>
        <input 
        className='w-full bg-white py-2 px-2 rounded-lg focus:bg-blue-100 focus:outline-none '
        placeholder='Search Products...'
        value= {searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        /> 
      </div>
    </div>


    {/* HEADER BAR */}
    <div className='flex justify-between items-center mb-6'>
    <Header name = "Products" />
    <button 
     className="group flex items-center overflow-hidden rounded-4xl bg-gray-100 px-2 py-2 text-white transition-all duration-300 hover:px-4 hover:pr-5 hover:bg-blue-200"
     onClick={() => setIsModalOpen(true)}
     > 
    <span className="text-xl">
    <PlusCircleIcon  size= {24} className="w-6 h-6 text-gray-800 "/>
    </span>
    <span className="ml-0 w-0 text-sm font-semibold text-gray-500 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-auto group-hover:opacity-100">
    Create Product
    </span>
  </button>
    </div>

 {/* BODY PRODUCTS LIST */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="shadow-md  rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                 <Image
                  src={`/assets/product${
                    Math.floor(Math.random() * 3) + 1
                  }.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                /> 
                <div>img</div>
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;