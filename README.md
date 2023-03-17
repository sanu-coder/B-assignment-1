# B-assignment-1
For backend there are two dummy-ids

ID-1 
{
    "email" : "sanu@30122000@gmail.com",
    "password" : "12345678"
}

ID-2
{
    "email" : "adi@30122000@gmail.com",
    "password" : "12345678"
}


List of deployed apis 

1. POST request - user authentication and return a JWT token. Link("https://b-assignment.onrender.com/api/authenticate")
2. PUT request - /api/follow/{id} authenticated user would follow user with {id}. Link("https://b-assignment.onrender.com/api/follow/64143674a0c601c47a3811d2")
3. PUT request - /api/unfollow/{id} authenticated user would unfollow a user with {id}. Link("https://b-assignment.onrender.com/api/unfollow/64143674a0c601c47a3811d2")
4. GET /api/user should authenticate the request and return the respective user profile. Link("https://b-assignment.onrender.com/api/user")
5. POST api/posts/ would add a new post created by the authenticated user. Link("https://b-assignment.onrender.com/api/posts")
    
    ![image](https://user-images.githubusercontent.com/72346984/225923983-2b5cedb6-2582-4df1-8124-1b4eb02914c8.png)
    
6. DELETE api/posts/{id} would delete post with {id} created by the authenticated user. Link("https://b-assignment.onrender.com/api/posts/641470304c2c54fe57d0f339")
7. PUT /api/like/{id} would like the post with {id} by the authenticated user. Link("https://b-assignment.onrender.com/api/like/6414516a84f5f426c0bda3c4")
    
    ![image](https://user-images.githubusercontent.com/72346984/225924937-53fd1901-1f6c-445d-9ef1-b20047a5fc2d.png)
    
8. PUT /api/unlike/{id} would unlike the post with {id} by the authenticated user. Link("https://b-assignment.onrender.com/api/unlike/6414516a84f5f426c0bda3c4")
   
   ![image](https://user-images.githubusercontent.com/72346984/225925676-35ff8f75-d27d-49e5-a2b3-ad9705c08942.png)

10. PUT request /api/comment/{id} add comment for post with {id} by the authenticated user. 
     Link("https://b-assignment.onrender.com/api/comment/6414516a84f5f426c0bda3c4")

  ![image](https://user-images.githubusercontent.com/72346984/225926164-654e8752-be91-45f0-943b-bec54c7f993d.png)

11. GET api/posts/{id} would return a single post with {id} populated with its number of likes and comments.
Link("http://b-assignment.onrender.com/api/posts/6414516a84f5f426c0bda3c4")
    
![image](https://user-images.githubusercontent.com/72346984/225927045-70a0f5a2-a5d5-418b-bb3f-4ea61e921a81.png)


12. GET /api/all_posts would return all posts created by authenticated user sorted by post time. Link("http://b-assignment.onrender.com/api/all_posts")

![image](https://user-images.githubusercontent.com/72346984/225927830-326e409d-580f-4de1-9db7-d161d1f8c2c2.png)

