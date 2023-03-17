const express = require('express');
const { create, findUser, update, findUserById } = require('../controllers/userControllers');
const { passwordEncryption, createToken, verifyToken, isAuthenticated, auth } = require('../utils/authFunctions');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send({
        result:"success",
    })
})
router.post('/signup', async(req,res)=>{
    console.log(req.body);  
    const hashedPassword = await passwordEncryption(req.body.password);
   
    req.body.password = hashedPassword;
    req.body['followers'] = 0;
    req.body['following'] = 0;
    
    try{
        const entry = await create(req.body);

        if(entry==1){
            res.status(200).send({
                result : "failure",
                message : "Email exists"
            })
        }
        else{
            entry.password = "";
            const token =await createToken(entry);
            req['__user'] = entry;
            
            res.cookie("jwt", token, {
                expires : new Date(Date.now() + (60*60*10000*24*2)),
                httpOnly : true,
            })

            res.status(200).send({
                result : "success",
                token : JSON.stringify(token)
            })
        }
        
    }
    catch(err){
        console.log(err);
    } 
})

router.post('/authenticate', async(req,res)=>{
    console.log(req.body);  
    const entry = await findUser(req.body);
    console.log(entry);
    if(entry==1){
        res.send({
            result:"failure",
            message : "Email not exists"
        })
    }
    else{
        entry.password = "";
        const token =await createToken(entry); 
        req['__user'] = entry;

        res.cookie("jwt", token, {
            expires : new Date(Date.now() + (60*60*10000*24*2)),
            httpOnly : true,
        })
        res.send({
            result:"success",
            token : token
        }) 
    }
})

router.get('/user',auth,  async(req,res)=>{
    let user = isAuthenticated(req);
    console.log(user);
    console.log(Date.now())
    if(user){

        console.log("User authorized");
        console.log(user);
        res.send({
            result : "success",
            data : user
        })
    }else{
        console.log("Not authorized");
    }

})
router.put('/follow/:id', auth, async(req,res)=>{
    const {id} = req.params;
    console.log(id);

    try{
        let user = isAuthenticated(req);
        console.log(user);
        if(user){
            let currentUserId = user._id;
            if(user.following === NaN){
                user.following = 0;
            }
        

            let currentUser = await update(currentUserId, { following : user.following + 1 });
            currentUser = await findUserById({_id : currentUserId})
            const token =await createToken(currentUser); 
            res.cookie("jwt", token, {
                expires : new Date(Date.now() + (60*60*10000*24*2)),
                httpOnly : true,
            })


            let userToBeFollowed = await findUserById({_id : id});
            if(userToBeFollowed.followers === NaN){
                userToBeFollowed.followers = 0;
            }
            userToBeFollowed = await update(userToBeFollowed._id, { followers : userToBeFollowed.followers + 1 });

            res.status(200).send({
                result : "success"
            })
        }
    }
    catch(e){
        console.log(e);
    }

})

router.put('/unfollow/:id', auth, async(req,res)=>{
    const {id} = req.params;
    console.log(id);

    try{
        let user = isAuthenticated(req);
        console.log(user);
        if(user){
            let currentUserId = user._id;
            if(user.following === NaN){
                user.following = 0;
            }
        
            if(user.following>0){
                let currentUser = await update(currentUserId, { following : user.following - 1 });
                currentUser = await findUserById({_id : currentUserId})
                const token =await createToken(currentUser); 
                res.cookie("jwt", token, {
                    expires : new Date(Date.now() + (60*60*10000*24*2)),
                    httpOnly : true,
                })
            }
            

    
            let userToBeFollowed = await findUserById({_id : id});
            if(userToBeFollowed.followers === NaN){
                userToBeFollowed.followers = 0;
            }

            if(userToBeFollowed.followers>0){
                userToBeFollowed = await update(userToBeFollowed._id, { followers : userToBeFollowed.followers - 1 });

                res.status(200).send({
                    result : "success"
                })
            }
            
        }
    }
    catch(e){
        console.log(e);
    }

})
module.exports = router;
