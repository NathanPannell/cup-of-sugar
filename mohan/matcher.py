import os
import json
import random
try:
    import google.generativeai as genai
    GENAI_AVAILABLE = True
except ImportError:
    GENAI_AVAILABLE = False

def get_alignment_score(restaurant_data, foodbank_data):
    """
    Calculates the alignment score between a restaurant's offer and a food bank's needs.
    
    Args:
        restaurant_data (str): Description of the food the restaurant is offering.
        foodbank_data (str): Description of the food the food bank needs.
        
    Returns:
        dict: A dictionary containing 'score' (percentage string) and 'reasoning'.
    """
    
    api_key = os.getenv("GOOGLE_API_KEY")
    
    # Mock Mode: If API key is missing or library not installed
    if not api_key or not GENAI_AVAILABLE:
        score_val = random.randint(10, 95)
        reason = "Mock mode: API key missing. Returning a random score."
        if not GENAI_AVAILABLE:
            reason = "Mock mode: 'google.generativeai' library not found. Returning a random score."
            
        return {
            "score": f"{score_val}%",
            "reasoning": reason
        }

    # Real Mode: Use Gemini
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        prompt = f"""
        You are an AI matcher for a food rescue program. 
        Compare the following restaurant food offer with the food bank's needs.
        
        Restaurant Offer: "{restaurant_data}"
        Food Bank Needs: "{foodbank_data}"
        
        Determine how well the offer matches the needs.
        Return ONLY valid JSON with no markdown formatting. The JSON must contain exactly two fields:
        1. "score": A percentage string (e.g., "85%") representing the match quality.
        2. "reasoning": A short sentence explaining why.
        """
        
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Clean up potential markdown code blocks (```json ... ```)
        if response_text.startswith("```"):
            response_text = response_text.strip("`")
            if response_text.lower().startswith("json"):
                response_text = response_text[4:].strip()
                
        return json.loads(response_text)
        
    except Exception as e:
        # Fallback in case of API or parsing errors
        return {
            "score": "0%",
            "reasoning": f"Error calculating score: {str(e)}"
        }

if __name__ == "__main__":
    # Simple test when running the file directly
    print("Testing Matcher Module...")
    r_data = "Surplus bakery items, mainly sourdough loaves and bagels."
    f_data = "Need fresh bread and baked goods for breakfast service."
    
    result = get_alignment_score(r_data, f_data)
    print(f"Result: {json.dumps(result, indent=2)}")
