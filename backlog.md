# AI Task Manager Backlog

## Bug Fixes
### 1. Correct Handling of Relative Dates
- **Description**: Improve the logic for interpreting phrases like "in two days" or "three days from now" in task creation.
- **Priority**: High
- **Acceptance Criteria**:
  - The application correctly interprets relative date phrases and converts them into absolute dates.
  - Handles variations like "in a couple of days," "next weekend," or "by Friday."
- **Suggested Fix**:
  - Move date parsing logic to a separate module or utility file.
  - Expand `preprocessInput` to use a dictionary or external file for mapping phrases to date calculations.
  - Example phrases to include:
    - "in X days"
    - "by [day name]"
    - "next [day name]"

---

## Features
### 2. Add Due Time Support
- **Description**: Allow users to specify the time a task is due (e.g., "Submit report at 5 PM").
- **Priority**: High
- **Acceptance Criteria**:
  - Tasks can include a `dueTime` field (e.g., `15:00` in 24-hour format).
  - The server and client properly display and handle tasks with time.
- **Implementation Notes**:
  - Update the OpenAI prompt to extract both `dueDate` and `dueTime`.
  - Add a time picker or text input validation for time in the frontend.

### 3. Reminder Notifications
- **Description**: Notify users when tasks are approaching their due time.
- **Priority**: Medium
- **Acceptance Criteria**:
  - Reminders trigger X minutes or hours before the due time (configurable).
  - Notifications can be delivered via:
    - Desktop browser notifications
    - Email (optional for future)
- **Implementation Notes**:
  - Use `node-schedule` or similar for server-side reminders.
  - Implement a reminder scheduler module.

### 4. Voice Command Input
- **Description**: Enable users to add tasks using voice commands.
- **Priority**: High
- **Acceptance Criteria**:
  - Users can say tasks like "Remind me to call Sarah tomorrow at 3 PM."
  - The task is parsed and added successfully.
- **Implementation Notes**:
  - Integrate with a library like [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for browser-based voice recognition.
  - Ensure robust handling of different accents and phrasing.

---

## Enhancements
### 5. Task Organization
- **Description**: Improve task sorting and categorization for better usability.
- **Priority**: Medium
- **Acceptance Criteria**:
  - Tasks can be grouped by status, priority, or due date/time.
  - Add filters (e.g., "Show high-priority tasks" or "Show completed tasks").
- **Implementation Notes**:
  - Add filter and sort options in the frontend.
  - Adjust backend logic to support sorted queries.

### 6. Advanced NLP for Task Parsing
- **Description**: Enhance natural language processing to handle more complex input.
- **Priority**: Medium
- **Acceptance Criteria**:
  - The app can parse inputs like "Email the report by EOD Thursday."
  - Handles contextually ambiguous phrases (e.g., "by tomorrow morning").
- **Implementation Notes**:
  - Extend OpenAI prompt to handle more complex parsing rules.
  - Add fallback logic for unclear inputs (e.g., prompt user for clarification).

### 7. Recurring Tasks
- **Description**: Allow users to set tasks that repeat (e.g., "Water plants every Monday").
- **Priority**: Low
- **Acceptance Criteria**:
  - Users can set task recurrence intervals (daily, weekly, monthly).
  - Tasks automatically reappear after completion.
- **Implementation Notes**:
  - Add a `recurrence` field to tasks.
  - Update backend logic to regenerate tasks based on recurrence rules.

### 8. Improved UI/UX
- **Description**: Make the interface more intuitive and professional.
- **Priority**: Medium
- **Acceptance Criteria**:
  - Simplify task input fields.
  - Add visual indicators for task priorities and overdue tasks.
  - Add a "Dark Mode" toggle.
- **Implementation Notes**:
  - Redesign UI components in the frontend using a CSS framework like Tailwind or Material-UI.

### 9. Task Sharing
- **Description**: Allow users to share tasks with others (e.g., via email or shared workspace).
- **Priority**: Low
- **Acceptance Criteria**:
  - Users can invite others to collaborate on tasks.
  - Tasks can be shared via a unique link or workspace.
- **Implementation Notes**:
  - Add a `sharedWith` field to tasks.
  - Implement a permissions system.

---

## Documentation
### 10. Update README
- **Description**: Keep the GitHub README file updated with the latest features and instructions.
- **Priority**: High
- **Acceptance Criteria**:
  - README includes clear setup instructions, features, and examples.
  - Add a "Planned Features" section to align with this backlog.

---

**How to Contribute**
1. Check open issues or this backlog for available tasks.
2. Fork the repository, make your changes, and submit a pull request.

**Prioritization Key**:
- **High**: Critical functionality that should be addressed first.
- **Medium**: Useful features or enhancements that improve usability.
- **Low**: Long-term improvements or additional features.
