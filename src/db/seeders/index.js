const connection = require('../config.js')
const models = require('../models/index.js')
const keys = require('../keys.js')
const data = require('./questionaries/index.js')

connection()
  .then(async () => {
    console.log('Trying to seed DB...')
    await createQuestionaries(data)
  })
  .then(() => {
    console.log('Seeding succesfull!!!')
    process.exit(0)
  })
  .catch((err) => {
    console.log('Seeding failed!!!')
    console.log(err)
    process.exit(1)
  })

const createQuestionaries = async (data) => {
  for (const questionary in data) {
    await createQuestionary(data[questionary])
  }
}

const createQuestionary = async (questData) => {
  // Verify questionary is not already created
  const res = await findRegister(models[keys.QUESTIONARY], {
    questionaryName: questData.questionary.questionaryName
  })
  if (res) {
    console.log(
      'Seeding was performed previously on this questionary. Skipping seeding...'
    )
    return
  }
  console.log('No previous questionary seeding was found. Seeding...')
  // Create questionary, sections...
  const createdQuestionary = await createRegisters(models[keys.QUESTIONARY], [
    questData.questionary
  ])
  const createdSections = await createRegisters(
    models[keys.SECTION],
    questData.sections
  )
  // Update info on questionaries
  const questionaryId = createdQuestionary[0]._id
  const sectionIds = await createdSections.map((section) => {
    return section._id
  })
  await updateRegister(models[keys.QUESTIONARY], questionaryId, {
    questionarySections: sectionIds
  })
  // For each section, create questionaries and update their sections
  let sectionNo = 0
  for (const questions of questData.questions) {
    const createdQuestions = await createRegisters(
      models[keys.QUESTION],
      questions
    )
    const questionIds = await createdQuestions.map((question) => {
      return question._id
    })
    await updateRegister(models[keys.SECTION], sectionIds[sectionNo], {
      sectionQuestions: questionIds
    })
    sectionNo++
  }
}

const findRegister = async (model, data) => {
  const res = await model.findOne(data)
  return res
}

const createRegisters = async (model, data) => {
  const res = await model.insertMany(data)
  return res
}

const updateRegister = async (model, id, data) => {
  const res = await model.updateOne({ _id: id }, { $set: data })
  return res
}
