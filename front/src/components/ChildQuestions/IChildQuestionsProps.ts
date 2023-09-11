import IQuestionGetDto from "../../interfaces/IQuestion/IQuestionGetDto";

export default interface IChildQuestionsProps {
    questions: IQuestionGetDto[]
    childData: {
        name: string
        surname: string
        patronim?: string
        photo: string
    }
}