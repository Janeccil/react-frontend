function Post({ id, author, body, onDelete, onEdit }) {
	return (
		<li className='post'>
			<p className='author'>{author}</p>
			<p className='text'>{body}</p>
			<div className="actions">
				<button 
					onClick={() => onEdit(id)} 
					style={{
						padding: '8px 16px',
						marginRight: '10px',
						fontSize: '14px',
						cursor: 'pointer'
					}}>
					Edit
				</button>
				<button 
					onClick={() => onDelete(id)} 
					style={{
						padding: '8px 16px',
						fontSize: '14px',
						backgroundColor: 'red',
						color: 'white',
						border: 'none',
						cursor: 'pointer'
					}}>
					Delete
				</button>
			</div>
		</li>
	);
}

export default Post;
