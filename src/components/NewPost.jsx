import { useState, useEffect } from 'react';

function NewPost({ onCancel, onAddPost, existingPost }) {
	const [enteredBodyText, setEnteredBodyText] = useState('');
	const [enteredAuthorText, setEnteredAuthorText] = useState('');

	// Prefill the form when editing
	useEffect(() => {
		if (existingPost) {
			setEnteredBodyText(existingPost.body);
			setEnteredAuthorText(existingPost.author);
		}
	}, [existingPost]);

	function bodyChangeHandler(event) {
		setEnteredBodyText(event.target.value);
	}

	function authorChangeHandler(event) {
		setEnteredAuthorText(event.target.value);
	}

	function submitHandler(event) {
		event.preventDefault();

		const postData = {
			id: existingPost ? existingPost.id : undefined, // Keep ID if editing
			body: enteredBodyText,
			author: enteredAuthorText,
		};

		onAddPost(postData); // Triggers create or update logic
		onCancel();
	}

	return (
		<form className='form' onSubmit={submitHandler}>
			<p>
				<label htmlFor='body'>Text</label>
				<textarea
					id='body'
					required
					rows={3}
					value={enteredBodyText}
					onChange={bodyChangeHandler}
				/>
			</p>
			<p>
				<label htmlFor='name'>Your name</label>
				<input
					type='text'
					id='name'
					required
					value={enteredAuthorText}
					onChange={authorChangeHandler}
				/>
			</p>
			<p className='actions'>
				<button type='button' onClick={onCancel}>
					Cancel
				</button>
				<button type='submit'>
					{existingPost ? 'Update' : 'Submit'}
				</button>
			</p>
		</form>
	);
}

export default NewPost;
