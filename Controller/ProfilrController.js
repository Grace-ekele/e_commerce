const profile = require('../Model/ProfileModel')



const getOneProfile = async (req,res)=>{
    try {
        const { id} = req.params;
        const userProfile = await profile.findOne({_id:id}).populate('user')

        if (!userProfile) {
            return res.status(404).json({ message: `No profile with id ${id} found` });
        }

        res.status(200).json({ userProfile })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}

const getAllProfile =async(req,res)=>{
    try {
        const allProfile = await profile.find()
        res.status(200).json({data:allProfile})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const editProfile = async(req,res)=>{
    try {
        const { id: userProfile } = req.params;
        const updatedProfile = await profile.findOneAndUpdate(
            { _id: userProfile },
            req.body,
            { new: true }
        );
        
        if (!updatedProfile) {
            return res.status(404).json({ message: `No profile with id ${userProfile} found` });
        }
        
        res.status(200).json({ userProfile: updatedProfile, message: 'Profile updated successfully' });
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}





module.exports={
    getOneProfile,
    getAllProfile,
    editProfile
}