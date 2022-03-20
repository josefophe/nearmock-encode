import { context, u128} from "near-sdk-as";
@nearBindgen
export class Questions {
  id: i32;
  owner: string;
  questionTitle: string;
  questionDesp: string;
  question: string;
  answer: i32;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  questionfee: u128;

  constructor(
    _id: i32,
    _owner: string,
    _questionTitle: string,
    _questionDesp: string,
    _question: string,
    _answer: i32,
    _option1: string,
    _option2: string,
    _option3: string,
    _option4: string,
    _questionfee: u128
  ) {
    this.id = _id;
    this.owner = _owner;
    this.questionTitle = _questionTitle;
    this.questionDesp = _questionDesp
    this.question = _question;
    this.answer = _answer;
    this.option1 = _option1;
    this.option2 = _option2;
    this.option3 = _option3;
    this.option4 = _option4;
    this.questionfee = _questionfee;
  }

  public getQuestion(): string {
    return `${this.questionTitle}`
  }

  public getChoiceDetails(): string {
    return `${this.option1}`;
  }

  public getAnswer(): i32{
    return this.answer;
  }
}
