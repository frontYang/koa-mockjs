const KoaRouter = require('koa-router')
const Mock = require('mockjs')
const router = new KoaRouter()

router.get('/test1', async (ctx, next) => {
  ctx.body = {
    code: 0,
    message: '操作成功',
    data: {
      dayOff: 0,
      education: '',
      featureExperience: '查阅,下载,新增,上传,修改,',
      pepId: 452,
      positionName: 'JAVA开发工程师',
      fieldExperience: '',
      rosterDimissionId: 132,
      feature: '查阅,下载,新增,上传,修改,',
      updateEducation: 0,
      departmentName: '技术中心-技术部-大数据项目',
      laborContract: 0,
      serialNumber: '20187042',
      entryDate: '2019-07-05',
      deptId: 213,
      fieldDimission: '',
      sessionId: '509B8C907CABA0FBAE3D6D62FBF3E622',
      firstLevel: 1,
      AnnualLeaves: 0,
      updatePersonal: 0,
      headId: 68,
      rosterId: 131,
      headName: '彭超文',
      updateExperience: 0,
      settlementHeadId: 47,
      featureDimission: '查阅,下载,新增,上传,修改,',
      positionId: 19,
      field: '',
      name: '王斯浩',
      position: '',
      rosterExperienceId: 133
    }
  }
  await next()
})
module.exports = router
