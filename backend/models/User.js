const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter a name"]
    },
    avatar:{
        public_id:String,
        url:String
    },
    email:{
        type:String,
        required:[true,"please enter a email"],
        unique:[true,"email already exists"]
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        minlength:[5,"password must be 5 character"],
        select:false,
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    resetpasstoken:String,
    resetpassexpire:Date
});
userSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
});
userSchema.methods.matchPassword=async function (password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateToken= function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET);

};
userSchema.methods.getresetpasstoken=function(){
    const resettoken=crypto.randomBytes(20).toString("hex");
    this.resetpasstoken=crypto.createHash("sha256").update(resettoken).digest("hex");
    this.resetpassexpire=Date.now()+10*60*1000;
    return resettoken;
}
module.exports=mongoose.model("User",userSchema);