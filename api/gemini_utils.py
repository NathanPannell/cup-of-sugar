import os
from google import genai
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

class MatchResult(BaseModel):
    foodbank_id: int
    score: int
    reasoning: str

class MatchResponse(BaseModel):
    matches: List[MatchResult]
    overall_summary: str

def check_gemini_health():
    """Checks if the Gemini client is initialized."""
    return client is not None

def get_alignment_scores(donor_prompt: str, foodbanks: List[dict]) -> MatchResponse:
    """
    Uses Gemini to match a donor's prompt against a list of food banks.
    
    Args:
        donor_prompt (str): The donor's description of what they have.
        foodbanks (List[dict]): List of food bank dictionaries from the DB.
        
    Returns:
        MatchResponse: Structured object containing individual matches and a summary.
    """
    
    # Prepare the food bank data for the prompt
    foodbanks_context = []
    for fb in foodbanks:
        context = f"ID: {fb['id']}\nName: {fb['name']}\nDescription: {fb.get('description', 'N/A')}"
        uploaded_data = fb.get('uploaded_data')
        if uploaded_data and isinstance(uploaded_data, dict) and 'raw_text' in uploaded_data:
            context += f"\nAdditional Info (Needs/Capabilities): {uploaded_data['raw_text']}"
        foodbanks_context.append(context)
        
    context_str = "\n\n---\n\n".join(foodbanks_context)
    
    prompt = f"""
    You are an AI matcher for 'Cup of Sugar', a food rescue program. 
    A donor has provided the following description of food they wish to donate:
    
    DONOR PROMPT: "{donor_prompt}"
    
    Below is a list of food banks and their specific profiles. 
    Food bank data may include both current inventory/capabilities AND explicit needs/requests:
    
    {context_str}

    MATCHING CRITERIA (in order of priority):
    
    1. DIRECT NEEDS (Highest Priority - Score 8-10):
       - If a food bank explicitly lists an item as "needed", "requesting", or "looking for", 
         and the donor has that item, this is a PERFECT match.
       - Give these matches the highest scores (8-10).
    
    2. AVOID OVERSUPPLY (Score 1-3):
       - If a food bank already has "plenty of", "lots of", "abundant", or "well-stocked" with an item,
         and the donor is offering that same item, this is a POOR match.
       - Give these matches low scores (1-3) since the donation would be better allocated elsewhere.
    
    3. RECIPE COMPLEMENTARITY (Score 5-8):
       - If an item is NOT explicitly listed as needed, AND the food bank doesn't already have plenty of it,
         evaluate how well the donor's items complement the food bank's existing inventory.
       - Consider potential recipes that would bring items together:
         * Proteins + grains + vegetables = complete meals
         * Pasta + sauce + cheese = pasta dishes
         * Bread + spreads/proteins = sandwiches
         * Vegetables + dressing/oils = salads
         * Baking ingredients that complete a recipe set
       - Score based on how many complete, nutritious meals could be created (5-8).
    
    EXAMPLES:
    - Food bank explicitly needs "canned vegetables". Donor has canned vegetables. → Score: 10 (Direct need)
    - Food bank has "plenty of bread, well-stocked". Donor has bread. → Score: 2 (Oversupply)
    - Food bank has pasta, tomato sauce, but no cheese. Donor has cheese. → Score: 8 (Recipe complement)
    - Food bank has chicken, rice, but no vegetables. Donor has mixed vegetables. → Score: 7 (Recipe complement)
    - Food bank has flour, sugar, but no eggs or oil. Donor has eggs and oil. → Score: 8 (Recipe complement)
    
    For EACH food bank, provide:
    1. A match score from 1 to 10 (1 = poor match, 10 = perfect match).
    2. A concise rationale explaining which criteria applied and why.
    
    Also provide an overall summary recommending the best allocation of the donated items.
    """
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config={
                'response_mime_type': 'application/json',
                'response_schema': MatchResponse,
            }
        )
        return response.parsed
    except genai.errors.ClientError as e:
        print(f"Gemini ClientError: {e}")
        # Fallback response for rate limiting or other client errors
        fallback_matches = []
        for fb in foodbanks:
            fallback_matches.append(MatchResult(
                foodbank_id=fb['id'],
                score=5,
                reasoning="High traffic on AI service. Default match score provided."
            ))
        return MatchResponse(
            matches=fallback_matches,
            overall_summary="AI matching service is currently experiencing high traffic. Showing default recommendations."
        )

class InventoryNeedsSummary(BaseModel):
    inventory_summary: str
    needs_summary: str

def generate_foodbank_summary(text_blob: str) -> InventoryNeedsSummary:
    """
    Uses Gemini to summarize what a foodbank has vs what it needs based on raw text.
    """
    prompt = f"""
    You are an AI assistant for a food bank directory.
    Analyze the following text, which contains raw information about a food bank (inventory, needs, logistics, etc.).
    
    RAW TEXT:
    "{text_blob}"
    
    Your task:
    1. Extract a summary of what they HAVE (Inventory/Capabilities).
    2. Extract a summary of what they NEED (Donations/Volunteers).
    
    Be concise (2-3 sentences max per section). If the text doesn't mention one category, say "No information provided."
    """
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config={
                'response_mime_type': 'application/json',
                'response_schema': InventoryNeedsSummary,
            }
        )
        return response.parsed
    except Exception as e:
        print(f"Gemini Error in generate_foodbank_summary: {e}")
        return InventoryNeedsSummary(
            inventory_summary="Unable to generate summary.",
            needs_summary="Unable to generate summary."
        )

class InventoryNeedsSummary(BaseModel):
    inventory_summary: str
    needs_summary: str

def generate_foodbank_summary(text_blob: str) -> InventoryNeedsSummary:
    """
    Uses Gemini to summarize what a foodbank has vs what it needs based on raw text.
    """
    prompt = f"""
    You are an AI assistant for a food bank directory.
    Analyze the following text, which contains raw information about a food bank (inventory, needs, logistics, etc.).
    
    RAW TEXT:
    "{text_blob}"
    
    Your task:
    1. Extract a summary of what they HAVE (Inventory/Capabilities).
    2. Extract a summary of what they NEED (Donations/Volunteers).
    
    Be concise (2-3 sentences max per section). If the text doesn't mention one category, say "No information provided."
    """
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config={
                'response_mime_type': 'application/json',
                'response_schema': InventoryNeedsSummary,
            }
        )
        return response.parsed
    except Exception as e:
        print(f"Gemini Error in generate_foodbank_summary: {e}")
        return InventoryNeedsSummary(
            inventory_summary="Unable to generate summary.",
            needs_summary="Unable to generate summary."
        )
