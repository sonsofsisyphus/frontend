import React, { useState, useRef, useEffect } from 'react';
import './CreatePost.css';
import CategorySelect from '../assets/categoryComponent/CategorySelect';
import { AddSale, AddSocial, FetchCategories, UploadFile } from '../logic/backend';
import { categoryMap } from '../categoryFilterCompononet/CategoryFilter';
import { useNavigate } from "react-router-dom";


interface CreatePostProps {
  onClose: () => void;
}

interface postData {
  description: string;
  postType: 'socialMedia' | 'sale';
  type: number;
  price: number | '';
  itemCategory: number | undefined;
  isAnonymous: boolean; // Add this line
  images: string[]
}

export interface Category {
  categoryID: number;
  name: string;
  children: Category[];
}

const initcateData: Category[] = [
  {
    categoryID: 1,
    name: "string",
    children: [
      {
        categoryID: 2,
        name: "lesson",
        children: [
          {
            categoryID: 3,
            name: "cs",
            children: [
              { categoryID: 4, name: "cs223", children: [] },
              { categoryID: 5, name: "cs315", children: [] },
              { categoryID: 6, name: "cs319", children: [] }
            ]
          }
        ]
      }
    ]
  }
  // ... other categories
];

const CreatePost: React.FC<CreatePostProps> = ({ onClose}) => {
  const [description, setDescription] = useState<string>('');
  const [postType, setPostType] = useState<'socialMedia' | 'sale'>('socialMedia');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [price, setPrice] = useState<number | ''>(0);
  const [images, setImages] = useState<string[]>([]);
  const [imagesLink, setImagesLink] = useState<string[]>([]);
  const [imagePreviewIndex, setImagePreviewIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [itemCategory, setItemCategory] = useState<number | undefined>(undefined);
  const [categoryData, setCategoryData] = useState<Category[]>(initcateData);
  const [sendPost, setSendPost] = useState(false);
  const [submit, onSubmit] = useState<postData>({postType: 'sale', description: '', price: '', itemCategory : undefined, isAnonymous: false, images: [], type: 0});
  const [sending, setSending] = useState(false);
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [attemptedToPublish, setAttemptedToPublish] = useState(false);
  const navigate = useNavigate();
  const [errorDescText, setErrorDescText] = useState("");
  const [errorPrice, setErrorPrice] = useState("");

  const [anonWarn, setAnonWarn] = useState("");

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleDescErrorChange = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!event.target.value.trim()) {
        setErrorDescText("Please fill in the description.");
    } else {
        setErrorDescText("");
    }
};
const handleSetErrorPriceChange = () => {
  if (price === '') {
      setErrorPrice("Please determine the price.");
  } else {
      setErrorPrice("");
  }
};

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked) {
      setAnonWarn("WARNING: If you send an anonymous post, you will be unable to later delete it!");
    } else {
      setAnonWarn("");
    }
    setIsAnonymous(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setAttemptedToPublish(true); // Set the attemptedToPublish to true when submit is attempted
    if (postType === 'socialMedia') {
      if (!description.trim()) {
        setIsVisible(true); // Show error message if description is empty
        return; // Stop further execution
      }
    }
    if (postType === 'sale') {
      if (!description.trim() || price === '' || itemCategory === undefined) {
        setIsVisible(true); // Show error message if any field is empty
        return; // Stop further execution
      }
    }
    setIsVisible(false);
    console.log(images);
      // Proceed with submitting the form only if there's a description
      onSubmit({
        description,
        postType,
        price,
        itemCategory,
        isAnonymous,
        images: imagesLink,
        type: category ? category : 0,
      });
      setSendPost(true);
      setTimeout(() => {
        navigate('../../homepage');
      }, 1500);
  };
  useEffect(() => {
    if (postType === 'sale') {
      if (description.trim() || (price !== '' && price !== undefined) || (itemCategory && itemCategory !== undefined)) {
        setAttemptedToPublish(false);
      }
    } else if (postType === 'socialMedia') {
      if (description.trim()) {
        setAttemptedToPublish(false);
      }
    }
  }, [description, price, itemCategory, postType]);
  useEffect(() => {
    if (postType === 'sale') {
      setIsAnonymous(false);
    }
  }, [postType]);

  useEffect(() => {
    setAttemptedToPublish(false);
  }, [postType]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchCategories();
        setCategoryData(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
      
      }
    };
      fetchData();
      
  }, []); 

  useEffect(() => {
    const senddPost = async () => {
      try {
        console.log(submit);
        setSending(true);
        if(submit.postType === 'sale') {
          if(submit.itemCategory !== undefined && submit.price !== '') {
            await AddSale(submit.description, submit.images, submit.type, submit.itemCategory, submit.price);}
        } else if(submit.postType === 'socialMedia') {
          await AddSocial(submit.description, submit.isAnonymous, submit.images);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
       
      }
    };
    if(sendPost) {
      senddPost();
    }
    setSending(false);
  }, [sendPost]); 

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Update to use undefined instead of an empty string
    const value = event.target.value;
    setCategory(value ? categoryMap[value] : undefined);
  };

  const handleItemCategoryChange = (categoryId: number) => {
    setItemCategory(categoryId);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPrice(value === '' ? '' : Number(value));
  };
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      try {
        // Upload the last file in the array and get the image URL
        const latestFile = fileArray[fileArray.length - 1];
        const imageUrl = await UploadFile(latestFile);
  
        // Update the state with the uploaded image URL
        setImagesLink((prevImagesLink) => [...prevImagesLink, imageUrl]);
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error uploading file:", error);
      }
      setImages((prevImages) => {
        const spaceForNewImages = 100 - prevImages.length;
        const newImagesToAdd = fileArray.slice(0, spaceForNewImages).map((file) => URL.createObjectURL(file));
        return [...prevImages, ...newImagesToAdd];
      });
      event.target.value = ""; // Clear the file input
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagesLink((prevImages) => prevImages.filter((_, i) => i !== index));
    if (imagePreviewIndex >= index && imagePreviewIndex > 0) {
      setImagePreviewIndex(prevIndex => prevIndex - 1);
    }
  };


  const handleClose = () => {
    navigate(`../../homepage`);
    onClose(); 
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  if (!isVisible) return null;
  return (
<div className="create-post">
      <div className="modal-header">
        <h2 className="modal-title">Create a Post</h2>
        <button className="generic-close-button" onClick={handleClose}></button>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="post-type-buttons">
        <button 
          type="button" 
          onClick={() => setPostType('socialMedia')} 
          className={`post-type-button ${postType === 'socialMedia' ? 'active' : ''}`}
        >
          Social Media Post
        </button>
        <button 
          type="button" 
          onClick={() => setPostType('sale')} 
          className={`post-type-button ${postType === 'sale' ? 'active' : ''}`}
        >
          Sale Post
        </button>
      </div>
      
    
  


<label className="style-input">
<div className="character-count">{description.length}/256</div>
  <textarea
    className="style-input__field"
    id="description"
    placeholder=" "
    value={description}
    maxLength={256}
    onChange={handleDescriptionChange}
    onBlur={handleDescErrorChange}
  />
  <span className="style-input__label">Description</span>
</label>
<div className='error-message'>{errorDescText}</div>

{postType === 'socialMedia' && (
  <>
  <div className="checkbox-wrapper-5">
    Anonymous
    <div className="check">
      <input 
        id="anonymousCheckbox" 
        type="checkbox" 
        checked={isAnonymous} 
        onChange={handleCheckboxChange} 
      />
      <label htmlFor="anonymousCheckbox"></label>
    </div>
  </div>
  <div className='error-message'>{anonWarn}</div>
  </>
)}
        {postType === 'sale' && (
          <>
            <div className="form-group">
            <select
        className="category-select"
        onChange={handleCategoryChange}
      >
        <option value="">Select a Type</option>
        <option value="lostAndFound">Lost and Found</option>
        <option value="secondHand">Second Hand</option>
        <option value="privateLesson">Private Lesson</option>
        <option value="trade">Trade</option>
        <option value="borrow">Borrow</option>
      </select>
             
            </div>
            <label className="style-input">
            <input
  className="style-input__field"
  type="number"
  id="price"
  placeholder=" "
  value={price}
  onChange={handlePriceChange}
  onBlur={handleSetErrorPriceChange}
  min="0"
  step="1"
  defaultValue={0} // Set the initial value here
/>

  <span className="style-input__label">Price</span>
  <div className='error-message'>{errorPrice}</div>
</label>
             <CategorySelect data={categoryData} onCategoryChange={handleItemCategoryChange}/>
          </>
        )}

        <div className="image-upload-section">
          

          
          <input
            type="file"
            id="imageUpload"
            multiple
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*" // Accept only images
          />
        </div>

        {images.length > 0 && (
        <div className="image-preview-section">
          <img src={images[imagePreviewIndex]} alt={`Preview ${imagePreviewIndex + 1}`} />
          <div className="image-preview-info">
            <div className="image-counter">
              {`${imagePreviewIndex + 1}/${images.length}`}
            </div>
            <div className="image-preview-controls">
              <button type="button" onClick={() => handleDeleteImage(imagePreviewIndex)}>Delete</button>
              {images.length > 1 && (
                <>
                  <button type="button" onClick={() => setImagePreviewIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))}>
                    Previous
                  </button>
                  <button type="button" onClick={() => setImagePreviewIndex((prevIndex) => (prevIndex + 1) % images.length)}>
                    Next
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
         <div className="create-post-error-text-push-down">
    {attemptedToPublish && (
        postType === 'socialMedia' && !description.trim() && (
          <p className="no-input-warning">No input</p>
        )
      )}
      {attemptedToPublish && (
        postType === 'sale' && (!description.trim() || (price === '' || price === undefined) || itemCategory === undefined) && (
          <p className="no-input-warning">No Valid Sale Post</p>
        )
      )}
      </div>
      <div className="btn-container-create">
      <button className="button" onClick={triggerFileInput} type="button"> 
  <svg className="svgIcon" viewBox="0 0 384 512">
    <path
      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
    ></path>
  </svg>
</button>
<button className='generic-btn' type="submit" onClick={handleSubmit} disabled={sending}>
      Publish!
    </button>
 
</div>

  {/* ... */}
</form>
    </div>
  );
};

export default CreatePost;
