## World of Hostels

World of Hostels is a HostelWorld clone, a booking platform that allows users to book hostels cities accross the world. Catered more towards the backpackers and solo travelers across the world, World of Hostels allows travelers to either book a full private room or a bunk bed in a shared room. It allows more budget friendly options by having multiple users in the same accomadation, coming and going as they please. World of Hostels uses React.js on the frontend and Ruby on Rails on the backend.

https://world-of-hostels.onrender.com

### Technologies and libraries used:

- Ruby on Rails
- JavaScript
- React/Redux
- PostgreSQL
- Amazon Web Storage (AWS)
- HTML
- CSS


### Functionality and MVPS
- Users can sign up for a new account or login to their existing accounts
- Certain features such as booking available only when a user is logged in
- Upon searching for a location, all available rooms are shown on an index page together
- When an accomodation is selected, the user is brought to the listing show page where different room options are shown.

![World of Hostels homepage](./frontend/src/assets/read-me-pictures/Screenshot%202023-11-26%20at%2011.29.13%20PM.png)

![Sign up page for new users](./frontend/src/assets/read-me-pictures/Screenshot%202023-11-26%20at%2011.28.33%20PM.png)

![Property details on the listings show page](./frontend/src/assets/read-me-pictures/Screenshot%202023-11-26%20at%2011.29.42%20PM.png)


### Future Implementions/ Open Issues
- In the listings show, fix the calendar style.
- In splash page, fix calendar style.
- Fix guests button in both listings show and splash page.
- Add search feature to nav bar in listings show and index.
- Prevent searches in the past and prevent start and end date on the same day.
- Add more seeds data
- Add more locations to search location feature.
- Add facilities to listings show
- Add edit reservation feature.
- Add errors to sign-up/ login/ users edit
- Prevent users from changing birthdate to an incorrect date and not having a valid name
- Fix styling in leave review - About you