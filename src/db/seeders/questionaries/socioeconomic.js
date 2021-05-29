const questionary = [
    {
        questionaryName: 'Cuestionario de Enfermería',
        questionaryDescription: 'Cuestionario para enfermería',
        questionaryAudicence: 'student',
        isActive: true
    }
]

const sections = [
    {
        sectionName: 'Sección 1 Salud',
        sectionDescription: 'Descripcion random',
        sectionQuestions: [],
        isActive: true
    }
]

const questions = [
    [
        {
            question: 'Pregunta X de Medicina',
            questionType: 'Text',
            isActive: true
        }
    ]
]

module.exports = {
    questionary,
    sections,
    questions
}