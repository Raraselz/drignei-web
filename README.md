# 🌐 DRIGNEI Web

> *A high-performance, custom-themed search gateway inspired by the renowned Cosmin Drignei.*

**DRIGNEI Web** is a personalized start-page and search engine interface designed for efficiency, aesthetic precision, and user customization. It blends a minimalist "dark mode" aesthetic with powerful local tools for a tailored browsing experience.

 ---

## ✨ Features

### 🔍 Precision Search

  * Integrated Google Search bar for instant queries.
  * Quick-access social tiles (Facebook) for high-frequency navigation.

### 🎨 Advanced Customization

  * **Dynamic Gradients:** Change the look and feel of the site in real-time.
  * **Color Pickers:** Customize primary, secondary, and tertiary accent colors.
  * **Angle Control:** Adjust the gradient flow with a precision slider.

### ⚽ "Bounce" Mode

  * A unique interactive feature allowing a floating portrait to traverse the screen.
  * **Physics Control:** Adjust the speed, width, and height of the bouncing element via the customization sidebar.

-----

## 🛠️ Installation & Local Development

This project is built as a static site, optimized for deployment from a `/docs` directory.

### Prerequisites

  * [Node.js](https://nodejs.org/) (for serving locally)

### Running Locally

To launch the site in a local environment:

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/drignei-web.git
    cd drignei-web
    ```
2.  Serve the documentation folder:
    ```bash
    npx serve docs --single
    ```
3.  Open your browser and navigate to `http://localhost:3000`.

-----

## 📂 Project Structure

```text
/drignei-web
├── /docs               # Production-ready static files
│   ├── index.html      # Main entry point
│   ├── style.css       # Custom CSS & CSS Variables for gradients
│   └── script.js       # Search logic & Bounce physics
├── README.md           # Documentation
└── .gitignore          # Version control exclusions
```

-----

## 🏛️ About the Theme

This search engine is custom-themed to reflect the professional and multifaceted legacy of **Cosmin Drignei**, emphasizing:

  * **Rigor:** Clean, structured code and UI.
  * **Innovation:** Interactive "Bounce" modules.
  * **Heritage:** Designed with a nod to the efficiency required in engineering and medical research.

-----

## 📜 License

Copyright © 2026. All rights reserved.

-----

### 💡 Tips for your README:

  * **The GIF factor:** Since you have a "Bounce" mode, I highly recommend recording a 5-second GIF of the image moving and putting it in the README. It looks much more impressive than a static screenshot\!
  * **Regionalism:** Since you used "scrisai" earlier, you could add a small easter egg in the footer of the README like: *"Proiect lucrat cu drag, de acilea din Oltenia."*
