import React, { useState } from "react";
import "./Homepage.css";
import Navbar from "./navigation/Navbar";
import Settings from "./settingsComponent/Settings";
import Notifications from "./notificationComponent/Notifications";
import Profile from "./profilecomponent/Profile";
import CreatePost from "./createPostComponent/CreatePost";
import CategoryFilter from "./categoryFilterCompononet/CategoryFilter";
import SearchComponent from "./SearchComponent/SearchComponent";
import Chat from "./ChatComponent/Chat";


const sampleProfileData = {
  followingsNumber: 150,
  followersNumber: 320,
  postNumber: 48,
  likeNumber: 789,
  description: 'Just a tech enthusiast and avid coder. Sharing my thoughts and projects.',
  userID: 'user123',
  nickname: 'coderJoe',
  profileImage: 'path_to_profile_image.jpg' // Replace with actual path to an image
};
const Homepage: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false); // State for CreatePost visibility
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showSearchComponent, setShowSearchComponent] = useState(false);
  const [showChatComponent, setShowChatComponent] = useState(false);

  const handleChatClick = () => {
    setShowChatComponent(prev => !prev); // Toggle the CreatePost visibility
    // Optionally close other components
    setShowCategoryFilter(false);
    setShowCreatePost(false);
    setShowNotifications(false);
    setShowProfile(false);
    setShowSearchComponent(false);
    setShowSettings(false);
    setShowNotifications(false);
    
    
  };

  const handleSettingsClick = () => {
    setShowSettings(prev => !prev); // Toggle the CreatePost visibility
    // Optionally close other components

    setShowNotifications(false);
    
  };
  const handleSearchClick = () => {
    setShowSearchComponent(prev => !prev); // Toggle the SearchComponent visibility
    // Optionally close other components
    // setShowSettings(false);
    // setShowNotifications(false);
    // setShowProfile(false);
    setShowCreatePost(false);
    setShowCategoryFilter(false);
  };

  const handleCategoryFilterClick = () => {
    setShowCategoryFilter(prev => !prev);
    setShowProfile(false);
     setShowCreatePost(false);
     setShowSearchComponent(false);
  };
  const handleNotificationsClick = () => {
    setShowNotifications(prev => !prev);
    setShowSettings(false);
  };
  const handleProfileClick = () => {
    setShowProfile(prev => !prev);
    // Optionally close the other components
    setShowSettings(false);
    setShowNotifications(false);
    setShowCreatePost(false);
    setShowCategoryFilter(false);
  };
  const handleCreatePostClick = () => {
    setShowCreatePost(prev => !prev);
    setShowProfile(false);
    setShowSettings(false);
    setShowNotifications(false);
    setShowCategoryFilter(false);
    setShowSearchComponent(false);
  };

  return (
    <div className='app'>
      <div className='background'></div>
      <Navbar onSettingsClick={handleSettingsClick}
      onNotificationsClick={handleNotificationsClick} onProfileClick= {handleProfileClick} onCreatePostClick={handleCreatePostClick} onCategoryFilterClick={handleCategoryFilterClick}
      onSearchClick={handleSearchClick} onChatClick={handleChatClick}
        />
     
       
      <div className="homepage">
        <div className="app__homepage">
          <div className="homepage__timeline">
            <div className="timeline__left">
            {showSettings && <Settings onClose={() => setShowSettings(false)} />}
            {showNotifications && (
                <Notifications 
                  onClose={() => setShowNotifications(false)} 
                  notifications={[  { id: 1, time: '9:01 am', userName: 'Ahmet', text: 'followed you.', isSeen: false },
                  { id: 2, time: '9:03 am', userName: 'Ayşe', text: 'liked your post.', isSeen: true },
                  { id: 3, time: '9:07 am', userName: 'Mehmet', text: 'commented: Great work!', isSeen: false },]}
                />
              )}
            </div>
            <div className="timeline__middle">
            {showProfile && <Profile item={sampleProfileData} />}
           {showCreatePost && <CreatePost onClose={handleCreatePostClick} />}
           {showChatComponent && <Chat onClose={handleChatClick} />}
            </div>
            <div className="timeline__right">
          {showCategoryFilter && <CategoryFilter onClose={() => setShowCategoryFilter(false)} />}
          {showSearchComponent && <SearchComponent onClose={() => setShowSearchComponent(false)} />}
</div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Homepage;