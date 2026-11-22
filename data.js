/*
  ALL SITE CONTENT LIVES HERE.
  To add a project: copy an object in `projects`, change the fields, save.
  To add a timeline entry: copy an object in `timeline`, save.
  Dates use "YYYY-MM" so entries sort correctly.

  project.kind: research | study | hackathon | workshop | app | learning | teaching
    research  = built around a specific research question
    study     = applied ML study on a public dataset
*/
window.SITE = {
  links: {
    github: "https://github.com/SobiaNoorAI",
    linkedin: "https://www.linkedin.com/in/sobianoorai/",
    youtube: "https://www.youtube.com/@DrSobiaNoor"
  },

  /* status: "projects" = has projects below, "exploring" = building toward it */
  domains: [
    { id: "med", name: "Medical Imaging & Biomedical AI", primary: true, status: "projects",
      blurb: "Foundation-model features, robustness, and prediction on clinical, histology and genomic data." },
    { id: "security", name: "Robust ML & Cybersecurity", status: "projects",
      blurb: "Intrusion, deepfake and malware detection." },
    { id: "cv", name: "Computer Vision", status: "projects",
      blurb: "Image and live-camera understanding." },
    { id: "nlp", name: "NLP & LLM Agents", status: "projects",
      blurb: "Text classification, LLM applications and multi-agent systems." },
    { id: "ml", name: "Machine Learning & Data Science", status: "projects",
      blurb: "Classical ML, clustering, prediction and analytics on tabular data." },
    { id: "teaching", name: "Teaching & Workshops", status: "projects",
      blurb: "Material I built to teach programming and security concepts." }
  ],

  projects: [
    /* ---------- Medical imaging & healthcare AI ---------- */
    {
      title: "Chest X-ray Foundation-Model Shift Robustness",
      domain: "med", kind: "research", featured: true,
      summary: "Tests how well chest X-ray foundation-model features for tuberculosis screening hold up across hospitals (Shenzhen to Montgomery), under image corruption, and in their uncertainty estimates.",
      data: "Shenzhen and Montgomery chest X-ray sets",
      tags: ["Foundation models", "Distribution shift", "Robustness", "Uncertainty", "Chest X-ray"],
      url: "https://github.com/SobiaNoorAI/cxr-foundation-model-shift-robustness"
    },
    {
      title: "Histology to Gene Expression Probe",
      domain: "med", kind: "research", featured: true,
      summary: "Uses frozen foundation-model features from H&E histology images to predict spatial gene expression, evaluated on held-out patients.",
      data: "HEST-1k",
      tags: ["Foundation models", "Histology", "Spatial gene expression", "Held-out patients"],
      url: "https://github.com/SobiaNoorAI/histology-to-expression-probe"
    },
    {
      title: "BFB Candidate Generator",
      domain: "med", kind: "prototype",
      summary: "Python prototype that enumerates every breakage-fusion-bridge (BFB) cycle sequence able to explain a genomic copy-number pattern and ranks them by fit. It gives a ranked set of explanations instead of the single consensus sequence that ILP-based tools such as BFBArchitect output. Pure Python, tested on small example patterns.",
      tags: ["Genomics", "Copy number", "BFB", "Sequence enumeration"],
      url: "https://github.com/SobiaNoorAI/bfb-multi-candidate"
    },
    {
      title: "Breast Cancer Detection with Artificial Neural Networks",
      domain: "med", kind: "study",
      summary: "End-to-end diagnostic classifier that uses an artificial neural network to label breast tumours as malignant or benign.",
      data: "Breast Cancer Wisconsin (Diagnostic)",
      tags: ["Deep learning", "Keras", "Scikit-learn", "Seaborn"],
      url: "https://github.com/SobiaNoorAI/Breast-Cancer-Detection-Using-Artificial-Neural-Networks"
    },
    {
      title: "COVID-19 Mortality Risk Prediction",
      domain: "med", kind: "study",
      summary: "Predicts COVID-19 mortality from clinical and demographic data. Corrects heavy class imbalance with random undersampling to improve sensitivity to deaths, and compares logistic regression with random forest.",
      data: "Public clinical dataset from Kaggle",
      result: "Balanced logistic regression reached accuracy 0.85, with F1 0.85 for death and 0.84 for survival.",
      tags: ["Class imbalance", "Undersampling", "Logistic regression", "Random forest"],
      url: "https://github.com/SobiaNoorAI/Covid-19-ML-Prediction"
    },

    /* ---------- Robust ML & cybersecurity ---------- */
    {
      title: "Why Intrusion Detectors Fail on New Networks",
      domain: "security", kind: "research", featured: true,
      summary: "Studies cross-network generalisation of machine-learning intrusion detection with XGBoost. Asks how much performance drops on an unseen network, whether per-network normalisation or removing the most-shifted features helps, how many labelled flows are needed to recover, and which features each model relies on. Includes a Colab notebook, a short report and a Streamlit demo.",
      data: "UNSW-NB15 and ToN-IoT (NetFlow v2, 43 shared features)",
      result: "Within-network F1 was 0.96 to 0.995, but dropped to about 0.02 when trained on one network and tested on the other. About 25 labelled attacks from the new network raised F1 to roughly 0.83 to 0.86, and 100 raised it to roughly 0.94 to 0.95 (mean of 5 seeds).",
      note: "Random splits probably make same-network scores optimistic. Two datasets, one model family, and mostly single runs.",
      tags: ["Intrusion detection", "Distribution shift", "XGBoost", "SHAP", "Streamlit"],
      url: "https://github.com/SobiaNoorAI/cross-network-nids"
    },
    {
      title: "Deepfake Detection in the Frequency Domain",
      domain: "security", kind: "prototype",
      summary: "Dual-branch deepfake detector that combines a spatial branch (EfficientNet-B0) with a frequency branch built on DCT features, aimed at artefacts that generation and re-compression leave in the frequency domain. Uses Grad-CAM for explanations.",
      tags: ["Deepfake detection", "DCT", "EfficientNet", "Grad-CAM", "Explainability"],
      url: "https://github.com/SobiaNoorAI/Deepfake-Detection-Frequency-Domain"
    },
    {
      title: "HPC Malware Detection Demo",
      domain: "security", kind: "workshop",
      summary: "Shows how hardware performance counters (HPC) can reveal malware by analysing system behaviour patterns. Built for a workshop at iCodeGuru.",
      tags: ["Malware detection", "Hardware performance counters", "System behaviour"],
      url: "https://github.com/SobiaNoorAI/hpc-malware-detection-demo"
    },

    /* ---------- Computer vision ---------- */
    {
      title: "OpenCV Mastery Roadmap",
      domain: "cv", kind: "learning",
      summary: "A 24-hour roadmap to computer vision covering OpenCV fundamentals, image processing and more than five projects, including face detection, a virtual painter, a document scanner and finger-counting gesture recognition from images and a live camera.",
      tags: ["Python", "OpenCV", "Gesture recognition"],
      url: "https://github.com/SobiaNoorAI/OpenCV-Mastery-Roadmap"
    },
    {
      title: "GreenSekho",
      domain: "cv", kind: "app",
      summary: "AI app built with Google AI Studio and Gemini that identifies regional plants from images, gives local names and medicinal uses, and helps agriculture students in the field.",
      tags: ["Computer vision", "Gemini", "Google AI Studio", "Agriculture"],
      url: "https://github.com/SobiaNoorAI/GreenSekho"
    },

    /* ---------- NLP & LLM agents ---------- */
    {
      title: "CrowdSeed AI",
      domain: "nlp", kind: "hackathon", featured: true,
      summary: "Simulation platform that asks whether LLM agents show the social benefit seen in human crowds: agents that can see and build on peers' robot designs versus agents working alone. Social agents scored higher on a design-quality factor (p = 0.0002). Built for the AI Infra Summit hackathon on Lablab.ai.",
      tags: ["Multi-agent systems", "LLM agents", "Pymunk", "Streamlit", "SVD"],
      url: "https://github.com/SobiaNoorAI/crowdseed-ai"
    },
    {
      title: "Aegis Agent",
      domain: "nlp", kind: "hackathon", featured: true,
      summary: "Multi-agent platform for automated investment analysis and risk assessment, with four specialised agents (planner, analyst, reviewer, finalizer) and real-time display of their reasoning chains. My role: Prompt Engineer, in a team of four at the Band of Agents hackathon on Lablab.ai. This repository is my fork of the team repository.",
      tags: ["Multi-agent systems", "Prompt engineering", "FastAPI", "Next.js", "WebSockets"],
      url: "https://github.com/SobiaNoorAI/Aegis-Agent"
    },
    {
      title: "Travelry",
      domain: "nlp", kind: "hackathon",
      summary: "Conversational travel planning and booking platform that gives personalised, chat-based recommendations to reduce information overload. My role: API integration. Built at the Raise Your Hack hackathon on Lablab.ai (Jul 2025) using Llama 3.2, Groq, Snowflake and ElevenLabs.",
      tags: ["LLMs", "Llama 3.2", "Groq", "Snowflake", "ElevenLabs", "API integration"]
    },
    {
      title: "Fake News Detection",
      domain: "nlp", kind: "study",
      summary: "Compares five classifiers (Naive Bayes, logistic regression, XGBoost, SVM and random forest) on TF-IDF features for detecting fake news, after lemmatisation and stop-word removal.",
      data: "Hugging Face fake-news-detection dataset (English)",
      tags: ["NLP", "TF-IDF", "XGBoost", "SVM", "Lemmatisation"],
      url: "https://github.com/SobiaNoorAI/Fake-News-Detection-ML-capstone-project"
    },
    {
      title: "Sentiment Analysis of IMDb Movie Reviews",
      domain: "nlp", kind: "study",
      summary: "Sentiment classifier for movie reviews using text cleaning, Porter stemming, TF-IDF features and Multinomial Naive Bayes.",
      data: "IMDb, 50,000 labelled reviews",
      result: "85% accuracy (precision 0.84, recall 0.86) on an 80/20 split.",
      tags: ["NLP", "TF-IDF", "Naive Bayes", "NLTK"],
      url: "https://github.com/SobiaNoorAI/Sentiment-Analysis-on-IMDB-Movie-Reviews"
    },

    /* ---------- Machine learning & data science ---------- */
    {
      title: "Wholesale Customer Segmentation and Spending Behavior Analysis",
      domain: "ml", kind: "study",
      summary: "Segments wholesale customers with K-Means and PCA, with outlier handling, scaling and profiling of each segment. Also trains a logistic regression model to predict the customer channel.",
      data: "UCI Wholesale Customers",
      result: "Three segments (silhouette score 0.31). Channel prediction reached 92% accuracy.",
      tags: ["Unsupervised learning", "K-Means", "PCA", "Logistic regression"],
      url: "https://github.com/SobiaNoorAI/Wholesale-Customer-Segmentation-and-Spending-Behavior-Analysis-By-ML"
    },
    {
      title: "E-Commerce Customer Churn Prediction",
      domain: "ml", kind: "study",
      summary: "Full-stack churn analysis and prediction project using SQL, machine learning, NLP, Power BI and Apache Airflow.",
      tags: ["Churn prediction", "SQL", "Airflow", "Power BI"],
      url: "https://github.com/SobiaNoorAI/E-Commerce-Customer-Churn-Prediction"
    },
    {
      title: "Car Purchasing Prediction",
      domain: "ml", kind: "study",
      summary: "Logistic regression model that predicts car-purchase intent from age and estimated salary, with feature scaling and confusion-matrix analysis.",
      result: "82.5% accuracy on a 120-sample test set.",
      tags: ["Logistic regression", "Feature scaling", "Classification"],
      url: "https://github.com/SobiaNoorAI/Car-Purchasing-Prediction-Machine-Learning-Model"
    },
    {
      title: "E-Commerce Sales Analysis with SQL and Python",
      domain: "ml", kind: "study",
      summary: "Pipeline that loads sales data into SQLite, queries monthly, regional and segment revenue with SQL, cleans data with Pandas, and derives revenue per product and customer lifetime value.",
      tags: ["SQL", "Pandas", "Matplotlib", "Seaborn"],
      url: "https://github.com/SobiaNoorAI/E-commerce-Sales-Analysis-with-SQL-Pandas-Matplotlib-Seaborn"
    },
    {
      title: "E-Commerce Dashboard (Power BI)",
      domain: "ml", kind: "study",
      summary: "Interactive Power BI dashboard with data integration, modelling and drill-down analytics on revenue growth, regional performance and the effect of discounts on profit.",
      tags: ["Power BI", "DAX", "Data modelling"],
      url: "https://github.com/SobiaNoorAI/E-commerce-Dashboard-Project-Using-Power-BI"
    },

    /* ---------- Teaching ---------- */
    {
      title: "Web Development Bootcamp 2026",
      domain: "teaching", kind: "teaching",
      summary: "Official repository for the iCodeGuru Web Development Bootcamp: an 8-week programme on HTML5, CSS3, JavaScript, PHP and WordPress with practical projects and session resources.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
      url: "https://github.com/SobiaNoorAI/Web-Development-BootCamp-2026"
    },
    {
      title: "OOP Fundamentals with a Stanford Course Management System",
      domain: "teaching", kind: "teaching",
      summary: "Workshop material that teaches object-oriented programming by building a simplified course management system.",
      tags: ["OOP", "Workshop"],
      url: "https://github.com/SobiaNoorAI/SobiaNoor-Workshops/tree/main/workshop-01-oop-fundamentals-with-Stanford-CMS"
    }
  ],

  /* type: education | work | teaching | hackathon | workshop | milestone */
  timeline: [
    { start: "2018-04", when: "Apr 2018", type: "education",
      title: "Began Bachelor of Information Technology",
      org: "Institute of Southern Punjab, Multan",
      text: "Coursework included data structures and algorithms, operating systems, database systems, discrete structures, HCI and knowledge-based systems." },
    { start: "2022-09", when: "Sep 2022", type: "education",
      title: "Completed Bachelor of Information Technology",
      org: "Institute of Southern Punjab, Multan",
      text: "Graduated with a CGPA of 3.21 / 4.00." },
    { start: "2024-08", when: "Aug – Nov 2024", type: "milestone",
      title: "Self-directed learning in AI and data science",
      org: "FutureLearn, HP LIFE, Kaggle",
      text: "Completed certificates in How to Get Into AI, Data Science & Analytics, How to Get Into Robotics and Pandas." },
    { start: "2024-09", when: "Sep 2024 – Sep 2025", type: "work",
      title: "Data Science Fellow",
      org: "Data Seekho (remote)",
      text: "Analysed datasets with Python, SQL and PySpark through live projects, built models including IMDb sentiment analysis and K-Means customer clustering, and presented findings to non-technical audiences." },
    { start: "2024-12", when: "Dec 2024 – Jan 2025", type: "milestone",
      title: "Data Seekho masterclass and webinars",
      org: "Data Seekho",
      text: "Took part in a LinkedIn masterclass and in webinars on data analysis, AI, and ChatGPT and transformers." },
    { start: "2025-07", when: "4–8 Jul 2025", type: "hackathon",
      title: "Raise Your Hack: Travelry",
      org: "Lablab.ai",
      text: "Worked on API integration for Travelry, an LLM-based conversational travel planning and booking platform built on Llama 3.2, Groq, Snowflake and ElevenLabs." },
    { start: "2025-09", when: "Sep 2025 – Feb 2026", type: "teaching",
      title: "IELTS Trainer",
      org: "iCodeGuru",
      text: "Taught IELTS to 50+ underprivileged students through structured lessons and interactive online sessions." },
    { start: "2025-10", when: "15 Oct 2025", type: "milestone",
      title: "IELTS Academic (retake)",
      org: "IELTS",
      text: "Overall band 7: listening 8.5, reading 6.5, writing 6.0, speaking 6.5." },
    { start: "2026-02", when: "Feb 2026", type: "hackathon",
      title: "Accepted to the 4th Global AI Hackathon",
      org: "Hack-Nation, with MIT Sloan AI Club",
      text: "Accepted to the 7–8 Feb hackathon, supported by OpenAI." },
    { start: "2026-02", when: "Feb 2026 – Jul 2026", type: "teaching",
      title: "Web Development Trainer",
      org: "iCodeGuru",
      text: "Trained and mentored 100+ students in HTML, CSS, JavaScript, PHP and WordPress through roadblock sessions, code reviews and project work." },
    { start: "2026-04", when: "11 Apr 2026", type: "milestone",
      title: "CS50x Puzzle Day (Harvard)",
      org: "CS50, Harvard University",
      text: "Solved 10 of 10 puzzles in an online collaborative puzzle event." },
    { start: "2026-06", when: "12–19 Jun 2026", type: "hackathon",
      title: "Band of Agents: Aegis Agent",
      org: "Lablab.ai",
      text: "Prompt Engineer in a team of four building a multi-agent platform for automated investment analysis and risk assessment." },
    { start: "2026-07", when: "Jul 2026", type: "workshop",
      title: "Workshops: OOP Fundamentals and HPC Malware Detection",
      org: "iCodeGuru",
      text: "Designed and taught two workshops, one on object-oriented programming and one on hardware-performance-counter malware detection." },
    { start: "2026-07", when: "Jul 2026 – Present", type: "teaching",
      title: "Data Structures & Algorithms Trainer",
      org: "iCodeGuru",
      text: "Teaching sorting, searching, trees, graphs and complexity analysis to 50+ students." },
    { start: "2026-09", when: "10–16 Sep 2026", type: "hackathon",
      title: "AI Infra Summit hackathon: CrowdSeed AI",
      org: "Lablab.ai",
      text: "Built a simulation platform that compares social and independent LLM agents designing robots." },
    { start: "2026-09", when: "Sep 2026", type: "milestone",
      title: "Completed the 2026 Aspire Leaders Program",
      org: "Aspire Institute",
      text: "40 hours of coursework on critical thinking, communication and positive social impact." },
    { start: "2026-11", when: "9 Nov 2026", type: "competition",
      title: "CALICO programming contest",
      org: "CALICO",
      text: "Competed in an online contest of data-structures-and-algorithms problems and solved 2 of 11 problems." }
  ],

  skills: [
    ["Programming", "Python, SQL, JavaScript, HTML, CSS, PHP"],
    ["Data science & ML", "Pandas, Scikit-learn, XGBoost, Keras, NLTK, OpenCV, Matplotlib, Seaborn"],
    ["Methods", "Classification, clustering (K-Means, PCA), class-imbalance handling, TF-IDF, foundation-model feature probing"],
    ["LLMs & agents", "Multi-agent systems, prompt engineering, FastAPI, Next.js, WebSockets, Streamlit"],
    ["Data & BI", "SQL, SQLite, Power BI, Excel, DAX, Apache Airflow"],
    ["Tools", "Git, GitHub, Google Colab, Jupyter, VS Code"]
  ],

  milestones: [
    "Solved 10/10 puzzles at CS50x Puzzle Day (Harvard, 11 Apr 2026)",
    "Completed the 2026 Aspire Leaders Program (40 hours)",
    "IELTS Academic, 15 Oct 2025: overall band 7 (listening 8.5, reading 6.5, writing 6.0, speaking 6.5)",
    "Six international AI hackathons, including Raise Your Hack, Band of Agents and the AI Infra Summit hackathon on Lablab.ai",
    "Certificates: Pandas (Kaggle), Data Science & Analytics (HP LIFE), How to Get Into AI and How to Get Into Robotics (FutureLearn)"
  ]
};
