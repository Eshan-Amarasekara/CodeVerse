import openai

# Function to open a file and return ints contents as string
def open_file(filepath):
    with open(filepath, 'r', encoding="utf-8") as infile:
        return infile.read()

# Function to save content to file
def save_file(filepath, content):
    with open(filepath, 'a', encoding="utf-8") as outfile:
        outfile.write(content)

# Setting the OpenAI API keys by reading them from filea
openai.api_key  = "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"


# Using the provided file
file_id ="file-jtvCKodqzlZmGdSg2YzGieV4"
model_name = "gpt-3.5-turbo"

response = openai.FineTuningJob.create(
    training_file=file_id,
    model=model_name
)

job_id = response["id"]
print(f"Fine Tuning Job created successfully with ID: {job_id}")