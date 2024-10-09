import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import styles from './BlogPost.module.css';

interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded: {
    author: [{ name: string }];
    'wp:featuredmedia'?: [{ source_url: string }];
  };
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://wordpress.ernestoballon.com/wp-json/wp/v2/posts/${id}?_embed`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center">Post not found</div>;
  }

  return (
    <article className={styles.blogPost}>
      {post._embedded['wp:featuredmedia'] && (
        <img
          src={post._embedded['wp:featuredmedia'][0].source_url}
          alt={post.title.rendered}
          className={styles.featuredImage}
        />
      )}
      <div className={styles.content}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={16} className={styles.metaIcon} />
          Back to Posts
        </Link>
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Calendar size={16} className={styles.metaIcon} />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className={styles.metaItem}>
            <User size={16} className={styles.metaIcon} />
            {post._embedded.author[0].name}
          </span>
        </div>
        <div className={styles.prose} dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    </article>
  );
};

export default BlogPost;