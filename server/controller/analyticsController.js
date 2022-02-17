const analytics = require('../model/analyticsModel');

const analyticsController = {

    getAnalytics: async (req, res) => {
        try {
            const analyticsData = await analytics.find({})
            res.send({
                success: true,
                analyticsData: analyticsData
            })
        }
        catch (error) {
            console.error("ERROR MESSAGE SEE", error);
            res.send("Error occured", error)
        }
    },

     updateAnalytics: async (req, res) => {
        const {
           body: {
              name
           },
        } = req;
       
        try {
           const updatedAnalytics = await analytics.updateOne(
            { name: name },
            { $inc: { count: 1 } }
           );
           return res.send({
              success: true,
              analytics: updatedAnalytics,
           });
        } catch (error) {
           console.error(error);
           return res.send({ success: false });
        }
     }
}

module.exports = analyticsController;