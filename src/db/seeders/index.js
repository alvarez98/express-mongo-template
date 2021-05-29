const connection = require('../config.js')
const models = require('../models/index.js')
const keys = require('../keys.js')
const data = require('./data.js')

connection()
    .then(async () => {
        console.log('Trying to seed DB...')
        await createQuestionaries(data)
    })
    .then(()=>{
        console.log('Seeding succesfull!!!')
        process.exit(0)
    })
    .catch((err) => {
        console.log('SEEDING FAILED!!!')
        console.log(err)
        process.exit(1)
    })

const createQuestionaries = async (data) => {
    for(questionary in data){
        await createQuestionary(data[questionary])
    }
}

const createQuestionary = async (questData) => {
    // Verify questionary is not already created
    res = await findOne(models[keys.QUESTIONARY], {questionaryName: questData.questionary[0].questionaryName})
    if (res) {
        console.log('Seeding was performed previously on this questionary. Skipping seeding...')
        return
    }
    // Create questionary, sections...
    createdQuestionary = await create(models[keys.QUESTIONARY], questData.questionary)
    createdSections = await create(models[keys.SECTION], questData.sections)
    // Update info on questionaries
    questionaryId = createdQuestionary.ops[0]._id
    sectionIds = await createdSections.ops.map((section) => { return section._id })
    await update(models[keys.QUESTIONARY], questionaryId, { questionarySections: sectionIds })
    // For each section, create questionaries and update their sections
    sectionNo = 0
    for (questions of questData.questions){
        createdQuestions = await create(models[keys.QUESTION], questions)
        questionIds = await createdQuestions.ops.map((question) => { return question._id })
        await update(models[keys.SECTION], sectionIds[sectionNo], { sectionQuestions: questionIds })
        sectionNo++
    }
}

const findOne = async (model, data) => {
    res = await model.collection.findOne(data)
    return res
}

const create = async (model, data) => {
    res = await model.collection.insertMany(data)
    return res
}

const update = async (model, id, data) => {
    res = await model.collection.updateOne({ _id: id }, { $set: data } )
    return res
}

