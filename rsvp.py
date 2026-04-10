import json
import argparse

def load_data(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: Could not find '{filepath}'. Make sure your Firebase export is in the same folder.")
        return None

def analyze_rsvps(data, filter_diet=False):
    # --- THE FIX: Check if the data is wrapped inside the "rsvps" parent node ---
    if 'rsvps' in data:
        data = data['rsvps'] 
    # -------------------------------------------------------------------------

    total_rsvps = 0
    total_attending_guests = 0
    total_declined_guests = 0
    
    # Lists for our sorted breakdowns
    attending_list = []
    dietary_needs = []

    # Now it loops through your push IDs correctly!
    for firebase_id, rsvp in data.items():
        total_rsvps += 1
        
        # Safely grab the data
        guests = rsvp.get('guests', [])
        guest_count = len(guests)
        attendance = rsvp.get('attendance', 'no')
        has_diet = rsvp.get('hasDiet', False)
        diet_details = rsvp.get('dietDetails', '')
        email = rsvp.get('email', 'No email')
        names_str = " & ".join(guests)

        if attendance == 'yes':
            total_attending_guests += guest_count
            attending_list.append({
                'names': names_str,
                'email': email,
                'diet': diet_details if has_diet else 'None'
            })
            
            # Separate list specifically for catering
            if has_diet:
                dietary_needs.append(f"- {names_str}: {diet_details}")
                
        else:
            total_declined_guests += guest_count

    # --- PRINTING THE REPORT ---
    print("\n" + "="*40)
    print("WEDDING RSVP DASHBOARD")
    print("="*40)
    
    print(f"\nTOTAL STATS:")
    print(f"Total RSVP Forms Submitted: {total_rsvps}")
    print(f"Total Guests ATTENDING:     {total_attending_guests}")
    print(f"Total Guests DECLINED:      {total_declined_guests}")
    
    if filter_diet:
        print("\nDIETARY REQUIREMENTS (CATERING LIST):")
        if dietary_needs:
            for item in dietary_needs:
                print(item)
        else:
            print("- No dietary requirements reported yet.")
    else:
        print("\n✅ ATTENDING GUESTS:")
        for guest in sorted(attending_list, key=lambda x: x['names']):
            diet_tag = f" [Diet: {guest['diet']}]" if guest['diet'] != 'None' else ""
            print(f"- {guest['names']} ({guest['email']}){diet_tag}")

    print("\n" + "="*40 + "\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process Wedding RSVPs.")
    parser.add_argument('-f', '--file', default='rsvps.json', help='Path to the Firebase JSON export')
    parser.add_argument('-d', '--diet', action='store_true', help='Only show the dietary requirements list')
    
    args = parser.parse_args()
    
    firebase_data = load_data(args.file)
    if firebase_data:
        analyze_rsvps(firebase_data, filter_diet=args.diet)