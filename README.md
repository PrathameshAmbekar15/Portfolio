# Portfolio Project

A personal portfolio website built with Node.js, Express, and EJS.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [VS Code](https://code.visualstudio.com/) (recommended).

## How to Run

1.  **Open the Project**:
    - Open VS Code.
    - Go to **File > Open Folder** and select the `portfolio` folder.

2.  **Install Dependencies** (First time only):
    - Open the Integrated Terminal (`Ctrl + ~` or `Terminal > New Terminal`).
    - Run the following command:
        ```bash
        npm install
        ```

3.  **Configure Environment**:
    - Create a file named `.env` in the root folder (if it doesn't exist).
    - Add your configuration (see `.env.example` or below):
        ```ini
        PORT=3000
        EMAIL_USER=your_email@gmail.com
        EMAIL_PASS=your_app_password
        ```
    - *Note: For Gmail, use an [App Password](https://myaccount.google.com/apppasswords), not your login password.*

4.  **Start the Server**:
    - In the terminal, run:
        ```bash
        npm start
        ```
    - You should see: `Server running on port 3000`

5.  **View the Site**:
    - Open your browser and go to: [http://localhost:3000](http://localhost:3000)

## Features
- **Project Showcase**: Display your projects.
- **Skills Filter**: Interactive filtering for technical skills.
- **Contact Form**: Functional email form using Nodemailer.
- **Animations**: Smooth animations using GSAP.
