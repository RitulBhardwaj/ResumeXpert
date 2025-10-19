import Resume from "../models/resumeModel.js";

import fs from "fs";
import path from "path"; 
 

//create or update resume
export const createResume = async (req, res) => {
    try {
        const {title}=req.body;

        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

        const newResume=await Resume.create({
            userId: req.user._id,
            title: title,
            ...defaultResumeData,
            ...req.body
        });
        res.status(201).json(newResume);
    }

    catch (error) {
        res.status(500).json({ message: "Failed to Create Resume",error:error.message });
        error=error.message;


    }
}

//GET user resumes
export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
        res.status(200).json(resumes);

    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch resumes" });
        error=error.message;

    }
}

//GET resume by ID
export const getResumeById = async (req, res) => {
    try {
        const resume=await Resume.findOne({_id:req.params.id,userId:req.user._id});
        if(!resume){
            return res.status(404).json({ message: "Resume not found" });
        }   
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch resume" });
        error=error.message;
    }

}

//Update resumes
export const updateResume = async (req, res) => {
    try {
        const resume=await Resume.findOneAndUpdate({
            _id:req.params.id,
            userId:req.user._id
        }, req.body, { new: true })
        if(!resume){
            return res.status(404).json({ message: "Resume not found or not authorised" });
        }

        res.json(resume);



    }
    catch (error) {
        res.status(500).json({ message: "Failed to update resume" });
        console.error(error);
    }
}

//DELETE RESUME
export const deleteResume = async (req, res) => {
    try {
        // First find the resume to get file paths
        const resume=await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        });
        if(!resume){
            return res.status(404).json({ message: "Resume not found or not authorised" });
        }
        
        //create a upload folder and store the resume there
        const uploadFolder=path.join(process.cwd(),'uploads');

        //delete thumbnail function
        if(resume.thumbnail){
            const oldthumbnailPath=path.join(uploadFolder,path.basename(resume.thumbnail));
            if(fs.existsSync(oldthumbnailPath)){
                fs.unlinkSync(oldthumbnailPath);
            }
        }
        if(resume.profileInfo?.profilePreviewUrl){
            const oldProfilePath=path.join(uploadFolder,path.basename(resume.profileInfo.profilePreviewUrl));
            if(fs.existsSync(oldProfilePath)){
                fs.unlinkSync(oldProfilePath);
            }
        }
        
        //delete resume doc
        const deleted=await Resume.findOneAndDelete({
            _id:req.params.id,
            userId:req.user._id 
        });
        if(!deleted){
            return res.status(404).json({ message: "Resume not found or not authorised" });
        }
        res.json({ message: "Resume deleted successfully" });

    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete resume" });
        console.error(error);
    }
}