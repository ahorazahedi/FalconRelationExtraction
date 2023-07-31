import { useDispatch, useSelector } from "react-redux";
import { updateText, updateProgress } from "../store/actions";

function Abstract({socket}) {
  const dispatch = useDispatch();
  const textInput = useSelector((state) => state.textInput);
  return (
    <>
      <img class="mx-auto h-48 w-auto" src="/logo.png" alt="Logo" />
      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <textarea
              required
              class="appearance-none h-32  relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter Abstract of Article To Create Graph Based on That"
              value={textInput}
              onChange={(e) => dispatch(updateText(e.target.value))}
            />
          </div>
        </div>
        <div>
          <button

          onClick={()=>{
            socket.emit("extract-relation", {
              text : textInput
            });
          }}
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Graph
          </button>
        </div>
      </div>
    </>
  );
}

export default Abstract;
