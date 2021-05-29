const connection = require('../db/config.js')
const models = require('../db/models/index.js')
const keys = require('../db/keys.js')
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
    // Create questionary, sections...
    createdQuestionary = await create(models[keys.QUESTIONARY], questData.questionary)
    createdSections = await create(models[keys.SECTION], questData.sections)
    // Update info on questionaries
    questionaryId = createdQuestionary.ops[0]._id
    sectionIds = await createdSections.ops.map((section) => { return section._id })
    console.log(sectionIds)
    await update(models[keys.QUESTIONARY], questionaryId, { questionarySections: sectionIds })
    // For each section, create questionaries and update their sections
    sectionNo = 0
    for (questions of questData.questions){
        createdQuestions = await create(models[keys.QUESTION], questions)
        console.log(createdQuestions)
        questionIds = await createdQuestions.ops.map((question) => { question._id })
        console.log(questionIds)
        await update(models[key.SECTION], sectionIds[sectionNo], { sectionQuestions: questionIds })
        sectionNo++
    }
}

const create = async (model, data) => {
    res = await model.collection.insertMany(data)
    return res
}

const update = async (model, id, data) => {
    console.log(id, data)
    res = await model.collection.updateOne({ _id: id }, data)
    return res
}

