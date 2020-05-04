const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const checkAuth=require('../middleware/checkAuth');
const User=require('../model/user-model');

router.get('/',(req,res,next)=>{
    res.send("Get requests from user");
});

router.post('/signup',(req,res,next)=>{
User.find({email:req.body.email})
.exec()
.then(user=>{
    if(user.length>=1){
       return res.status(409).json({
            message:'Invalid email'
        });
    }
    else{
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                });
            }
            else{
                const user=new User({
                    _id:mongoose.Types.ObjectId(),
                    email:req.body.email,
                    password:hash
                });
                user.save()
                .then(result=>{
            console.log(result);
            res.status(201).json({
                message:'User created',
                userDetails:{
                    _id:result._id,
                    email:result.email
                }

            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

                }
            });

    }
})
});

router.post('/login',(req,res,next)=>{
User.find({email:req.body.email})
.exec()
.then(user=>{
    if(user.length<1){
       return res.status(401).json({
            message:'Seems like an invalid email'
        })
    }
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
        if(err){
           return res.status(401).json({
                message:'Auth failed'
            })
        }
        if(result){
            const token=jwt.sign(
                {
                    email:user[0].email,
                    _id:user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn:'1hr'
                }
            );
            return res.status(200).json({
                message:'Auth success',
                token:token

            })
        }
        res.status(401).json({
            message:'Incorrect password',
        })
    })
})
.catch();
})


router.delete('/:userId',(req,res,next)=>{
    User.remove({_id:req.params.userId})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'User deleted'

        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
})

router.get('/events',(req,res,next)=>{
    let events=[
        {
            "id":"1",
            "name":"IT workshop",
            "description":"lorem ipsum"
        },
        {
            "id":"2",
            "name":"Science workshop",
            "description":"lorem ipsum"
        },
        {
            "id":"3",
            "name":"Electrical workshop",
            "description":"lorem ipsum"
        },
        {
            "id":"4",
            "name":"Physics workshop",
            "description":"lorem ipsum"
        },
        {
            "id":"5",
            "name":"Maths Quiz and workshop",
            "description":"lorem ipsum"
        },
        {
            "id":"6",
            "name":"Biological Workshop",
            "description":"lorem ipsum"
        }
    ];
    res.json(events);
});

router.get('/special',checkAuth,(req,res,next)=>{
    let events=[
        {
            "id":"1",
            "name":"Resume guide workshop",
            "description":"lorem ipsum"
        },
        {
                "id":"2",
                "name":"Meanstack workshop",
                "description":"lorem ipsum"
        },
        {
                "id":"3",
                "name":"Beginners Guide to Front End",
                "description":"lorem ipsum"
        },
        {
            "id":"4",
            "name":"Beginners Guide to Back End",
            "description":"lorem ipsum"
        },
        {
            "id":"5",
            "name":"Power BI Tools Workshop",
            "description":"lorem ipsum"
        },
        {
            "id":"6",
            "name":"Data Science",
            "description":"lorem ipsum"
        }

    ];
    res.json(events);
});




module.exports=router;