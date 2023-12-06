import React, { useState, ChangeEvent } from 'react';
import { LiaTimesSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import { SearchComponentProp } from '../api/type.check';
import productArray from '../../data';
import './SearchPage.css';

interface Product {
  id: number;
  productName: string;
}

const SearchPage: React.FC<SearchComponentProp> = ({ setShowSearch, showSearch }) => {
  const [products, setProducts] = useState<Product[]>(productArray);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleSearch = (query: string): void => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    handleSearch(inputValue);
  };

  const handleShowSearch = (): void => {
    setShowSearch(!showSearch);
  };
console.log(setProducts)
  return (
    <div className='Search_Main_Page'>
      <LiaTimesSolid onClick={handleShowSearch} className="Search_times_icon" />
      <div className='Search_Page_wrap'>
        <p style={{ fontSize: "25px", fontWeight: "bolder" }}>Search For Product</p>
        <div className='Search_Input_Div'>
          <input
            placeholder='Search for product'
            type='text'
            className='Search_Input'
            value={searchInput}
            onChange={handleInputChange}
          />
          <CiSearch className="Search_Component_SearchIcon" />
        </div>
        <div>
          {filteredProducts.map((product) => (
            <p key={product.id}>{product.productName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
