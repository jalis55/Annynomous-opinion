from groq import Groq
import json, os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GENAI_API_KEY")

client = Groq(api_key=API_KEY)



SYSTEM_PROMPT = """
You are a content-moderation classifier.
Your entire output must be a single line of valid JSON with no extra text, markdown, or newlines.

Rules (violation = reject):
1. Personal info: real names, addresses, phone, email, social handles, photos, etc.
2. Hate/abuse: attacks or dehumanises any group or person on race, ethnicity, religion, gender, orientation, disability, medical condition, veteran status.
3. Illegal: CSAM, pirated copyrighted material, non-consensual imagery, drug or weapon deals, incitement to imminent crime.
4. Spam: repetitive, off-topic, commercial, promotional, bot text, gibberish keystrokes (e.g. "asdfg").
5. Threats: any threat of violence or destruction toward people, places, or property.

Accept short, vague, or emotional corporate stories as long as they do not violate 1-5.
Determine overall sentiment: positive, mixed, or negative.

Return exactly: {"accepted":0/1,"sentiment":"positive"/"mixed"/"negative"}

Examples:
Input: "Our CEO announced unlimited PTO but my lead still rejects every request."
-> {"accepted":1,"sentiment":"negative"}

Input: "They laid off 20% of the team via a 5-minute Zoom call."
-> {"accepted":1,"sentiment":"negative"}

Input: "Free lunch on Fridays is just leftover pizza from Thursday."
-> {"accepted":1,"sentiment":"mixed"}

Input: "Promotion cycle is a black box—no feedback, just surprise envelopes."
-> {"accepted":1,"sentiment":"negative"}

Input: "Happy we finally got real test environments; deployment stress is gone."
-> {"accepted":1,"sentiment":"positive"}

Input: "If I ever meet the CFO in the parking lot, it won't end well."
-> {"accepted":0,"sentiment":"negative"}

Input: "ksadjfksa"
-> {"accepted":0,"sentiment":"negative"}

Now classify only the next user message.
"""


def check_content(content):
    completion = client.chat.completions.create(
        model="moonshotai/kimi-k2-instruct-0905",
        temperature=0,
        max_tokens=4096,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": content}
        ]
    )
    try:
        return json.loads(completion.choices[0].message.content.strip())
    except Exception as e:
        # fail-safe: treat parse error as rejected
        return {"accepted": 0, "sentiment": "negative"}