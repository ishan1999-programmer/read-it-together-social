
import React from 'react';
import Layout from '@/components/Layout';

const Feeds = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Feeds</h1>
          <p className="text-muted-foreground">Discover what your friends are reading</p>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            Stay tuned for updates from your reading community!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Feeds;
