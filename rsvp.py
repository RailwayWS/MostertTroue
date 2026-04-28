import json
import argparse

def load_data(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: Could not find '{filepath}'")
        return None

def analyze_rsvps(data, filter_diet=False, show_nc=False):
    if 'rsvps' in data:
        data = data['rsvps'] 

    total_rsvps = 0
    total_attending_guests = 0
    total_declined_guests = 0
    
    attending_list = []
    dietary_needs = []
    declined_list = []

    for firebase_id, rsvp in data.items():
        total_rsvps += 1
        
        guests = rsvp.get('guests', [])
        guest_count = len(guests)
        attendance = rsvp.get('attendance', 'no')
        has_diet = rsvp.get('hasDiet', False)
        diet_details = rsvp.get('dietDetails', '')

        if attendance == 'yes':
            total_attending_guests += guest_count
            for guest in guests:
                attending_list.append(guest)
                if has_diet:
                    dietary_needs.append(f"{guest}: {diet_details}")
        else:
            total_declined_guests += guest_count
            for guest in guests:
                declined_list.append(guest)

    print("\n" + "="*40)
    print(" WEDDING RSVP DASHBOARD ")
    print("="*40)
    
    print("\nTOTAL STATS:")
    print(f"Total RSVP Forms Submitted: {total_rsvps}")
    print(f"Total Guests ATTENDING:     {total_attending_guests}")
    print(f"Total Guests DECLINED:      {total_declined_guests}")
    
    if filter_diet:
        print("\nDIETARY REQUIREMENTS (CATERING LIST):")
        if dietary_needs:
            for item in sorted(dietary_needs, key=lambda x: x.split(':')[0].split()[-1].lower() if x.split(':')[0].split() else ""):
                print(f"- {item}")
        else:
            print("- No dietary requirements reported yet.")
    elif show_nc:
        print("\nDECLINED GUESTS:")
        if declined_list:
            for guest in sorted(declined_list, key=lambda x: x.split()[-1].lower() if x.split() else ""):
                print(f"- {guest}")
        else:
            print("- No declined guests reported yet.")
    else:
        print("\nATTENDING GUESTS:")
        for guest in sorted(attending_list, key=lambda x: x.split()[-1].lower() if x.split() else ""):
            print(f"- {guest}")

    print("\n" + "="*40 + "\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process Wedding RSVPs.")
    parser.add_argument('-f', '--file', default='rsvps.json', help='Path to the Firebase JSON export')
    parser.add_argument('-d', '--diet', action='store_true', help='Only show the dietary requirements list')
    parser.add_argument('--nc', action='store_true', help='Show list of guests not coming')
    
    args = parser.parse_args()
    
    firebase_data = load_data(args.file)
    if firebase_data:
        analyze_rsvps(firebase_data, filter_diet=args.diet, show_nc=args.nc)