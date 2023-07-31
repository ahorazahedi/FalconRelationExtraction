import torch
from transformers import AutoModelForCausalLM, AutoTokenizer


BASE_MODEL_NAME = ""
class TransformerCompleter:
    def __init__(self, peft_path):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL_NAME)
        self.base_model = AutoModelForCausalLM.from_pretrained(BASE_MODEL_NAME).to(self.device)
        self.base_model = AutoModelForCausalLM.from_pretrained(BASE_MODEL_NAME).to(self.device)

    def complete_text(self, prompt, max_length=50):
        with torch.no_grad():
            input_ids = self.tokenizer.encode(prompt, return_tensors='pt').to(self.device)
            generated = self.model.generate(input_ids, max_length=max_length, num_return_sequences=1, temperature=0.7)
            return self.tokenizer.decode(generated[:, input_ids.shape[-1]:][0], skip_special_tokens=True)
