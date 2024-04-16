import { ConversationArray } from ".";
import { openai } from "../config/openAi";

/**
 * This function takes a user's response and modifies the next dialogue from the bot to include information about how the user
 * responded.
 */
export async function respondToUser(previousQuestion: string, userResponse: string, nextQuestion: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a language teaching expert who focuses on conversation-based learning and is conversing with me. You asked me ${previousQuestion} and I responded with ${userResponse}. 
          You need to acknowledge this in the next part of the conversation. If they ask you a question, you should respond as a human conversation partner would. As you're helping me learn,
          you should also correct me if I make a mistake; this includes errors in grammar, syntax, or diction. Create a statement that addresses my response and leads into the next question: ${nextQuestion}. 
          You should format responses like this JSON object:
          
          {
            "questionInTargetLanguage": <THE STATEMENT WITH THE FOLLOW-UP QUESTION>,
            "questionInEnglish": <THE SAME AS THE ABOVE, BUT TRANSLATED TO ENGLISH>
          }
          
          `,
        },
      ],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Each time a user responds, we'll need to update the empty string field of `userResponse` in conversation.
 * This will us keep a running record of the conversation to analyze it afterwards.
 */
export function updateUserResponse(
  questionArray: ConversationArray,
  questionIndex: number,
  userResponse: string
): boolean {
  try {
    questionArray.questions[questionIndex].userResponse = userResponse;
    return true;
  } catch (err) {
    throw Error(`Error updating user's response: ${err}`);
  }
}

/**
 * For any question, we'll need to take the existing question text and update it to match the augmented text based on
 * the response from the user. This function utilizes the index of the question in the array and updates the
 * `questionInTargetLanguage` and `questionInEnglish` properties to match the neqQuestionObject.
 */
export function updateQuestion(
  questionArray: ConversationArray,
  questionIndex: number,
  newQuestionObject: any
): ConversationArray {
  questionArray.questions[questionIndex].questionInTargetLanguage = newQuestionObject.questionInTargetLanguage;
  questionArray.questions[questionIndex].questionInEnglish = newQuestionObject.questionInEnglish;

  return questionArray;
}
