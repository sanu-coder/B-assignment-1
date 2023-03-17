const express = require('express');
const { create, findPosts, findPostById, delete_, update } = require('../controllers/postController');
const { auth } = require('../utils/authFunctions');
const router = express.Router();

router.post('/posts',auth, async(req,res)=>{
    req.body['created_at'] = new Date(new Date());
    req.body['likes'] = 0;
    req.body['comments'] = [];
    console.log(req.body);
    try{
        let instance = await create(req.body);
        res.send({
            result : "success",
            data : instance
        });
    }catch(e){
        console.log(e);
    }
})

router.get('/all_posts',auth, async(req,res)=>{
    try{
        let instances = await findPosts();
        res.send({
            result : "success",
            data : instances
        });
    }catch(e){
        console.log(e);
    }
})
router.put('/like/:id', auth, async(req,res)=>{
    let {id} = req.params;
    try{
        let instance = await findPostById({_id : id});
        if(instance.likes==NaN){
            instance.likes = 0;
        }
        let k  = await update(id, {likes : instance.likes +1 });  
        res.send({
            result : "success"
        })
    }catch(e){

    }
})

router.put('/unlike/:id', auth, async(req,res)=>{
    let {id} = req.params;
    try{
        let instance = await findPostById({_id : id});
        if(instance.likes>0){
            let k  = await update(id, {likes : instance.likes - 1 }); 
            res.send({
                result : "success"
            })
        }
    }catch(e){

    }
})

router.put('/comment/:id', auth, async(req,res) => {
    let {id} = req.params;
    try{
        let instance = await findPostById({_id : id});
        let {comments} = instance;
        let comment = {
            id : Date.now(),
            comment : req.body.comments
        }
        comments.push(comment);
        let k  = await update(id, {comments}); 
        res.send({
            result : "success",
            id : comment.id
        })
    }catch(e){

    }
})
router.get('/posts/:id',auth, async(req,res)=>{
    let {id} = req.params
    try{
        let instance = await findPostById({_id : id});
        res.send({
            result : "success",
            data : instance
        });
    }catch(e){
        console.log(e);
    }
})
router.delete('/posts/:id',auth, async(req,res) => {
    let {id} = req.params
    res.send({
        result : "success"
    });
    try{
        let instance = await delete_({_id : id});
    }catch(e){
        console.log(e);
    }
})
module.exports = router;
