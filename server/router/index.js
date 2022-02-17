var Member = require('../controller/memberController')
var Analytics = require('../controller/analyticsController')

module.exports = (router) => {
    router.get('/api/fetchMember', Member.fetchMembers);
    router.post('/api/addMember', Member.addMember);
    router.put('/api/updateMember', Member.updateMember);
    router.get('/api/getAnalytics', Analytics.getAnalytics);
    router.put('/api/updateAnalytics', Analytics.updateAnalytics);
}