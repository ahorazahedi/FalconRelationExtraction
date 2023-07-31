const initialState = {
  textInput: "",
  job_status: "WAITING_FOR_ABSTRACT",
  job_result: {
    nodes: [
      { id: 1, label: "alcohol", title: "alcohol[ChemicalEntity]" },
      {
        id: 2,
        label: "central nervous system depressants",
        title: "central nervous system depressants[ChemicalEntity]",
      },
      {
        id: 3,
        label: "chlordiazepoxide",
        title: "chlordiazepoxide[ChemicalEntity]",
      },
      {
        id: 4,
        label: "blood coagulation",
        title: "blood coagulation[DiseaseOrPhenotypicFeature]",
      },
      { id: 5, label: "anxiety", title: "anxiety[DiseaseOrPhenotypicFeature]" },
      {
        id: 6,
        label: "depression",
        title: "depression[DiseaseOrPhenotypicFeature]",
      },
      {
        id: 7,
        label: "insomnia",
        title: "insomnia[DiseaseOrPhenotypicFeature]",
      },
    ],
    edges: [
      { id: 1, from: 1, to: 2 },
      { id: 2, from: 3, to: 2 },
      { id: 3, from: 3, to: 4 },
      { id: 4, from: 4, to: 1 },
      { id: 5, from: 4, to: 3 },
      { id: 6, from: 5, to: 3 },
      { id: 7, from: 5, to: 1 },
      { id: 8, from: 3, to: 6 },
      { id: 9, from: 3, to: 7 },
      { id: 10, from: 6, to: 3 },
      { id: 11, from: 7, to: 3 },
      { id: 12, from: 1, to: 7 },
      { id: 13, from: 1, to: 6 },
      { id: 14, from: 1, to: 3 },
      { id: 15, from: 4, to: 1 },
      { id: 16, from: 4, to: 3 },
    ],
  },
  job_id: null,
};

export const MainStore = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TEXT":
      return { ...state, textInput: action.payload };
    case "UPDATE_PROGRESS":
      let { job_result, job_id, job_status } = action.payload;
      return { ...state, job_result, job_id, job_status };
    default:
      return state;
  }
};
