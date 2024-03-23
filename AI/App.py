
import openai

openai.api_key  = "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"

def open_file(filepath):
    with open(filepath,"r",encoding="utf-8") as infile:
        return infile.read()

def save_file(filepath,contet):
    with open(filepath,"a",encoding="utf-8") as outfile:
        outfile.write(contet)

with open("output2.jsonl", "rb") as file:
    response = openai.File.create(
        file=file,
        purpose='fine-tune'
    )

file_id = response['id']
print(file_id)