import React, { useState, useEffect } from 'react';
import './CategoryFilter.css'; // Make sure the path is correct
import { FetchCategories } from '../logic/backend';
import CategorySelect from '../assets/categoryComponent/CategorySelect';

export interface filterData {
  postType?: 'socialMedia' | 'sale';
  text?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: number;
  itemCategory?: number;
  feedType?: 'following' | 'allFeed' | 'filter';
}

export interface CategoryFilterProps {
  onClose: () => void;
  onFilterChange: (f : filterData) => void;
}

export interface Category {
  categoryID: number;
  name: string;
  children: Category[];
}

export const categoryMap: { [key: string]: number } = {
  lostAndFound: 1,
  secondHand: 3,
  privateLesson: 2,
  trade: 4,
  borrow: 0,
  all: -1
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({onFilterChange }) => {
 
  const [postType, setPostType] = useState<'socialMedia' | 'sale'>('socialMedia');
const [selectedFilter, setSelectedFilter] = useState<'following' | 'allFeed' | 'filter'>('allFeed');
  const [itemCategory, setItemCategory] = useState<number | undefined>(undefined);

 
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState<number | undefined>(undefined);

  const [socialMediaText, setSocialMediaText] = useState('');
  const [saleText, setSaleText] = useState('');
  const [data, setData] = useState<Category[]>([]);

  const [isInitialized, setIsInitialized] = useState(false);


const handleItemCategoryChange = (categoryId: number) => {
  setItemCategory(categoryId); // Update the state with the new category ID
};

const handleFilterChange = () => {
  onFilterChange({
    postType,
    text: postType === 'socialMedia' ? socialMediaText : saleText,
    minPrice,
    maxPrice,
    category,
    itemCategory,
    feedType: selectedFilter as 'following' | 'allFeed' | 'filter' // Make sure this casting is safe

  });
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchCategories();
        setData(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        
      }
      setIsInitialized(true);
    };
      fetchData();
  }, []); 
  useEffect(() => {
    if (isInitialized) {
      handleFilterChange(); // Call this only when isInitialized is true
    }
  }, [isInitialized]);
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Update to use undefined instead of an empty string
    const value = event.target.value;
    setCategory(value ? categoryMap[value] : undefined);
  };

 
  return (
    
    <div className="category-filter-container">
    
    <div className="category-filter-header">Filter the Post</div>
    <div className="button-group">
      <div className='button1'> <button 
        className={`post-type-button ${postType === 'socialMedia' ? 'active' : ''}`}
        onClick={() => setPostType('socialMedia')}
      >
        Social Media Post
      </button></div>
     
      <button 
        className={`post-type-button ${postType === 'sale' ? 'active' : ''}`}
        onClick={() => setPostType('sale')}
      >
        Sale Post
      </button></div>
      <div className="button-group">
        <div className='button2'> <button 
    className={`post-type-button ${selectedFilter === 'following' ? 'active' : ''}`}
    onClick={() => setSelectedFilter('following')}
  >
    See Following
  </button></div>
 
  <button 
    className={`post-type-button ${selectedFilter === 'allFeed' ? 'active' : ''}`}
    onClick={() => setSelectedFilter('allFeed')}
  >
    See all Feed
  </button>

  <button 
    className={`post-type-button ${selectedFilter === 'filter' ? 'active' : ''}`}
    onClick={() => setSelectedFilter('filter')}
  >
    Filter
  </button>
</div>
    {postType === 'socialMedia' && selectedFilter === 'filter' && (
      <input
        type="text"
        className="social-media-input"
        placeholder="Check Post Contains a Text"
        value={socialMediaText}
        onChange={(e) => setSocialMediaText(e.target.value)}
      />
    )}
      {postType === 'sale' && selectedFilter === 'filter' && (
        <div className="sale-options">
          <div className='contains-input'>
          <input 
          type="text"
          className="sale-input"
          placeholder="Check Post Contains a Text"
          value={saleText}
          onChange={(e) => setSaleText(e.target.value)}
        />
          </div>
       
        <div className="price-input-group">
            <input
              type="number"
              className="price-input"
              placeholder="Minimum Price"
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value.replace(/[^0-9]/g, '').replace(/^0+/, '')))}
            />
            <input
              type="number"
              className="price-input"
              placeholder="Maximum Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value.replace(/[^0-9]/g, '').replace(/^0+/, '')))}
            />
          </div>
          <div className="category-select-group">
      <label>Post Type:</label>
      <select
  className="category-select"
  onChange={handleCategoryChange}
>
  {category === undefined && (
    <option value="" disabled hidden>
      Select a Type
    </option>
  )}
  <option value="all">All</option>
  <option value="lostAndFound">Lost and Found</option>
  <option value="secondHand">Second Hand</option>
  <option value="privateLesson">Private Lesson</option>
  <option value="trade">Trade</option>
  <option value="borrow">Borrow</option>
</select>

    </div>
    <CategorySelect data={data} onCategoryChange={handleItemCategoryChange} />
        </div>
        
      )}
      <div className='generic-btn-container'><button className="generic-btn" onClick={handleFilterChange}>Filter</button></div>
      
    </div>
  );
  
};

export default CategoryFilter;