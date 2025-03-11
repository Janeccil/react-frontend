import { useEffect, useState } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

function PostsList({ isPosting, onStopPosting }) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editingPost, setEditingPost] = useState(null);

	// Fetch posts from backend
	useEffect(() => {
		async function fetchPosts() {
			setLoading(true);
			const response = await fetch('http://localhost:8080/posts');
			const resData = await response.json();
			setPosts(resData.posts);
			setLoading(false);
		}

		fetchPosts();
	}, []);

	// Add or Update Post
	async function addOrUpdatePostHandler(postData) {
		setLoading(true);

		if (postData.id) {
			// Update existing post
			await fetch(`http://localhost:8080/posts/${postData.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(postData),
			});

			setPosts((prevPosts) =>
				prevPosts.map((post) => (post.id === postData.id ? postData : post))
			);
		} else {
			// Create new post
			const response = await fetch('http://localhost:8080/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(postData),
			});
			const resData = await response.json();
			setPosts((prevPosts) => [resData.post, ...prevPosts]);
		}

		setLoading(false);
		setEditingPost(null);
		onStopPosting();
	}

	// Delete Post
	async function deletePostHandler(postId) {
		setLoading(true);
		await fetch(`http://localhost:8080/posts/${postId}`, {
			method: 'DELETE',
		});
		setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
		setLoading(false);
	}

	// Edit Post
	function editPostHandler(post) {
		setEditingPost(post);
	}

	return (
		<>
			{(isPosting || editingPost) && (
				<Modal onCloseModal={() => { setEditingPost(null); onStopPosting(); }}>
					<NewPost
						onCancel={() => { setEditingPost(null); onStopPosting(); }}
						onAddPost={addOrUpdatePostHandler}
						existingPost={editingPost}
					/>
				</Modal>
			)}

			{loading && <LoadingSpinner />}

			{!loading && posts.length > 0 && (
				<ul className='posts'>
					{posts.map((post) => (
						<Post
							key={post.id}
							id={post.id}
							author={post.author}
							body={post.body}
							onDelete={deletePostHandler}
							onEdit={() => editPostHandler(post)}
						/>
					))}
				</ul>
			)}

			{!loading && posts.length === 0 && (
				<div style={{ textAlign: 'center', color: 'white' }}>
					<h2>There is no post yet.</h2>
					<p>Try to add some!</p>
				</div>
			)}
		</>
	);
}

export default PostsList;
