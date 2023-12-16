import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot';
import Post from "./postcomponent/Post"
import Posts from './pages/Posts';
import Profile from './profilecomponent/Profile';
import CreatePost from './createPostComponent/CreatePost';
import Settings from './settingsComponent/Settings';
import { imageLink } from './logic/backend';
import Notifications from './notificationComponent/Notifications';
import Comments from "./comment/Comments"
import SocialMediaPost from './postcomponent/SocialMediaPost';
import SocialMediaPosts, { SocialMediaPostsProps } from './postcomponent/SocialMediaPosts';
import SalePost from './postcomponent/SalePost';
import { SalePostProps } from './postcomponent/SalePost';
import SalePosts, { SalePostsProps } from './postcomponent/SalePosts';
import { Provider } from 'react-redux';
import store from './store'; 
const exampleSalePostsProps: SalePostsProps = {
  initialPosts: [
    {
      item: {
        postID: "post1",
        author: {
          userID: "1234",
          userName: "John Doe",
          userProfileLink: "https://example.com/profile/user1"
        },
        imagesID: ["image1", "image2"],
        contentText: "This is the first post content",
        postTime: new Date("2023-12-16T12:00:00Z"),
        isAnonymous: false,
        initialComments: [
          {
            item: {
              commentId: "comment1",
              postId: "post1",
              author: {
                userID: "user2",
                userName: "Jane Doe",
                userProfileLink: "https://example.com/profile/user2"
              },
              contentText: "Great post!",
              commentTime: new Date("2023-12-16T12:30:00Z")
            },
            showDelete: false,
            onDelete: () => {
              console.log("Comment deleted");
            }
          },
          // ... more comments
        ],
        postType: 5,
        price: "13"
      }
    },
    {
      item: {
        postID: "post1",
        author: {
          userID: "1234",
          userName: "John Doe",
          userProfileLink: "https://example.com/profile/user1"
        },
        imagesID: ["image1", "image2"],
        contentText: "This is the first post content",
        postTime: new Date("2023-12-16T12:00:00Z"),
        isAnonymous: false,
        initialComments: [
          {
            item: {
              commentId: "comment1",
              postId: "post1",
              author: {
                userID: "user2",
                userName: "Jane Doe",
                userProfileLink: "https://example.com/profile/user2"
              },
              contentText: "Great post!",
              commentTime: new Date("2023-12-16T12:30:00Z")
            },
            showDelete: false,
            onDelete: () => {
              console.log("Comment deleted");
            }
          },
          // ... more comments
        ],
        postType: 5,
        price: "13"
      }
    },
    // ... more social media posts
  ]
};



const exampleSocialMediaPostsProps: SocialMediaPostsProps = {
  initialPosts: [
    {
      item: {
        postID: "post1",
        author: {
          userID: "1234",
          userName: "John Doe",
          userProfileLink: "https://example.com/profile/user1"
        },
        imagesID: ["image1", "image2"],
        contentText: "This is the first post content",
        postTime: new Date("2023-12-16T12:00:00Z"),
        isLiked: true,
        isAnonymous: false,
        likecount: 150,
        initialComments: [
          {
            item: {
              commentId: "comment1",
              postId: "post1",
              author: {
                userID: "user2",
                userName: "Jane Doe",
                userProfileLink: "https://example.com/profile/user2"
              },
              contentText: "Great post!",
              commentTime: new Date("2023-12-16T12:30:00Z")
            },
            showDelete: false,
            onDelete: () => {
              console.log("Comment deleted");
            }
          },
          // ... more comments
        ]
      }
    },
    {
      item: {
        postID: "post1",
        author: {
          userID: "1234",
          userName: "John Doe",
          userProfileLink: "https://example.com/profile/user1"
        },
        imagesID: ["image1", "image2"],
        contentText: "This is the first post content",
        postTime: new Date("2023-12-16T12:00:00Z"),
        isLiked: true,
        isAnonymous: false,
        likecount: 150,
        initialComments: [
          {
            item: {
              commentId: "comment1",
              postId: "post1",
              author: {
                userID: "user2",
                userName: "Jane Doe",
                userProfileLink: "https://example.com/profile/user2"
              },
              contentText: "Great post!",
              commentTime: new Date("2023-12-16T12:30:00Z")
            },
            showDelete: false,
            onDelete: () => {
              console.log("Comment deleted");
            }
          },
          // ... more comments
        ]
      }
    },
    // ... more social media posts
  ]
};

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
      <Route path="/socialmediaposts" element={<SocialMediaPosts initialPosts={exampleSocialMediaPostsProps.initialPosts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/posts" element={<Posts></Posts>} />
        <Route path="/post" element={<Post/>} /> {/* Updated this line */}
        <Route path="/create-post" element={<CreatePost/>} /> {/* Updated this line */}
        <Route path="/settings" element={<Settings/>} /> {/* Updated this line */}
        <Route path="/notifications" element={<Notifications notifications={[  { id: 1, time: '9:01 am', userName: 'Ahmet', text: 'followed you.', isSeen: false },
    { id: 2, time: '9:03 am', userName: 'Ayşe', text: 'liked your post.', isSeen: true },
    { id: 3, time: '9:07 am', userName: 'Mehmet', text: 'commented: Great work!', isSeen: false },]}/>} /> {/* Updated this line */}
        <Route path='/profile' element={<Profile />}/>
        <Route path='/saleposts' element={<SalePosts initialPosts ={exampleSalePostsProps.initialPosts}/>}/>
        <Route path='/comments' element={<Comments postID={"7f3e30a5-cc09-4501-82e0-feb7136e22bb"}/>}/>
        
      
      

      </Routes>
    </Router>
    </Provider>
  );
};

export default App;
