import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded: {
    author: [{ name: string }];
    'wp:featuredmedia'?: [{ source_url: string }];
  };
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://wordpress.ernestoballon.com/wp-json/wp/v2/posts?_embed');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="space-y-12">
      {posts.map((post) => (
        <article key={post.id} className="bg-white shadow-sm border border-gray-200 overflow-hidden">
          {post._embedded['wp:featuredmedia'] && (
            <img
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post.title.rendered}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 font-serif">
              <Link to={`/post/${post.id}`} className="text-blue-600 hover:underline">
                {post.title.rendered}
              </Link>
            </h2>
            <div className="text-sm text-gray-600 mb-4 flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <User size={16} className="mr-1" />
                {post._embedded.author[0].name}
              </span>
            </div>
            <div
              className="text-gray-700 mb-4 prose"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <Link
              to={`/post/${post.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Continue reading
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogList;