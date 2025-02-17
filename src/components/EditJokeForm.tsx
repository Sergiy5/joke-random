import { useEditJoke } from "@/hooks/useEditForm";
import { IJoke } from "@/hooks/useJokes";
import { useEffect, useState } from "react";

interface EditJokeFormProps {
  joke: IJoke | null;
  mutate: (joke: IJoke, arg: boolean) => void;
}
export const EditJokeForm: React.FC<EditJokeFormProps> = ({ joke, mutate }) => {
  const { editJoke } = useEditJoke();

  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(joke?.question);
  const [editedAnswer, setEditedAnswer] = useState(joke?.answer);

  useEffect(() => {
    setEditedQuestion(joke?.question);
    setEditedAnswer(joke?.answer);
  }, [isEditing, joke?.answer, joke?.question]);

  const handleEdit = async () => {
    if (!joke || !editedQuestion || !editedAnswer) return;
    await editJoke(joke.id, editedQuestion, editedAnswer); // Edit the joke
    setIsEditing(false); // Close the edit form

    // Optimistic UI update - this will update the joke immediately in the UI without waiting for the response
    mutate(
      {
        ...joke,
        question: editedQuestion,
        answer: editedAnswer,
      },
      false
    );
  };

  return (
    <div>
      <div
        className={`mt-2 transition-all duration-500 overflow-hidden  ${
          isEditing ? "h-44 opacity-100" : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        {isEditing && (
          <div className="max-w-lg mx-auto bg-white pt-6 rounded-lg shadow-md text-center">
            <input
              className="border p-2 w-full rounded-lg"
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
            />
            <input
              className="border p-2 w-full mt-2 rounded-lg"
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
            />
            <button
              onClick={handleEdit}
              aria-labelledby=""
              className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        )}
      </div>
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className=" border-none underline"
        >
          Edit joke
        </button>
      )}
    </div>
  );
};
