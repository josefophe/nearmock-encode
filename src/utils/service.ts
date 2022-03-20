import axios from 'axios';
import { isAuth } from '../lib/firebase-admin';

export const addQuizApi = async (isAuth, values) => {
  try {
    const header = {
      'Content-Type': 'application/json',
      token: isAuth.token,
    };
    const resp = await axios.post('/api/quiz', values, { headers: header });
    return resp;
  } catch (error) {
    throw error;
  }
};

export const addAnswerApi = async (isAuth, quizId, values) => {
  try {
    const header = {
      'Content-Type': 'application/json',
      token: isAuth.token,
    };
    const resp = await axios.post(
      `/api/quiz/${quizId}/answer`,
      {
        questions: values,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { headers: header }
    );
    return resp;
  } catch (error) {
    throw error;
  }
};
