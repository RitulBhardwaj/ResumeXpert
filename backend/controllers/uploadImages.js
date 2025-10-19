import fs from "fs";
import path from "path"; 
import Resume from "../models/resumeModel.js";
 
import upload from "../middleware/uploadMiddleware.js";

export const uploadImages = (req, res) => {
    try{
        //configure multer to handle images
        upload.fields([ 
            { name: 'thumbnail' },
            { name: 'profileImages'}
        ])(req, res, async(err) => {
            if (err) {
                return res.status(400).json({ message: "file upload failed",error:err.message });
            }
            const resumeId=req.params.id;
            const resume=await Resume.findOne({
                _id:resumeId,
                userId:req.user._id
            });

            if(!resume){
                return res.status(404).json({ message: "Resume not found or not authorised" });
            }


            //Use process.cwd() to locate the uploads folder
            const uploadFolder=path.join(process.cwd(),'uploads');
            const baseUrl=`${req.protocol}://${req.get('host')}`;

            const newThumbnail=req.files.thumbnail?.[0]
            const newProfileImage=req.files.profileImage?.[0]

            if(newThumbnail){
                if(resume.thumbnailLink){
                    const oldthumbnailPath=path.join(uploadFolder,path.basename(resume.thumbnailLink));
                    if(fs.existsSync(oldthumbnailPath)){
                        fs.unlinkSync(oldthumbnailPath);
                    }
                    resume.thumbnailLink=`${baseUrl}/uploads/${newThumbnail.filename}`;
                }

                //same for profilepreviwe image
                if(newProfileImage){
                    if(resume.profileInfo?.profilePreviewUrl){
                        const oldProfilePath=path.join(uploadFolder,path.basename(resume.profileInfo.profilePreviewUrl));
                        if(fs.existsSync(oldProfilePath)){
                            fs.unlinkSync(oldProfilePath);
                        }
                    }
                    resume.profileInfo.profilePreviewUrl=`${baseUrl}/uploads/${newProfileImage.filename}`;
                }
                await resume.save();
                res.status(200).json({ message: "Images uploaded successfully", thumbnailLink:resume.thumbnailLink, profilePreviewUrl:resume.profileInfo.profilePreviewUrl  });
            }
            
        });
    }
            
            
            catch(err){
                console.error("error uploading image:",err);
                res.status(500).json({ message: "failed to upload images", error: err.message });
            }



    }