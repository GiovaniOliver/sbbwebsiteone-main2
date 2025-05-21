import { useRouter } from 'next/router';

const BlogPost: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;  // This will get the 'id' from the URL

    return (
        <div>
            <h1>Blog Post {id}</h1>
            <p>This is blog post number {id}.</p>
        </div>
    );
};

export default BlogPost;
