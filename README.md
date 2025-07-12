# Quiz Master

## Short Description
Quiz Master is a web application built with React that allows users to create, take, and manage quizzes. It features both manual quiz creation and an AI-assisted prompt generation tool, along with robust image handling and a user-friendly interface.

## Features
*   **Interactive Quiz Taking:** Engage with quizzes, select answers, and track progress.
*   **Quiz Creation:**
    *   **Manual Mode:** Create quizzes from scratch by adding questions, answers, and images.
    *   **AI-Assisted Mode:** Generate quiz JSON using an AI model by copying a pre-formatted prompt.
*   **Dynamic Progress Bar:** Visual representation of quiz completion.
*   **Responsive Design:** Optimized for various screen sizes.
*   **Robust Image Handling:**
    *   Support for image URLs in questions and answers.
    *   Automatic detection and graceful handling of broken or invalid image links (they will be ignored).
    *   Visual indicator for questions with broken image links.
*   **Quiz Management:** Download created quizzes as JSON files.

## Used Libraries and Resources

### Libraries
*   **React:** A JavaScript library for building user interfaces.
*   **Bootstrap:** A popular CSS framework for responsive, mobile-first front-end web development.
*   **Font Awesome:** A popular icon library for web projects.

### Resources
*   **Google Fonts:** Used for typography (Roboto, Fira Code).
*   **Image Sources (for AI prompt guidance):** Wikipedia, Pexels, Unsplash (as examples for AI-generated image URLs).

## User Manual

### 1. Getting Started
To run the application locally:
1.  Navigate to the `quiz-app` directory in your terminal:
    ```bash
    cd quiz-app
    ```
2.  Install the necessary dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    The application will typically open in your browser at `http://localhost:3000`.

### 2. Taking a Quiz
1.  From the start page, select a quiz from the available options.
2.  Navigate through the questions using the "Previous" (left arrow) and "Next" (right arrow) buttons.
3.  Select your answer for each question by clicking on the answer card.
4.  Once all questions are answered, the "Submit" button will become active. Click it to view your results.
5.  On the results page, you can choose to restart the quiz or return to the start page.

### 3. Creating a Quiz

#### A. Generate Quiz with AI (Recommended for quick creation)
1.  From the start page, click on the "Create Quiz" button.
2.  In the "Generate Quiz with AI" section, click the "Copy Prompt" button.
3.  Paste the copied prompt into your preferred AI chat model (e.g., Gemini, ChatGPT).
4.  Replace the placeholders `[Your Topic Here]` and `[Number of Questions]` with your desired quiz topic and number of questions.
5.  The AI will generate a quiz in JSON format. Copy this JSON output.
6.  Return to the application's start page and use the "Upload Quiz JSON" option to load your AI-generated quiz.

#### B. Create Quiz Manually
1.  From the start page, click on the "Create Quiz" button.
2.  Expand the "Create Quiz Manually" section.
3.  Fill in the "Quiz Title" and "Quiz Description".
4.  Use the "Add Question" button to add new questions. For each question, you can add a title, description, and an optional image URL.
5.  For each question, use the "Add Answer" button to add answers. For each answer, provide text, an optional image URL, and mark if it's the correct answer.
6.  Once you've finished creating your quiz, click the "Download JSON" button to save your quiz as a `.json` file. You can then upload this file on the start page to play your quiz.

### 4. Image Handling
*   If an image link provided for a question or answer is broken or invalid, the image will not be displayed.
*   Questions with broken image links will have a small warning icon (an exclamation triangle) next to their title to indicate the issue.
