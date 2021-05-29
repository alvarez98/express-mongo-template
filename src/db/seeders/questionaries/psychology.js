const questionary = {
    questionaryName: 'Cuestionario de Psicología',
    questionaryDescription: 'Cuestionario aplicado para evaluar el estado psicoemocional de los estudiantes',
    questionaryAudicence: 'student',
    isActive: true
}

const sections = [
    {
        sectionName: 'Estado Mental',
        sectionDescription: 'Esta sección es sobre el estado mental',
        sectionQuestions: [],
        isActive: true
    },
    {
        sectionName: 'Estado Fisico',
        sectionDescription: 'Esta sección es sobre el estado fisico',
        sectionQuestions: [],
        isActive: true
    },
    {
        sectionName: 'Estado Biologico',
        sectionDescription: 'Esta sección es sobre el estado biologico',
        sectionQuestions: [],
        isActive: true
    }
]

const questions = [
    [
        {
            question: 'Pregunta 1 Psico',
            questionType: 'MultipleOption',
            questionOptions: ['Accion 1', 'Accion 2', 'Accion 3'],
            isActive: true
        }
    ]
]

module.exports = {
    questionary,
    sections,
    questions
}