export function uploadComments(comments) {
    const commentsHtml = comments.map((comment, index) => {
        const isLike = () => {
            if (comment.isLiked === true) {return `-active-like`;}
          };
        return `<li class="comment" data-index=${index}>
        <div class="comment-header">  
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body comment-text">
        ${comment.text}
        </div>
        <div class="comment-footer likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${isLike()}" data-index=${index}></button>
        </div>
      </li>`;
    }).join("");
    return commentsHtml;
}