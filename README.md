# Real Estate Appointment Manager

This project is a Vue 3 application that integrates with AirTable to manage and display appointment data. It includes functionalities for filtering, searching, and paginating appointment data, as well as creating and editing appointments.

### Key Features

1. **Appointment Management**: 
   - Display a list of appointments with pagination.
   - Create and edit appointments via modals.
   - Filter appointments by agents, status, and date range.
   - Search appointments using a search query.

2. **Real-time Data Updates**:
   - Real-time updates of appointment list when new appointments are added to AirTable.

3. **Component-based Architecture**:
   - Modular components for filter bar, selected filters, appointment list, and modals.

### Live Demo

You can view the live application [here](https://merve-kara-estate-project.vercel.app/).

### Prerequisites

- Vue 3
- Vuex
- TypeScript
- Tailwind CSS

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/mervekara/merve-kara-estate-project.git
    cd merve-kara-estate-project
    ```
2. You need to set up the following environment variables. Create a `.env.local` file in the root directory and add the following lines:

    ```bash
    VUE_APP_AIRTABLE_API_TOKEN=YOUR_SECRET_API_TOKEN
    VUE_APP_AIRTABLE_BASE_ID=appkTtnhXACqj0kag
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm run serve
    ```

## Features

- **Create Appointment:** Add new appointments through a modal form.
- **Edit Appointment:** Edit existing appointments using a modal form.
- **Filter Appointments:** Filter appointments by agents, status, and date range.
- **Search Appointments:** Search for appointments using a search query.
- **Pagination:** Paginate through appointments for better navigation.
- **Real-time Updates:** Appointments list updates in real-time when new appointments are added or existing ones are modified.


### Usage

- **Filter Bar**: Use the filter bar to filter appointments by agent, status, date range, and search query.
- **Selected Filters**: Display and remove selected filters.
- **Appointment List**: View a paginated list of filtered appointments.
- **Create Appointment Modal**: Add new appointments.
- **Edit Appointment Modal**: Edit existing appointments.

### Known Issues

- **Multiple Contacts Display**: When more than two contacts are selected, the UI might experience layout issues and visual misalignment. Ensure to test and adjust the UI for scenarios involving more than two contacts to avoid these issues.

### Contribution

If you find any bugs or have suggestions for improvement, please open an issue or create a pull request.
