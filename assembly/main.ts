import { Context, logging,context, u128, PersistentVector, ContractPromiseBatch, PersistentMap  } from 'near-sdk-as'


import { Questions} from './model';


/****************
 *   STORAGE    *
 ****************/
const QuestionVector = new PersistentVector<Questions>('QuestionVector');
// const DEFAULT_FEE: u128 = u128.from("1000000000000000000000000"); // 1 NEAR
/**
 * Adds a new question under the name of the sender's account id.\
 */
export function addQuestion(
  _questionTitle: string,
  _questionDesp: string,
  _question: string,
  _option1: string,
  _option2: string,
  _option3: string,
  _option4: string,
  _answer: i32
): void {
  let id = QuestionVector.length + 1;
  const questionTitle = new Questions(id,context.sender,_questionTitle, _questionDesp, _question, _answer,_option1, _option2, _option3, _option4,DEFAULT_FEE);
  QuestionVector.push(questionTitle);
  logging.log("add question" + questionTitle.getQuestion());
}
/**
 * get list question
 */
export function getListQuestion(): Array<Questions> {
  const result = new Array<Questions>(QuestionVector.length);
  for (let i = 0; i < QuestionVector.length; i++) {
        result[i] = QuestionVector[i];
    }
    return result;
}

export function getAuthorByQuestion(_id: u32): string {
  return QuestionVector[_id-1].owner;
}

export function getAnswer(_id: u32): i32 {
  return QuestionVector[_id-1].answer
}

/**
 * answer the question
 */
export function answerQuestion(_quest_id: u32, _option: i32): boolean {

  let author = getAuthorByQuestion(_quest_id);
  assert(context.sender != author, "You cannot play because you are the author of the question");
  let answer = getAnswer(_quest_id);
  if (_option == answer) {
    return true;
  }
  else {
    return false;
  }
}