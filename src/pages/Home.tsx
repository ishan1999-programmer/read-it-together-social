
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import BookPost from '@/components/BookPost';

// Mock data for feed posts
const mockPosts = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      username: 'bookworm_sarah',
      avatar: null
    },
    book: {
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      genre: 'Fiction',
      cover: null,
      rating: 5,
      status: 'Read'
    },
    review: 'Absolutely captivating! This book had me hooked from the very first page. The storytelling is masterful and the characters feel so real. Evelyn Hugo is a force to be reckoned with.',
    likes: 24,
    comments: 8,
    timestamp: '2 hours ago',
    isLiked: false
  },
  {
    id: 2,
    user: {
      name: 'Mike Chen',
      username: 'mike_reads',
      avatar: null
    },
    book: {
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-Help',
      cover: null,
      rating: 4,
      status: 'Currently Reading'
    },
    review: 'Great insights on building good habits and breaking bad ones. The 1% better every day concept is really powerful. Highly recommend for anyone looking to improve themselves.',
    likes: 18,
    comments: 5,
    timestamp: '5 hours ago',
    isLiked: true
  },
  {
    id: 3,
    user: {
      name: 'Emma Wilson',
      username: 'fantasy_emma',
      avatar: null
    },
    book: {
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      genre: 'Fantasy',
      cover: null,
      rating: 5,
      status: 'Read'
    },
    review: 'Beautiful prose and world-building. Kvothe is such a compelling character. Cannot wait to read the next book in the series. The magic system is incredibly well thought out.',
    likes: 31,
    comments: 12,
    timestamp: '1 day ago',
    isLiked: false
  }
];

const Home = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="py-6">
          <h1 className="text-2xl font-bold text-black mb-6">Your Feed</h1>
          
          {posts.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">
                Your feed will appear here once you start following other readers and they begin sharing their books.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map(post => (
                <BookPost 
                  key={post.id} 
                  post={post} 
                  onLike={handleLike}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
