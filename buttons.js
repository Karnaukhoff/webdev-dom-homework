export function checkText(nameCommentUser, textComment) {
    nameCommentUser.classList.remove('error');
      textComment.classList.remove(".error");
      if (nameCommentUser.value === "" || textComment.value === "") {
        if (nameCommentUser.value === "") {
          nameCommentUser.classList.add('error');
        }
        if (textComment.value === "") {
          textComment.classList.add('error');
        }
        return;
      }
}
export function likeStatus(likeButton, comments) {
        const index = likeButton.dataset.index;
        if (comments[index].isLiked === false) {
            comments[index].likes += 1;
            comments[index].isLiked = true;
            console.log("works if");
        } else {
            comments[index].likes -= 1;
            comments[index].isLiked = false;
            console.log("works else");
        }
};
export function getComment(answerComment, comments) {
    const index = answerComment.dataset.index;
    textComment.value = `>${comments[index].text}
    ${comments[index].name}, `;
    console.log(comments[index].text);
}