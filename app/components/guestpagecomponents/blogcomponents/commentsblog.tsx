// app/components/CommentsSection.tsx
import React from 'react';

type Comment = {
    id: string;
    author: string;
    content: string;
};

type CommentsSectionProps = {
    comments: Comment[];
};

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
    return (
        <div className="px-10 py-5">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {comments.map((comment) => (
                <div key={comment.id} className="mb-4 border-b pb-2">
                    <h3 className="text-xl font-bold">{comment.author}</h3>
                    <p>{comment.content}</p>
                </div>
            ))}
            <form className="mt-4">
                <label className="block text-sm mb-2" htmlFor="comment">
                    Leave a Comment
                </label>
                <textarea
                    id="comment"
                    name="comment"
                    className="form-textarea w-full"
                    placeholder="Share your thoughts..."
                    rows={3}
                />
                <button type="submit" className="mt-2 btn-primary">
                    Submit Comment
                </button>
            </form>
        </div>
    );
};

export default CommentsSection;
