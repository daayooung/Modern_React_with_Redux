import React from 'react';

const CommentDetail = ({ author, timeAgo, content, avatar }) => {
  return (
    <>
      <div className="comment">
        <a href="/" className="avatar">
          <img alt="avatar" src={avatar} />
        </a>
      </div>
      <div className="content">
        <a href="/" className="author">
          {author}
        </a>
        <div className="metadata">
          <span className="data">{timeAgo}</span>
        </div>
        <div className="text">{content}</div>
      </div>
    </>
  );
};

export default CommentDetail;
