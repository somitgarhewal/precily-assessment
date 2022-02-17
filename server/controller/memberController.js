const member = require('../model/memberModel');

const memberController = {

   fetchMembers: async (req, res) => {
      try {
         const memberData = await member.find({})
         res.send(memberData.map((item) => item))
      }
      catch (error) {
         console.error("ERROR MESSAGE SEE", error);
         res.send("Error occured", error)
      }
   },

   addMember: async (req, res) => {
      const {
         body: {
            name,
            age
         },
      } = req;

      const newMemberData = new member({
         name,
         age,
      })
      try {
         const newMember = await newMemberData.save();
         return res.send({
            success: true,
            user: newMember,
         });
      } catch (error) {
         console.error(error);
         return res.send({ success: false });
      }
   },

   updateMember: async (req, res) => {
      const {
         body: {
            name,
            age,
            _id
         },
      } = req;
      const newData = {
         name,
         age,
      };
      try {
         const updatedMember = await member.findOneAndUpdate(
            { _id: _id },
            newData ,
         );
         return res.send({
            success: true,
            member: updatedMember,
         });
      } catch (error) {
         console.error(error);
         return res.send({ success: false });
      }
   }
}

module.exports = memberController;