
import React from 'react';
import Layout from '@/components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Your Feed
          </h1>
          <p className="text-gray-600 mb-8">
            Discover what your friends are reading and share your own literary adventures!
          </p>
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <p className="text-gray-500">
              Your feed will appear here once you start following other readers and they begin sharing their books.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
