import { useDispatch, useSelector } from "react-redux";
import { updateText, updateProgress } from "../store/actions";

function Progress(props) {
  const job_status = useSelector((state) => state.job_status);
  const job_id = useSelector((state) => state.job_id);

  let { message } = props;
  return (
    <div class="flex flex-col items-center justify-center space-y-4">
      <svg
        class="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <div className="text-white text-sm">Your Job Id :{job_id}</div>
      <div class="text-white">{message}</div>
    </div>
  );
}

export default Progress;
