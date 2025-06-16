const cloudinary=require('../config/cloudinary');



const uploadFile=async(filePath)=>{
    try{
        const result=await cloudinary.uploader.upload(filePath);
        return{
            url:result.secure_url,
            publicId:result.public_id
        }
    }catch(err){
       console.log("error while uploading file to cloudinary");
       throw new Error(err.message);
    }
}

// const uploadFile=async(req,res)=>{
//     try{
//         if(req.file){
//             const result=await cloudinary.uploader.upload(req.file.path);
//             res.status(200).json({
//                 message:"File uploaded successfully",
//                 result
//             });
//         }else{
//             res.status(400).json({
//                 message:"Please upload a file"
//             });
//         }
//     }catch(err){
//         res.status(500).json({
//             message:err.message
//         });
//     }
// }


module.exports=uploadFile;

