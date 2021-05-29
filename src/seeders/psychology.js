questionary = [
    {
        questionaryName: 'Cuestionario de Psicología',
        questionaryDescription: 'Cuestionario aplicado para evaluar el estado psicoemocional de los estudiantes',
        questionaryAudicence: 'student'
    }
]

sections = [
    {
        sectionName: 'Estado Mental',
        sectionDescription: 'Esta sección es sobre el estado mental',
        sectionQuestions: []
    }
]

questions = [
    [
        {
            question: 'Pregunta 1 Psico',
            questionType: 'MultipleOption',
            questionOptions: ['Accion 1', 'Accion 2', 'Accion 3']
        }
    ]
]

module.exports = {
    questionary,
    sections,
    questions
}