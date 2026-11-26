import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    return response.json()
}

function QueryExample() {
    const { data: post, isLoading, error } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts })


    return (
        <div className="section">
            <h1>Query Example</h1>
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

export default QueryExample