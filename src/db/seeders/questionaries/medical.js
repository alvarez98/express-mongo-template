const questionary = {
    questionaryName: 'Antecedentes Médicos',
    questionaryDescription: 'Antecendentes médicos sobre el estudiante y su familia',
    questionarySections: [],
    isActive: true
}

const sections = [
    {
        sectionName: 'Antecedentes Personales',
        sectionDescription: 'Información general sobre antecedentes médicos del estudiante',
        sectionQuestions: [],
        isActive: true
    },
    {
        sectionName: 'Antecedentes Familiares',
        sectionDescription: 'Información general sobre antecedentes médicos de la familia del estudiante',
        sectionQuestions: [],
        isActive: true
    }
]

const questions = [
    [
        {
            question: '¿Padece usted de alguna enfermedad crónica? (p.ej, asma, hipertensión, etc.)',
            questionType: 'Text',
            isActive: true
        },
        {
            question: 'En caso de que padezca usted de alguna enfermedad crónica, mencione cuáles son',
            questionType: 'Text',
            isActive: true
        },
        {
            question: '¿Ha presentado usted alguna enfermedad grave durante su vida? (p.ej que requiera hospitalización)',
            questionType: 'Text',
            isActive: true
        },
        {
            question: '¿Consume usted algún medicamento en forma rutinaria?, en caso de que si por favor describa cual y el modo de empleo. (incluye “medicamentos naturistas”)',
            questionType: 'Text',
            isActive: true
        },
        {
            question: '¿Cuántas bebidas alcohólicas consume normalmente a la semana?',
            questionType: 'Text',
            isActive: true
        },
        {
            question: '¿Consume habitualmente productos que contengan tabaco?, si es así, ¿cuántos cigarrillos consume habitualmente a la semana? ¿cuánto tiempo lleva consumiéndolos?',
            questionType: 'Text',
            isActive: true
        },
        {
            question: 'Además del alcohol y el tabaco, existen otras sustancias potencialmente adictivas que son consumidas por algunas personas, ¿consume usted alguna otra sustancia de este tipo?',
            questionType: 'Text',
            isActive: true
        },
        {
            question: '¿Padece alguna otra condición médica que desee informarnos? (antecedentes de migraña, trastornos del colon, etc)',
            questionType: 'Text',
            isActive: true
        }
    ],
    [
        {
            question: '¿Existen antecedentes de enfermedades en sus parientes directos (padres, hijos, abuelos, hermanos)? ¿Quiénes y qué padecen?',
            questionType: 'Text',
            isActive: true
        },
        {
            question: 'En sus parientes directos ¿alguno tiene antecendentes de enfermedades crónicas (hipertensión, diabetes, colesterol)? En caso afirmativo, describa quiénes los padecen y qué enfermedad poseen',
            questionType: 'Text',
            isActive: true
        },
        {
            question: '¿Alguno de sus familiares ha fallecido a consecuencia de una enfermedad crónica (infarto, insuficiencia renal, embolia)? En caso afirmativon, describa la enfermedad y el parentesco',
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