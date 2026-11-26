import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'


function PostList() {
    const { data: post, isLoading, error } = useQuery({
        queryKey: ['posts'], queryFn: async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
            return response.json()
        },
        staleTime: 1000 * 60,
        gcTime: 1000 * 5,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {post && post.map((p: any) => (
                <div key={p.id}>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                </div>
            ))}
        </div>
    )
}


function CachingExample() {
    const [showPosts, setShowPosts] = useState(false);
    return (
        <div className='section'>
            <h2>Caching Example</h2>
            <p>Click the button below to show the posts. The posts will be cached, so if you hide and show them again, they will load instantly without making another network request.</p>
            <button onClick={() => setShowPosts(!showPosts)}>
                {showPosts ? 'Hide' : 'Show'} Posts
            </button>
            {showPosts && <PostList />}
        </div>
    )
}

export default CachingExample