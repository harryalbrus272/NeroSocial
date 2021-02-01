{
    console.log('Hello!');
    //method to submit the form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(), // convert to json
                success: function(data){
                    let newPost = newPostDom(data);
                    $('#post-list-container>ul').prepend(newPost);
                    console.log(data);
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
            $('#post-textview').val('');
        });
    }
    
//method to create post in DOM
    let newPostDom = function(data) {
        return $(`<li id="post-${data.data.post._id}">
            <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${data.data.post._id}">Delete</a>
                </small>
                ${ data.data.post.content }
                <br>
                <small>
                ${ data.name } 
                </small>
            </p>
            <div class = "post-comments">
                
                    <form action="/comments/create" method="POST">
                    <input type="text" name="content" id="" placeholder="Type here the comments...">
                    <input type="hidden" name="post" id="" value="${ data.data.post._id }" >
                    <input type="submit" value="Add comment">
                    </form>

                <div class="post-comments-list">
                    <ul id="post-comments-${ data.data.post._id }"     
                    </ul>
                </div> 
            </div> 
        </li>`)        
    }

    createPost();
}
