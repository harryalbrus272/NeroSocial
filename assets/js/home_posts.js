{
    console.log('Hello!');
    //method to submit the form data for new post using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(), // convert to json
                success: function (data) {
                    let newPost = newPostDom(data);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
            $('#post-textview').val('');
        });
    }

    //method to create post in DOM
    let newPostDom = function (data) {
        return $(`<li id="post-${data.data.post._id}">
            <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${data.data.post._id}">Delete</a>
                </small>
                ${data.data.post.content}
                <br>
                <small>
                ${data.name} 
                </small>
            </p>
            <div class = "post-comments">
                
                    <form action="/comments/create" method="POST">
                    <input type="text" name="content" id="" placeholder="Type here the comments...">
                    <input type="hidden" name="post" id="" value="${data.data.post._id}" >
                    <input type="submit" value="Add comment">
                    </form>

                <div class="post-comments-list">
                    <ul id="post-comments-${data.data.post._id}"     
                    </ul>
                </div> 
            </div> 
        </li>`)
    }

    //method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click((event) => {
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: (data) => {
                    $(`#post-${data.data.post_id}`).remove();
                    //Noty flash messages
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: (error) => {
                    console.log(error.responseText);
                }
            });
        });
    }

    let findPostId = function () {
        $('.post-comments').click((e) => {
            let postID = $(e.target).parent().attr('id').split('-')[1];
            if (postID != undefined)
                createComment(postID);
        });
    }

    let createComment = function (postID) {
        let newCommentForm = $(`#post-${postID}-comments-form`);
        newCommentForm.submit(function (event) {
            event.preventDefault();
            event.stopPropagation();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function (data) {
                    let newComment = newCommentDom(data);
                    $(`#post-comments-${data.data.post.post}`).prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
            $(`#comment-${postID}-textinput`).val('');

        });
    }

    let newCommentDom = function (data) {
        console.log(data);
        return $(`<li id="comment-${data.data.post._id}">
        <p>
            
            <small>
                <a class="delete-comment-button" href="/comments/destroy/${data.data.post._id}">Delete</a>
            </small>
             
            ${data.data.post.content}
            <br>
            <small>
                ${data.name} 
            </small>
        </p>
    </li>`);
    }
    //method to delete a comment from post
    let deleteComment = function (deleteLink) {
        $(deleteLink).click((event) => {
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: (data) => {
                    console.log(data);
                    $(`#comment-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: (error) => {
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();
    findPostId();
}
