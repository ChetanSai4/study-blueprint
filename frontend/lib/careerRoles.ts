import { CareerRole } from '@/types';

export const DEFAULT_CAREER_ROLES: CareerRole[] = [
  {
    id: 'role_cse',
    role_code: 'full_stack_dev',
    title: 'Computer Science (CSE) — Full Stack & Cloud Software Engineer',
    branch_codes: ['cse', 'aiml', 'cme'],
    summary: 'Engineers responsive frontend user interfaces, robust backend APIs, distributed microservices, and scalable cloud applications.',
    core_skills: ['Data Structures & Algorithms', 'RESTful & GraphQL APIs', 'Relational & NoSQL Database Design', 'Microservices Architecture', 'CI/CD & Cloud Deployment'],
    programming_languages: ['Java', 'Python', 'TypeScript / JavaScript', 'C++', 'SQL'],
    frameworks_and_tools: ['Next.js / React', 'FastAPI / Spring Boot', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'Git'],
    learning_roadmap: [
      { phase: 1, title: 'Core Foundations & DSA (Months 1–2)', topics: ['C / C++ & Java Basics', 'Data Structures (Trees, Graphs, DP)', 'Git & Linux CLI'], recommended_duration_weeks: 8 },
      { phase: 2, title: 'Backend & Database Architecture (Months 3–4)', topics: ['FastAPI / Node.js API Design', 'MongoDB & PostgreSQL Indexing', 'JWT Authentication & Security'], recommended_duration_weeks: 8 },
      { phase: 3, title: 'Cloud Infrastructure & Capstones (Months 5–6)', topics: ['Next.js App Router', 'Docker Containers', 'AWS Deployment', 'System Design'], recommended_duration_weeks: 8 }
    ],
    projects: [
      { tier: 'beginner', title: 'Personal Academic Tracker', description: 'CRUD web app with local storage persistence and priority filtering.', suggested_tech_stack: ['HTML', 'Tailwind CSS', 'JavaScript'] },
      { tier: 'intermediate', title: 'College Resource & Question Bank Portal', description: 'Full-stack document management system with role-based uploads and instant search.', suggested_tech_stack: ['Next.js', 'FastAPI', 'MongoDB'] },
      { tier: 'advanced_capstone', title: 'Real-Time Examination Simulator', description: 'Multi-tenant exam platform featuring live automated grading and audit logging.', suggested_tech_stack: ['Next.js', 'FastAPI', 'MongoDB', 'Docker', 'WebSockets'] }
    ],
    internship_preparation_checklist: [
      'Solve 150+ DSA problems on LeetCode/HackerRank',
      'Deploy 2 live full-stack projects on Vercel/Render with public GitHub links',
      'Master Core CS fundamentals: DBMS, Operating Systems, Computer Networks'
    ],
    certifications: ['AWS Certified Cloud Practitioner', 'Meta Full-Stack Professional Certificate']
  },
  {
    id: 'role_aiml',
    role_code: 'ai_ml_engineer',
    title: 'AI & Data Science (AI/ML) — Machine Learning & LLM Engineer',
    branch_codes: ['aiml', 'cse'],
    summary: 'Develops predictive machine learning models, computer vision pipelines, neural network architectures, and generative AI systems.',
    core_skills: ['Linear Algebra & Probability', 'Feature Engineering', 'Deep Learning & Neural Networks', 'Large Language Models (LLMs)', 'Model Deployment & MLOps'],
    programming_languages: ['Python', 'SQL', 'C++'],
    frameworks_and_tools: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'FastAPI', 'Hugging Face', 'Docker'],
    learning_roadmap: [
      { phase: 1, title: 'Mathematical Foundations (Weeks 1–6)', topics: ['Linear Algebra & Matrices', 'Multivariate Calculus', 'Probability & Statistics'], recommended_duration_weeks: 6 },
      { phase: 2, title: 'Machine Learning Algorithms (Weeks 7–14)', topics: ['Regression & Classification', 'Decision Trees & Ensembles', 'scikit-learn & Model Validation'], recommended_duration_weeks: 8 },
      { phase: 3, title: 'Deep Learning & MLOps (Weeks 15–24)', topics: ['CNNs & Transformers', 'PyTorch Model Training', 'ONNX & FastAPI Model Serving'], recommended_duration_weeks: 10 }
    ],
    projects: [
      { tier: 'beginner', title: 'Student Semester Grade Predictor', description: 'Regression model forecasting semester GPA based on study habits and past scores.', suggested_tech_stack: ['Python', 'scikit-learn', 'Streamlit'] },
      { tier: 'intermediate', title: 'AI Document Categorizer for Syllabi', description: 'NLP text classifier sorting university question papers into academic units.', suggested_tech_stack: ['PyTorch', 'FastAPI', 'Hugging Face'] },
      { tier: 'advanced_capstone', title: 'Production ML Serving & Drift Detection', description: 'End-to-end model pipeline with automated data drift alerts and containerized inference.', suggested_tech_stack: ['PyTorch', 'FastAPI', 'Docker', 'Prometheus'] }
    ],
    internship_preparation_checklist: [
      'Master NumPy and Pandas vectorization for clean data pipelines',
      'Explain backpropagation, vanishing gradients, and transformer attention mechanisms',
      'Host a live machine learning model demonstration on Hugging Face Spaces'
    ],
    certifications: ['DeepLearning.AI Machine Learning Specialization', 'TensorFlow Developer Certificate']
  },
  {
    id: 'role_ece',
    role_code: 'ece_vlsi_embedded',
    title: 'Electronics & Comm (ECE) — VLSI Design & Embedded Systems Engineer',
    branch_codes: ['ece', 'dece'],
    summary: 'Designs high-speed microchips, FPGA hardware architectures, microcontroller firmware, and wireless 5G communication systems.',
    core_skills: ['Verilog / VHDL RTL Design', 'Digital Signal Processing (DSP)', 'Embedded C / RTOS Firmware', 'FPGA Architecture & Synthesis', 'RF & Wireless Systems'],
    programming_languages: ['Embedded C', 'C++', 'Verilog / SystemVerilog', 'Python', 'MATLAB'],
    frameworks_and_tools: ['Xilinx Vivado', 'Keil MicroVision', 'Cadence Virtuoso', 'MATLAB Simulink', 'STM32CubeIDE'],
    learning_roadmap: [
      { phase: 1, title: 'Electronic Devices & Circuits (Term 1)', topics: ['Semiconductor Physics & Diodes', 'BJT & MOSFET Amplifiers', 'Signals & Network Theorems', 'Embedded C Basics'], recommended_duration_weeks: 8 },
      { phase: 2, title: 'Microcontrollers & RTL Design (Term 2)', topics: ['ARM Cortex-M Architecture', 'Verilog HDL Synthesis', 'I2C, SPI & UART Protocols', 'FreeRTOS Task Scheduling'], recommended_duration_weeks: 10 },
      { phase: 3, title: 'VLSI Chip Design & GATE/PSU (Term 3)', topics: ['CMOS Digital IC Layout', 'FPGA SoC Implementation', 'Wireless Transceiver Design', 'GATE / ISRO / DRDO Prep'], recommended_duration_weeks: 10 }
    ],
    projects: [
      { tier: 'beginner', title: 'Smart Home IoT Sensor Node', description: 'Low-power environmental sensor node publishing metrics over MQTT to cloud dashboard.', suggested_tech_stack: ['Embedded C', 'ESP-IDF', 'MQTT', 'FreeRTOS'] },
      { tier: 'intermediate', title: 'FPGA Pipelined RISC Processor', description: '32-bit pipelined ALU and register file in Verilog with simulation testbench.', suggested_tech_stack: ['Verilog', 'Xilinx Vivado', 'ModelSim'] },
      { tier: 'advanced_capstone', title: 'Autonomous Drone Flight Controller', description: 'Bare-metal stabilization system fusing IMU sensor data via Kalman filter on STM32.', suggested_tech_stack: ['C', 'STM32', 'Kalman Filter', 'FreeRTOS'] }
    ],
    internship_preparation_checklist: [
      'CMOS logic gates, setup/hold times, and clock domain crossing concepts',
      'Interfacing peripherals with STM32/ESP32 via I2C, SPI, and UART',
      'GATE ECE preparation: Signals, Electronic Devices, Digital Circuits, EMFT'
    ],
    certifications: ['Arm Accredited Engineer', 'Cadence Certified Associate - Digital IC Design']
  },
  {
    id: 'role_eee',
    role_code: 'eee_power_ev',
    title: 'Electrical & Electronics (EEE) — EV & Smart Grid Engineer',
    branch_codes: ['eee', 'deee'],
    summary: 'Engineers electric vehicle drivetrains, battery management systems (BMS), high-voltage switchgear, and renewable smart power grids.',
    core_skills: ['Power Electronics & Inverters', 'Battery Management Systems (BMS)', 'Electric Motor Drives (BLDC & PMSM)', 'PLC / SCADA Automation', 'Power System Protection'],
    programming_languages: ['C', 'MATLAB / Simulink', 'Python', 'Ladder Logic (PLC)'],
    frameworks_and_tools: ['MATLAB Simulink', 'ETAP', 'PSCAD', 'Ansys Maxwell', 'Proteus', 'TIA Portal'],
    learning_roadmap: [
      { phase: 1, title: 'Electrical Machines & Circuits (Term 1)', topics: ['AC/DC Machines & Transformers', 'Electromagnetic Fields', 'Circuit Analysis & Resonance', 'MATLAB Circuit Modeling'], recommended_duration_weeks: 8 },
      { phase: 2, title: 'Power Electronics & Motor Drives (Term 2)', topics: ['DC-DC Converters & Inverters', 'BLDC Motor Control', 'Battery Chemistry & SoC Estimation', 'PLC & Relay Protection'], recommended_duration_weeks: 10 },
      { phase: 3, title: 'EV Drivetrains & Smart Grids (Term 3)', topics: ['Electric Vehicle Powertrain Simulation', 'Grid-Tied Solar Inverters', 'High-Voltage Switchgear', 'GATE / PSU Exam Prep'], recommended_duration_weeks: 10 }
    ],
    projects: [
      { tier: 'beginner', title: 'Solar Photovoltaic MPPT Controller', description: 'Microcontroller buck-boost converter implementing Perturb & Observe algorithm.', suggested_tech_stack: ['C', 'Arduino', 'MATLAB Simulink', 'Power MOSFETs'] },
      { tier: 'intermediate', title: 'Li-Ion Battery Management System (BMS)', description: 'Cell voltage monitoring, thermal runaway cutoff, and CAN-bus telemetry.', suggested_tech_stack: ['Embedded C', 'Simulink', 'CAN Bus', 'STM32'] },
      { tier: 'advanced_capstone', title: 'Field-Oriented Control (FOC) for EV Motor', description: 'Vector control inverter driving a PMSM motor with regenerative braking in EV test bench.', suggested_tech_stack: ['MATLAB Simulink', 'TI C2000 DSP', 'IGBT Gate Drivers'] }
    ],
    internship_preparation_checklist: [
      'Power electronics converter topologies and switching loss minimization',
      'Simulink models of DC-DC buck/boost converters and 3-phase inverters',
      'GATE EEE preparation: Electrical Machines, Power Systems, Power Electronics, Control Systems'
    ],
    certifications: ['Siemens Certified PLC Programmer', 'IEEE Certified EV Powertrain Specialist']
  },
  {
    id: 'role_mech',
    role_code: 'mech_cad_robotics',
    title: 'Mechanical Engineering (Mech) — CAD/CAM Design, Robotics & Thermal',
    branch_codes: ['mech', 'dme'],
    summary: 'Develops mechanical assemblies, automotive chassis, robotic manipulators, HVAC systems, and aerodynamic simulation models.',
    core_skills: ['3D Parametric CAD Modeling', 'Finite Element Analysis (FEA)', 'Computational Fluid Dynamics (CFD)', 'Thermodynamics & IC Engines', 'Robotics Kinematics & CNC Machining'],
    programming_languages: ['Python', 'MATLAB', 'G-Code / M-Code', 'C++ (ROS)'],
    frameworks_and_tools: ['SolidWorks', 'AutoCAD', 'ANSYS Workbench', 'CATIA V5', 'Fusion 360', 'ROS (Robot Operating System)'],
    learning_roadmap: [
      { phase: 1, title: 'Engineering Mechanics & Materials (Term 1)', topics: ['Statics & Dynamics', 'Stress-Strain & Mohr Circle', 'Engineering Drawing & GD&T', 'SolidWorks Parametric CAD'], recommended_duration_weeks: 8 },
      { phase: 2, title: 'Machine Design & Thermal Sciences (Term 2)', topics: ['Design of Shafts, Gears, Bearings', 'Thermodynamic Cycles & Heat Exchangers', 'Fluid Flow Fundamentals', 'FEA Structural Simulation in ANSYS'], recommended_duration_weeks: 10 },
      { phase: 3, title: 'Robotics, Automation & Advanced CFD (Term 3)', topics: ['Industrial Robotic Arm Kinematics', 'CFD Aerodynamic Drag Simulation', 'Additive Manufacturing (3D Printing)', 'GATE / PSU Exam Preparation (BHEL, IOCL, ONGC)'], recommended_duration_weeks: 10 }
    ],
    projects: [
      { tier: 'beginner', title: 'Parametric Gearbox Assembly & Stress Analysis', description: 'Multi-stage reduction gearbox designed in SolidWorks with von-Mises stress simulation.', suggested_tech_stack: ['SolidWorks', 'ANSYS Mechanical', 'GD&T Standards'] },
      { tier: 'intermediate', title: 'Automotive Disc Brake Thermal Dissipation Study', description: 'Coupled thermo-mechanical FEA analysis of slotted vs drilled ventilated brake rotors.', suggested_tech_stack: ['ANSYS Transient Thermal', 'CATIA', 'MATLAB'] },
      { tier: 'advanced_capstone', title: '6-DOF Robotic Arm with ROS Motion Planning', description: 'Custom 3D-printed manipulator arm with inverse kinematics solver and pick-and-place automation.', suggested_tech_stack: ['ROS 2', 'Python', 'Fusion 360', 'Arduino / Steppers'] }
    ],
    internship_preparation_checklist: [
      'Proficiency in SolidWorks or CATIA with assembly modeling and production drafting',
      'Hands-on understanding of manufacturing processes (lathe, milling, casting, 3D printing)',
      'FEA mesh convergence and boundary condition justification in ANSYS',
      'GATE Mechanical syllabus: Thermodynamics, Manufacturing, Theory of Machines, SOM'
    ],
    certifications: ['Certified SOLIDWORKS Associate (CSWA)', 'ANSYS Certified Associate - Structural FEA']
  },
  {
    id: 'role_civil',
    role_code: 'civil_structural_bim',
    title: 'Civil Engineering (Civil) — Structural Engineering & Smart Infrastructure',
    branch_codes: ['civil', 'dce'],
    summary: 'Plans, analyzes, and oversees construction of high-rise structures, bridges, transportation corridors, and sustainable urban infrastructure.',
    core_skills: ['Reinforced Concrete (RCC) Design', 'Steel Structure Analysis', 'Building Information Modeling (BIM)', 'Total Station & Drone Surveying', 'Geotechnical & Soil Mechanics', 'Project Scheduling'],
    programming_languages: ['Python (Civil Automation)', 'MATLAB', 'SQL'],
    frameworks_and_tools: ['AutoCAD Civil 3D', 'STAAD Pro', 'ETABS', 'Revit Structure', 'Primavera P6', 'ArcGIS'],
    learning_roadmap: [
      { phase: 1, title: 'Surveying & Structural Mechanics (Term 1)', topics: ['Total Station & Leveling Surveying', 'Shear Force & Bending Moment Diagrams', 'Fluid Mechanics & Open Channel Flow', '2D Drafting in AutoCAD'], recommended_duration_weeks: 8 },
      { phase: 2, title: 'RCC & Steel Design with Software (Term 2)', topics: ['IS 456 RCC Slab, Beam, Column Design', 'IS 800 Steel Truss Design', 'STAAD Pro & ETABS Structural Analysis', 'Soil Bearing Capacity & Footings'], recommended_duration_weeks: 10 },
      { phase: 3, title: 'BIM Coordination & Project Management (Term 3)', topics: ['3D BIM Modeling in Revit', 'Construction Scheduling in Primavera P6', 'Green Building & LEED Standards', 'GATE / SSC JE / State AEE Exam Prep'], recommended_duration_weeks: 10 }
    ],
    projects: [
      { tier: 'beginner', title: 'G+3 Residential Apartment Plan & Working Drawings', description: 'Municipal building permit architectural and structural working drawings according to local bylaws.', suggested_tech_stack: ['AutoCAD', 'IS 456 Standards', 'Excel Estimation'] },
      { tier: 'intermediate', title: 'Earthquake-Resistant Multi-Storey Frame Analysis in ETABS', description: 'Response spectrum seismic analysis of a 10-storey commercial complex according to IS 1893.', suggested_tech_stack: ['ETABS', 'IS 1893 Seismic Code', 'STAAD Pro'] },
      { tier: 'advanced_capstone', title: 'Prestressed Concrete Girder Highway Flyover Design', description: 'Complete superstructure and pier substructure analysis with geotechnical pile foundation design.', suggested_tech_stack: ['MIDAS Civil / STAAD Pro', 'Revit BIM', 'Primavera P6'] }
    ],
    internship_preparation_checklist: [
      'Ability to read and interpret complex architectural and structural reinforcement drawings',
      'Hands-on experience with Total Station instrument and concrete slump / compressive testing',
      'Certified modeling portfolio in ETABS or STAAD Pro demonstrating load combination compliance',
      'Exam mastery for SSC JE, State Irrigation / R&B Assistant Executive Engineer (AEE), and GATE Civil'
    ],
    certifications: ['Autodesk Revit Architecture / Structure Certified Professional', 'Bentley STAAD Pro Certified Associate']
  },
  {
    id: 'role_cyber',
    role_code: 'cybersecurity_cloud',
    title: 'Cybersecurity & Cloud Infrastructure Engineer',
    branch_codes: ['cse', 'aiml', 'cme'],
    summary: 'Protects digital systems against advanced threat actors, builds resilient AWS/Azure cloud architecture, and maintains 24/7 security operations.',
    core_skills: ['Network Defense & Firewalls', 'Penetration Testing & Vulnerability Assessment', 'Cloud Architecture (AWS / Azure)', 'Linux Systems Administration', 'Incident Response & SIEM'],
    programming_languages: ['Python', 'Bash Shell Scripting', 'Go', 'SQL'],
    frameworks_and_tools: ['Wireshark', 'Burp Suite', 'Kali Linux', 'Docker', 'Terraform', 'Splunk', 'AWS CloudFormation'],
    learning_roadmap: [
      { phase: 1, title: 'Networking & Linux Internals (Term 1)', topics: ['TCP/IP, DNS, Routing & Subnetting', 'Linux CLI & Administration', 'Bash Scripting & Automation', 'CompTIA Security+ Fundamentals'], recommended_duration_weeks: 8 },
      { phase: 2, title: 'Offensive & Defensive Security (Term 2)', topics: ['OWASP Top 10 Web Vulnerabilities', 'Network Sniffing with Wireshark', 'Burp Suite Web App Penetration Testing', 'Active Directory Hardening'], recommended_duration_weeks: 10 },
      { phase: 3, title: 'Cloud Security & DevSecOps (Term 3)', topics: ['AWS Well-Architected Security', 'Terraform Infrastructure as Code', 'Docker Container Hardening', 'SIEM Log Analysis & Threat Hunting'], recommended_duration_weeks: 10 }
    ],
    projects: [
      { tier: 'beginner', title: 'Automated Port Scanner & Vulnerability Auditing Script', description: 'Python multithreaded network recon tool checking open ports and comparing banners against CVE databases.', suggested_tech_stack: ['Python', 'Socket Library', 'Nmap Engine'] },
      { tier: 'intermediate', title: 'Multi-Tier Web Application Security Assessment Lab', description: 'Deliberately vulnerable test application with documented exploit walk-throughs and remediation patches.', suggested_tech_stack: ['Burp Suite', 'OWASP ZAP', 'Python', 'Docker'] },
      { tier: 'advanced_capstone', title: 'Automated Cloud SIEM & Threat Detection Pipeline', description: 'AWS CloudWatch and GuardDuty log ingestion into Wazuh / Splunk SIEM with automated incident alerts.', suggested_tech_stack: ['AWS', 'Terraform', 'Wazuh / Splunk', 'Python', 'Docker'] }
    ],
    internship_preparation_checklist: [
      'Hands-on labs on TryHackMe or HackTheBox (Top 10% ranking)',
      'Strong grasp of TLS handshakes, PKI certificates, and asymmetric cryptography',
      'Clean GitHub repository with security auditing scripts and CTF writeups',
      'Prepared for technical questions on SQLi, XSS, SSRF, and Buffer Overflows'
    ],
    certifications: ['CompTIA Security+', 'AWS Certified Solutions Architect - Associate', 'Certified Ethical Hacker (CEH)']
  }
];
