# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Setup Guide:
This guide explains how to set up and run a Flask application using a requirements.txt file

Prerequisites
Ensure you have Python installed (preferably Python 3.8+). Check using:

python --version
or

python3 --version
If Python is not installed, download and install it from python.org.

__________________________________________________________________________________________________________________________________________________________________

1. Create a Virtual Environment (Recommended)
Navigate to your project directory and create a virtual environment:

cd /path/to/your/project
python -m venv venv

Activate the virtual environment:

Windows (Command Prompt)
venv\Scripts\activate

Windows (PowerShell)
venv\Scripts\Activate.ps1

Mac/Linux
source venv/bin/activate

__________________________________________________________________________________________________________________________________________________________________

2. Install Dependencies
Once the virtual environment is active, install all required dependencies:

pip install -r requirements.txt
__________________________________________________________________________________________________________________________________________________________________

3. Run the Flask App
Start the Flask development server:

python app.py

_________________________________________________________________________________________________________________________________________________________________________

4. Additional Information
Ensure requirements.txt is up to date by running:
pip freeze > requirements.txt
To install additional dependencies, use:
pip install package_name
______________________________________________________________________________________________________________________________________________________________________________

5. Run the Vite + React project

open terminal of vs code 
or
ctrl + shift + ~

npm run dev
_________________________________________________________________________________________________________________________________________________________________________

