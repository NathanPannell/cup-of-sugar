# Cup of Sugar
## Coordinating food donations
### The Problem
Stores and restaurants struggle to get soon-to-expire food to where it's needed most. The distribution system is fragmented, keeping track of food bank needs is difficult, and data is often unstructured or outdated. As a result, edible food goes to waste while people go hungry.
### Our Solution
Cup of Sugar intelligently allocates food donations for maximum impact.
- **Accepts all data**: We process messy inputs like inventory lists or simple text descriptions.
- **Smart matching**: We compare donations against the specific needs of food banks to recommend the best destination.
- **Simple experience**: Donors can easily report excess food, and food banks get what they actually need.
### Target Users
- **Food Banks**: Need a reliable way to communicate their specific inventory needs.
- **Restaurants**: Have excess food to move quickly and ethically.
- **Farmers**: Need to distribute large amounts of produce to the right places.
### Technical Workflow
The system uses a modern stack to connect donors with food banks.
1. **Input**: Food banks provide inventory (CSV/text) and donors report excess food (natural language).
2. **Processing**: Data is stored in Supabase. The Gemini API analyzes the messy data to understand needs and offerings.
3. **Matching**: The system compares the donation against food bank requirements.
4. **Result**: The best match is identified, and contact information is provided to coordinate the exchange.
#### Stack
- **Frontend**: React / Vite
- **Backend**: Python / Flask
- **Database**: Supabase
- **AI**: Gemini API
- **Deployment**: Run full-stack application with `docker compose up -d --build`
#### Submission
- **Canva Link**: [https://www.canva.com/design/DAHAAuHZorM/54fyvb--lgg6hBasUxpgig/edit](https://www.canva.com/design/DAHAAuHZorM/54fyvb--lgg6hBasUxpgig/edit)
- **Submission Snapshot**: Attached as PDF for verification
