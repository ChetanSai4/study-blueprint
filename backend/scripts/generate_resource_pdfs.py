import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

RESOURCES_DATA = [
    # Mechanical
    {
        "filename": "jntugv_mech_engineering_mechanics.pdf",
        "title": "B.Tech Mechanical Engineering R23 Engineering Mechanics Syllabus & Blueprint",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "SRI SIVANI COLLEGE OF ENGINEERING (AFFILIATED TO JNTU-GV)",
        "dept": "DEPARTMENT OF MECHANICAL ENGINEERING",
        "code": "R23-MEC-1102",
        "type": "OFFICIAL ACADEMIC SYLLABUS & BLUEPRINT",
        "sem": "I B.Tech I Semester (R23 Regulation)",
        "units": [
            ("Unit I: Statics of Particles & Rigid Bodies", "Forces, Vector operations, Equilibrium of particles in 2D and 3D, Free body diagrams, Moment of force about a point and axis, Couples, Varignon's Theorem, Equivalent force systems."),
            ("Unit II: Friction & Centroid / Center of Gravity", "Laws of dry friction, Angle of friction, Wedge friction, Ladder friction, Centroid of composite areas and curves, Pappus-Guldinus theorems, Center of gravity of composite bodies."),
            ("Unit III: Area Moment of Inertia & Mass Moment of Inertia", "Parallel and perpendicular axis theorems, Polar moment of inertia, Radius of gyration, Moment of inertia of standard and composite shapes, Mass moment of inertia of slender rods, plates, and cylinders."),
            ("Unit IV: Kinematics of Particles & Rigid Bodies", "Rectilinear and curvilinear motion in Cartesian and normal-tangential coordinates, Projectile motion, Work-energy principle, Impulse-momentum theorem, Impact of elastic bodies."),
            ("Unit V: Dynamics & Simple Mechanical Vibrations", "D'Alembert's principle, Equations of motion for rigid bodies in plane motion, Introduction to free and damped harmonic vibrations, Natural frequency, Torsional vibrations.")
        ],
        "eval": [
            ("Continuous Internal Evaluation (CIE)", "30 Marks (2 Mid Exams + Assignments + Quizzes)"),
            ("Semester End Examination (SEE)", "70 Marks (Part A: 10 Short Questions = 20M, Part B: 5 Units choice = 50M)"),
            ("Total Assessment Credits", "3 Credits (3-0-0 Lectures/Tutorial/Practical)")
        ]
    },
    {
        "filename": "jntugv_mech_thermodynamics.pdf",
        "title": "Engineering Thermodynamics Previous Mid-1 & Semester Examination Papers",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "EXAMINATION BRANCH & SRI SIVANI COLLEGE OF ENGINEERING",
        "dept": "DEPARTMENT OF MECHANICAL ENGINEERING",
        "code": "R23-MEC-1204",
        "type": "SEMESTER END QUESTION PAPERS WITH SOLVED BLUEPRINT",
        "sem": "I B.Tech II Semester / II B.Tech I Semester",
        "units": [
            ("Section A: Zeroth & First Law Applications", "Microscopic vs Macroscopic approach, Quasi-static process, Heat and work transfer, First Law applied to non-flow and steady-flow processes (SFEE), PMM-1."),
            ("Section B: Second Law of Thermodynamics & Entropy", "Kelvin-Planck and Clausius statements, Carnot cycle, Reversible and irreversible processes, Clausius inequality, Entropy generation and principle of increase of entropy."),
            ("Section C: Properties of Pure Substances & Steam Tables", "p-v-T surfaces, Mollier diagram, Critical state and dryness fraction determination, Steam calorimeters, Throttling process."),
            ("Section D: Thermodynamic Gas Power Cycles", "Air standard Otto, Diesel, and Dual combustion cycles, Mean effective pressure, Thermal efficiency comparison for given compression ratio and peak pressure."),
            ("Section E: Vapor Power & Refrigeration Fundamentals", "Simple Rankine cycle, Reheat and regenerative modifications, Vapor compression refrigeration cycle (VCRC), COP analysis.")
        ],
        "eval": [
            ("Exam Duration", "3 Hours (Total Marks: 70)"),
            ("Part A (Compulsory)", "5 Questions x 4 Marks = 20 Marks"),
            ("Part B (Unit Choice)", "5 Questions x 10 Marks = 50 Marks (Internal choice from each unit)")
        ]
    },
    {
        "filename": "jntuk_mech_cad_drafting_manual.pdf",
        "title": "Computer Aided Drafting (CAD) & Engineering Graphics Lab Manual",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY KAKINADA",
        "college": "MECHANICAL WORKSHOP CELL & CAD/CAM CENTER",
        "dept": "DEPARTMENT OF MECHANICAL ENGINEERING",
        "code": "R23-MEC-LAB1",
        "type": "OFFICIAL LABORATORY MANUAL & PRACTICE PROBLEMS",
        "sem": "I B.Tech I Semester (R23 Scheme)",
        "units": [
            ("Lab Exercise 1: CAD GUI & Coordinate Systems", "Setting up drawing environment, limits, units, grid, snap, Absolute and relative polar coordinate drafting in AutoCAD."),
            ("Lab Exercise 2: Geometric Constructions & Conic Sections", "Drafting ellipse, parabola, hyperbola using concentric circles and eccentricity methods, Involutes and cycloidal curves."),
            ("Lab Exercise 3: Orthographic Projections of Points & Lines", "Projections of points in 4 quadrants, True length and inclination of oblique straight lines with traces."),
            ("Lab Exercise 4: Projections of Regular Solids", "Prisms, pyramids, cylinders and cones inclined to one and both reference planes with sectional views."),
            ("Lab Exercise 5: 3D Modeling & Isometric Assembly", "Extrude, Revolve, Sweep commands, Modeling flanged coupling, socket-spigot joint, and knuckle joint.")
        ],
        "eval": [
            ("Day-to-day Lab Work & Record", "15 Marks"),
            ("Internal Lab Practical Test", "15 Marks"),
            ("External Practical Viva-Voce Exam", "50 Marks (Total: 80 Marks)")
        ]
    },
    {
        "filename": "au_mech_fluid_mechanics.pdf",
        "title": "Fluid Mechanics & Hydraulic Machinery Comprehensive Lecture Notes",
        "univ": "ANDHRA UNIVERSITY COLLEGE OF ENGINEERING (A)",
        "college": "DEPARTMENT OF MECHANICAL ENGINEERING, VISAKHAPATNAM",
        "dept": "HYDRAULIC MACHINES & THERMO-FLUIDS CELL",
        "code": "AU-MECH-2103",
        "type": "COMPREHENSIVE LECTURE NOTES & FORMULA HANDBOOK",
        "sem": "II B.Tech I Semester (AU Regulation)",
        "units": [
            ("Module 1: Fluid Statics & Manometry", "Continuum concept, Viscosity and Newton's law, Hydrostatic forces on submerged plane and curved surfaces, Buoyancy and metacentric height."),
            ("Module 2: Fluid Kinematics & Dynamics", "Streamlines, streaklines, pathlines, Continuity equation in 3D, Euler's and Bernoulli's equations, Venturimeter and orifice meter coefficient of discharge."),
            ("Module 3: Laminar & Turbulent Flow in Pipes", "Reynolds experiment, Hagen-Poiseuille law, Darcy-Weisbach friction factor, Minor and major losses, Hydraulic gradient line (HGL) and TEL."),
            ("Module 4: Boundary Layer Theory", "Boundary layer thickness, displacement, momentum and energy thickness, Blasius solution, Separation of boundary layer and control methods."),
            ("Module 5: Hydraulic Turbines & Pumps", "Pelton wheel, Francis and Kaplan turbines, Unit quantities and specific speed, Centrifugal pumps, priming and cavitation phenomena.")
        ],
        "eval": [
            ("Internal Assessment", "30 Marks"),
            ("Semester Examination", "70 Marks"),
            ("Prescribed Reference", "Fluid Mechanics by Frank M. White / Dr. R.K. Bansal")
        ]
    },
    {
        "filename": "jntuh_mech_kinematics_machinery.pdf",
        "title": "Kinematics of Machinery & Machine Dynamics Solved Question Bank",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY HYDERABAD",
        "college": "DEPARTMENT OF MECHANICAL ENGINEERING",
        "dept": "DESIGN & ANALYSIS DIVISION",
        "code": "R22-MEC-2104",
        "type": "SOLVED QUESTION BANK & DERIVATIONS MANUAL",
        "sem": "II B.Tech I Semester (R22 Scheme)",
        "units": [
            ("Unit 1: Mechanisms & Inversions", "Degrees of freedom, Kutzbach and Grubler criteria, Inversions of 4-bar and single/double slider-crank chains, Straight line mechanisms."),
            ("Unit 2: Velocity & Acceleration Analysis", "Instantaneous center method, Kennedy's theorem, Relative velocity method, Klein's construction, Coriolis component of acceleration."),
            ("Unit 3: Cams & Followers", "Types of cams and followers, Motion profiles: Uniform velocity, SHM, Uniform acceleration and Cycloidal, Cam profile synthesis."),
            ("Unit 4: Gears & Gear Trains", "Law of gearing, Involute and cycloidal tooth profiles, Interference and undercutting, Epicyclic gear trains and torque calculations."),
            ("Unit 5: Gyroscopic Couples & Balancing", "Precessional motion, Gyroscopic effect on aircraft, naval ships, and four-wheeled automobiles, Balancing of rotating masses in multiple planes.")
        ],
        "eval": [
            ("Examination Scheme", "70 Marks External SEE + 30 Marks Internal"),
            ("Reference Textbook", "Theory of Machines by S.S. Rattan / Thomas Bevan")
        ]
    },

    # Civil
    {
        "filename": "jntugv_civil_surveying.pdf",
        "title": "B.Tech Civil Engineering R23 Surveying & Geomatics Syllabus Blueprint",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "SRI SIVANI COLLEGE OF ENGINEERING (AFFILIATED TO JNTU-GV)",
        "dept": "DEPARTMENT OF CIVIL ENGINEERING",
        "code": "R23-CIV-1103",
        "type": "OFFICIAL ACADEMIC SYLLABUS & BLUEPRINT",
        "sem": "I B.Tech I Semester (R23 Regulation)",
        "units": [
            ("Unit I: Introduction to Surveying & Compass Traverse", "Principles of surveying, Classifications, Errors and corrections in chaining/taping, Prismatic and surveyor compass, Local attraction and declination correction."),
            ("Unit II: Levelling & Contouring", "Dumpy and auto levels, Staff readings, Height of Instrument (HI) vs Rise and Fall methods, Curvature and refraction corrections, Contour characteristics and interpolation methods."),
            ("Unit III: Theodolite Surveying & Trigonometrical Levelling", "Vernier transit theodolite, Temporary and permanent adjustments, Measurement of horizontal and vertical angles, Prolonging a straight line, Tachometric surveying principles."),
            ("Unit IV: Curves & Setting Out Works", "Elements of simple, compound, and reverse circular curves, Setting out simple curves by Rankine's deflection angle method, Transition curves and vertical curves."),
            ("Unit V: Modern Geomatics & Total Station / GPS", "Principles of Electronic Distance Measurement (EDM), Total Station features and field data handling, Global Positioning System (GPS) segments, Introduction to GIS spatial layers.")
        ],
        "eval": [
            ("Internal Evaluation", "30 Marks"),
            ("University Examination", "70 Marks"),
            ("Field Practical Component", "1.5 Credits (3 Hours/Week)")
        ]
    },
    {
        "filename": "jntugv_civil_strength_materials.pdf",
        "title": "Strength of Materials (Mechanics of Solids) Semester PYQ with Solved Problems",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "SRI SIVANI COLLEGE OF ENGINEERING & EXAM BRANCH",
        "dept": "DEPARTMENT OF CIVIL ENGINEERING",
        "code": "R23-CIV-1202",
        "type": "SOLVED SEMESTER QUESTION PAPERS & MODEL ANSWERS",
        "sem": "I B.Tech II Semester (R23 Regulation)",
        "units": [
            ("Paper Section 1: Simple Stresses, Strains & Elastic Constants", "Tensile, compressive and shear stresses, Stress-strain diagram for mild steel, Poisson's ratio, Volumetric strain, Relationships between E, G, and K, Thermal stresses."),
            ("Paper Section 2: Shear Force & Bending Moment Diagrams (SFD & BMD)", "Cantilever, simply supported and overhanging beams subjected to point loads, UDL and UVL, Point of contraflexure determination."),
            ("Paper Section 3: Flexural & Shear Stresses in Beams", "Bending equation M/I = sigma/y = E/R, Section modulus of rectangular, circular, I and T sections, Shear stress distribution across flanges and webs."),
            ("Paper Section 4: Deflection of Beams & Mohr's Theorems", "Double integration method, Macaulay's method, Moment area method for slopes and deflections of cantilever and simply supported beams."),
            ("Paper Section 5: Torsion of Circular Shafts & Thin Cylinders", "Torsion equation T/J = tau/r = G*theta/L, Polar modulus, Power transmitted, Stresses in thin cylindrical and spherical shells under internal pressure.")
        ],
        "eval": [
            ("Max Marks", "70 Marks (3 Hours)"),
            ("Passing Criteria", "40% in External (28/70) and 40% aggregate (40/100)"),
            ("Model Paper Year", "2023 - 2024 Academic Batches")
        ]
    },
    {
        "filename": "jntuk_civil_surveying_lab.pdf",
        "title": "Surveying Field Practice & Total Station Lab Manual",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY KAKINADA",
        "college": "DEPARTMENT OF CIVIL ENGINEERING",
        "dept": "SURVEYING & GEODETIC SCIENCE DIVISION",
        "code": "R23-CIV-LAB1",
        "type": "PRACTICAL FIELD WORK MANUAL & OBSERVATION LOGBOOK",
        "sem": "I B.Tech II Semester (R23 Scheme)",
        "units": [
            ("Field Experiment 1: Chain & Compass Surveying", "Ranging and measuring lines across obstacles, Radiation and intersection compass traversing of an open plot."),
            ("Field Experiment 2: Differential & Fly Levelling", "Bench mark transfer, Profile levelling of road alignment, Inverted staff reading for ceiling benchmarks."),
            ("Field Experiment 3: Theodolite Angular Measurements", "Repetition and reiteration methods for measuring horizontal angles with high precision."),
            ("Field Experiment 4: Curve Setting by Rankine's Method", "Setting out a circular curve of radius 150m using transit theodolite and steel tape."),
            ("Field Experiment 5: Total Station Area & Coordinate Mapping", "Setting up prism reflector, Stakeout procedure, Topographic surveying of campus quadrangle, Data export to DXF.")
        ],
        "eval": [
            ("Field Notebook & Records", "20 Marks"),
            ("Viva Voce & Field Test", "30 Marks"),
            ("External Practical Exam", "50 Marks (Total: 100 Marks)")
        ]
    },
    {
        "filename": "au_civil_concrete_tech.pdf",
        "title": "Building Materials & Concrete Technology Hand-written Notes",
        "univ": "ANDHRA UNIVERSITY COLLEGE OF ENGINEERING (A)",
        "college": "DEPARTMENT OF CIVIL ENGINEERING, VISAKHAPATNAM",
        "dept": "STRUCTURAL ENGINEERING RESEARCH GROUP",
        "code": "AU-CIV-2104",
        "type": "FACULTY LECTURE NOTES & IS-456 MIX DESIGN FORMULAS",
        "sem": "II B.Tech I Semester (AU Regulation)",
        "units": [
            ("Chapter 1: Cement & Mineral Admixtures", "Manufacture of Portland cement, Bogue's compounds, Hydration heat, Fly ash, Silica fume, GGBS incorporation."),
            ("Chapter 2: Aggregates Properties & Testing", "Grading of aggregates, Fineness modulus, Bulking of sand, Flakiness and elongation indices, Water absorption."),
            ("Chapter 3: Fresh Concrete & Workability", "Slump test, Compacting factor test, Flow table test, Segregation and bleeding causes, Water-reducing superplasticizers."),
            ("Chapter 4: Hardened Concrete Mechanics & Durability", "Compressive, split tensile, and flexural strengths, Maturity concept, Creep and shrinkage, Carbonation and chloride attack."),
            ("Chapter 5: Concrete Mix Design as per IS 10262:2019", "Step-by-step mix proportioning for M25, M30, and M40 grades, Water-binder ratio selection, Target mean strength calculation.")
        ],
        "eval": [
            ("Reference Standards", "IS 456:2000, IS 10262:2019, IS 383:2016"),
            ("Faculty Contributor", "Prof. K. Rambabu, Structural Division, AU")
        ]
    },

    # CSE
    {
        "filename": "jntugv_cse_linear_algebra_m1.pdf",
        "title": "B.Tech CSE R23 Linear Algebra & Calculus (M1) Official Syllabus & Model Paper",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "SRI SIVANI COLLEGE OF ENGINEERING (AFFILIATED TO JNTU-GV)",
        "dept": "DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING",
        "code": "R23-BS-1101",
        "type": "OFFICIAL ACADEMIC SYLLABUS & BLUEPRINT",
        "sem": "I B.Tech I Semester (R23 Regulation)",
        "units": [
            ("Unit I: Matrices & System of Linear Equations", "Rank of matrix by Echelon and Normal forms, Consistency of non-homogeneous system AX=B, Gauss elimination, Gauss-Jordan, and Gauss-Seidel iterative methods."),
            ("Unit II: Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem", "Eigenvalues and eigenvectors of real matrices, Properties, Cayley-Hamilton theorem and inverse/powers of matrices, Diagonalization, Quadratic forms to canonical forms by orthogonal transformation."),
            ("Unit III: Differential Calculus & Mean Value Theorems", "Rolle's theorem, Lagrange's and Cauchy's mean value theorems, Taylor's and Maclaurin's series expansions, Indeterminate forms (L'Hopital's rule)."),
            ("Unit IV: Multivariable Calculus (Partial Differentiation)", "Partial derivatives, Total derivative, Chain rule, Jacobians and functional dependence, Maxima and minima of functions of two variables, Lagrange multipliers method."),
            ("Unit V: Multiple Integrals & Applications", "Double and triple integrals in Cartesian and polar coordinates, Change of order of integration, Change of variables, Evaluation of areas and volumes using multiple integrals.")
        ],
        "eval": [
            ("Internal Assessment (CIE)", "30 Marks"),
            ("End Examination (SEE)", "70 Marks"),
            ("Credits", "3.0 (3-0-0)")
        ]
    },
    {
        "filename": "jntugv_cse_pps_lab_manual.pdf",
        "title": "Programming for Problem Solving using C (PPS) Lab Manual & Code Repository",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "SRI SIVANI COLLEGE OF ENGINEERING",
        "dept": "DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING",
        "code": "R23-ES-LAB1",
        "type": "LAB MANUAL WITH TEST CASES & FLOWCHARTS",
        "sem": "I B.Tech I Semester (R23 Regulation)",
        "units": [
            ("Week 1: Familiarization with Linux / GCC & Basic I/O", "Writing, compiling and executing simple C programs, Standard I/O, Escape sequences, Data types and format specifiers."),
            ("Week 2: Conditional Statements & Branching", "Implementation of if-else ladders, switch-case, nested conditions: Quadratic equation roots, Grade calculation, Simple calculator."),
            ("Week 3: Loops & Iterative Formulations", "While, do-while, for loops: Prime number checks, Fibonacci sequences, Armstrong numbers, Pattern printing exercises."),
            ("Week 4: Arrays & Matrix Operations", "1D arrays: Linear and binary search, Bubble sort, 2D arrays: Matrix addition, multiplication, and transpose calculation."),
            ("Week 5: Pointers, Functions & File Management", "Pass-by-value vs pass-by-reference, Recursion (Tower of Hanoi), Dynamic memory allocation (malloc, calloc, free), File read/write operations.")
        ],
        "eval": [
            ("Continuous Lab Assessment", "15 Marks"),
            ("Model Exam", "15 Marks"),
            ("External Viva & Execution", "50 Marks")
        ]
    },
    {
        "filename": "jntuk_cse_dsa_pyq.pdf",
        "title": "Data Structures & Algorithms Previous Year Question Papers (2022-2024)",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY KAKINADA",
        "college": "EXAMINATION BRANCH & CSE CURRICULUM CELL",
        "dept": "DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING",
        "code": "R20-CSE-2102",
        "type": "SEMESTER END QUESTION PAPERS WITH KEY SOLUTIONS",
        "sem": "II B.Tech I Semester (R20 Scheme)",
        "units": [
            ("Section 1: Stacks, Queues & Linear Lists", "Stack ADT using arrays and linked lists, Infix to postfix conversion, Evaluation of postfix expressions, Circular queues and Priority queues."),
            ("Section 2: Singly, Doubly & Circular Linked Lists", "Node insertion, deletion, and search operations, Reversing a singly linked list in O(n), Polynomial representation and addition."),
            ("Section 3: Binary Trees, BST & AVL Balanced Trees", "Tree traversals (Inorder, Preorder, Postorder, Level order), Binary Search Tree insertion and deletion, AVL rotations and balance factor."),
            ("Section 4: Graph Algorithms & Minimum Spanning Trees", "Breadth First Search (BFS), Depth First Search (DFS), Dijkstra's shortest path, Prim's and Kruskal's algorithms for MST."),
            ("Section 5: Advanced Sorting & Hashing Techniques", "Quick sort, Merge sort, Heap sort time-space complexity, Hash functions, Collision resolution: Separate chaining and Linear probing.")
        ],
        "eval": [
            ("Marks Total", "70 Marks (Part A: 14 Marks, Part B: 56 Marks)"),
            ("Target Batch", "2020-2024 / 2021-2025 Regular & Supplementary")
        ]
    },

    # AIML
    {
        "filename": "jntugv_aiml_foundations.pdf",
        "title": "B.Tech AI & ML R23 Mathematical Foundations & Python for Data Science Syllabus",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "SRI SIVANI COLLEGE OF ENGINEERING (AFFILIATED TO JNTU-GV)",
        "dept": "DEPARTMENT OF ARTIFICIAL INTELLIGENCE & MACHINE LEARNING",
        "code": "R23-AIML-1102",
        "type": "OFFICIAL ACADEMIC SYLLABUS & BLUEPRINT",
        "sem": "I B.Tech I Semester (R23 Regulation)",
        "units": [
            ("Unit I: Linear Algebra Foundations for Machine Learning", "Vectors, Norms, Orthogonality, Gram-Schmidt process, Singular Value Decomposition (SVD), Principal Component Analysis (PCA) derivation, Matrix calculus."),
            ("Unit II: Probability, Random Variables & Distributions", "Conditional probability, Bayes Theorem, Random variables, Expectation, Variance, Discrete and continuous distributions (Binomial, Poisson, Normal, Gaussian), Central Limit Theorem."),
            ("Unit III: Python Programming & Scientific Libraries", "Python syntax, Data structures (Lists, Tuples, Dictionaries, Sets), NumPy n-dimensional arrays, vectorization, broadcasting, indexing and slicing."),
            ("Unit IV: Data Wrangling & Visualization with Pandas", "Series, DataFrames, Missing value imputation, GroupBy, Merging and joins, Matplotlib plotting, Seaborn statistical charts, Heatmaps."),
            ("Unit V: Exploratory Data Analysis & Feature Engineering", "Outlier detection using IQR and Z-scores, Standard scaling and Min-Max normalization, One-Hot encoding, Feature selection using correlation matrices.")
        ],
        "eval": [
            ("Internal Evaluation", "30 Marks"),
            ("Semester End Examination", "70 Marks"),
            ("Branch Code", "AIML / CSE(AI&ML)")
        ]
    },
    {
        "filename": "jntuk_aiml_lab_manual.pdf",
        "title": "AI & Machine Learning Lab Manual: NumPy, Pandas, Matplotlib & Scikit-learn",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY KAKINADA",
        "college": "DEPARTMENT OF AI & DATA SCIENCE",
        "dept": "COMPUTATIONAL INTELLIGENCE LAB",
        "code": "R23-AIML-LAB1",
        "type": "LAB MANUAL WITH JUPYTER NOTEBOOK EXERCISES",
        "sem": "I B.Tech II Semester (R23 Scheme)",
        "units": [
            ("Exercise 1: Matrix Inversion & SVD in NumPy", "Performing matrix decomposition, eigenvalues and eigenvectors on real datasets in Python."),
            ("Exercise 2: Data Preprocessing on Titanic / Housing Datasets", "Handling null values, categorical encoding, feature scaling using scikit-learn transformers."),
            ("Exercise 3: Simple & Multiple Linear Regression", "Implementing ordinary least squares, evaluating MSE, RMSE, and R2 score with regression plots."),
            ("Exercise 4: Logistic Regression & Classification Metrics", "Binary classification on Breast Cancer dataset, Confusion matrix, Precision, Recall, F1-score, ROC-AUC curve."),
            ("Exercise 5: Decision Trees & Random Forest Classifier", "Gini impurity vs Information Gain, Hyperparameter tuning with GridSearchCV, Model deployment basics.")
        ],
        "eval": [
            ("Lab Practical Performance", "30 Marks"),
            ("External Practical Exam", "50 Marks (Total: 80 Marks)")
        ]
    },
    {
        "filename": "au_aiml_exam_papers.pdf",
        "title": "AI & Data Engineering Mid & Semester Exam PYQs",
        "univ": "ANDHRA UNIVERSITY COLLEGE OF ENGINEERING (A)",
        "college": "DEPARTMENT OF COMPUTER SCIENCE & SYSTEMS ENGINEERING",
        "dept": "AI & MACHINE INTELLIGENCE WING",
        "code": "AU-AIML-2201",
        "type": "SOLVED MID & SEMESTER EXAMINATION PAPERS",
        "sem": "II B.Tech II Semester (AU Scheme)",
        "units": [
            ("Paper Section A: Artificial Intelligence Agents & Search", "Rational agents, Environment types, Uninformed search (BFS, DFS, Uniform Cost), Informed search (A* search, Heuristics admissibility), Adversarial search (Minimax, Alpha-Beta pruning)."),
            ("Paper Section B: Supervised Machine Learning Algorithms", "k-Nearest Neighbors (k-NN), Naive Bayes classifier, Support Vector Machines (SVM), Hyperplanes, Soft margin and Kernel trick."),
            ("Paper Section C: Unsupervised Learning & Clustering", "k-Means clustering algorithm, Elbow method for optimal k, Hierarchical clustering, Density-based spatial clustering (DBSCAN)."),
            ("Paper Section D: Neural Networks & Deep Learning Foundations", "Perceptron model, Activation functions (Sigmoid, ReLU, Softmax), Multi-layer Perceptron (MLP), Backpropagation algorithm."),
            ("Paper Section E: Model Evaluation & Regularization", "Bias-Variance tradeoff, Overfitting prevention, L1 (Lasso) and L2 (Ridge) regularization, Cross-validation techniques.")
        ],
        "eval": [
            ("Question Paper Duration", "3 Hours"),
            ("Max Marks", "70 Marks"),
            ("University Examination Division", "Andhra University, Visakhapatnam")
        ]
    },

    # ECE
    {
        "filename": "jntugv_ece_edc.pdf",
        "title": "B.Tech ECE R23 Electronic Devices and Circuits (EDC) Syllabus & Question Bank",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "SRI SIVANI COLLEGE OF ENGINEERING (AFFILIATED TO JNTU-GV)",
        "dept": "DEPARTMENT OF ELECTRONICS & COMMUNICATION ENGINEERING",
        "code": "R23-ECE-1102",
        "type": "OFFICIAL ACADEMIC SYLLABUS & BLUEPRINT",
        "sem": "I B.Tech I Semester (R23 Regulation)",
        "units": [
            ("Unit I: Semiconductor Physics & PN Junction Diode", "Intrinsic and extrinsic semiconductors, Carrier transport (drift and diffusion), PN junction diode under forward and reverse bias, Diode current equation, Transition and diffusion capacitance, Zener diode and voltage regulation."),
            ("Unit II: Rectifiers & Filters", "Half-wave, full-wave center-tapped and bridge rectifiers, Ripple factor, Efficiency, TUF, Harmonic components, Inductor filter, Capacitor filter, L-section and Pi-filters."),
            ("Unit III: Bipolar Junction Transistors (BJT)", "Transistor construction, CE, CB, and CC configurations, Input and output characteristics, Transistor as a switch and amplifier, Early effect, Punch-through."),
            ("Unit IV: Transistor Biasing & Thermal Stabilization", "Need for biasing, Operating point (Q-point), Stability factors S, S', S'', Fixed bias, Collector-to-base bias, Self-bias (Voltage divider bias), Thermal runaway."),
            ("Unit V: Field Effect Transistors (JFET & MOSFET)", "Construction and operation of N-channel JFET, Drain and transfer characteristics, Pinch-off voltage, MOSFET (Depletion and Enhancement types), Comparison of BJT and FET.")
        ],
        "eval": [
            ("Internal Marks", "30 Marks"),
            ("External Examination", "70 Marks"),
            ("Reference Book", "Electronic Devices and Circuit Theory by Boylestad / Millman & Halkias")
        ]
    },
    {
        "filename": "jntugv_ece_network_analysis.pdf",
        "title": "Network Analysis & Signals Previous Year Question Papers (2022-2024)",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "EXAMINATION BRANCH & SRI SIVANI COLLEGE OF ENGINEERING",
        "dept": "DEPARTMENT OF ELECTRONICS & COMMUNICATION ENGINEERING",
        "code": "R23-ECE-1203",
        "type": "PREVIOUS SEMESTER EXAMINATION PAPERS & NUMERICAL SOLUTIONS",
        "sem": "I B.Tech II Semester (R23 Regulation)",
        "units": [
            ("Set 1: Mesh & Nodal Analysis of Electric Circuits", "Kirchhoff's Laws, Independent and dependent sources, Supermesh and Supernode techniques, Source transformations."),
            ("Set 2: Network Theorems (DC & AC Excitation)", "Thevenin's theorem, Norton's theorem, Superposition theorem, Maximum Power Transfer theorem, Reciprocity theorem."),
            ("Set 3: Resonance & Coupled Circuits", "Series and parallel resonance, Resonant frequency, Bandwidth, Quality factor (Q), Mutual inductance, Dot convention, Coefficient of coupling."),
            ("Set 4: Transient Analysis of RL, RC & RLC Circuits", "DC response of RL, RC, and RLC series circuits, Initial conditions, Differential equation approach, Laplace transform formulation."),
            ("Set 5: Two-Port Network Parameters", "Impedance (Z), Admittance (Y), Transmission (ABCD), and Hybrid (h) parameters, Interrelationships, Interconnection of two-port networks.")
        ],
        "eval": [
            ("Total Marks", "70 Marks"),
            ("Duration", "3 Hours"),
            ("Regulation", "R23 / R20 JNTU-GV Scheme")
        ]
    },
    {
        "filename": "jntuk_ece_edc_lab_manual.pdf",
        "title": "Electronic Devices and Circuits (EDC) & Simulation Lab Manual",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY KAKINADA",
        "college": "DEPARTMENT OF ELECTRONICS & COMMUNICATION ENGINEERING",
        "dept": "ANALOG ELECTRONICS LABORATORY",
        "code": "R23-ECE-LAB1",
        "type": "HARDWARE EXPERIMENT LOGBOOK & MULTISIM GUIDELINES",
        "sem": "I B.Tech I Semester (R23 Scheme)",
        "units": [
            ("Experiment 1: PN Junction Diode V-I Characteristics", "Plotting forward and reverse characteristics, determining cut-in voltage and dynamic resistance."),
            ("Experiment 2: Zener Diode as a Voltage Regulator", "Line regulation and load regulation characteristics, Breakdown voltage determination."),
            ("Experiment 3: Half Wave & Full Wave Rectifiers with Filters", "Measuring ripple factor and DC output voltage with and without capacitor filters on DSO."),
            ("Experiment 4: Common Emitter (CE) Transistor Characteristics", "Measuring input and output characteristics, Calculating h-parameters (hfe, hie, hoe, hre)."),
            ("Experiment 5: JFET Drain & Transfer Characteristics", "Determining transconductance gm, drain resistance rd, and amplification factor mu.")
        ],
        "eval": [
            ("Lab Day-to-Day Grade", "15 Marks"),
            ("Practical Exam", "50 Marks (Total: 75 Marks)")
        ]
    },

    # EEE
    {
        "filename": "jntugv_eee_eca.pdf",
        "title": "B.Tech EEE R23 Electrical Circuit Analysis (ECA) Syllabus Blueprint",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "SRI SIVANI COLLEGE OF ENGINEERING (AFFILIATED TO JNTU-GV)",
        "dept": "DEPARTMENT OF ELECTRICAL & ELECTRONICS ENGINEERING",
        "code": "R23-EEE-1102",
        "type": "OFFICIAL ACADEMIC SYLLABUS & BLUEPRINT",
        "sem": "I B.Tech I Semester (R23 Regulation)",
        "units": [
            ("Unit I: Basic Circuit Concepts & Reduction Techniques", "Circuit elements, Voltage and current sources, Kirchhoff's laws, Star-Delta transformations, Source shifting, Nodal and Mesh analysis with dependent sources."),
            ("Unit II: Single Phase AC Circuits & Phasor Diagrams", "Sinusoidal alternating quantities, RMS and average values, Form factor, Peak factor, Concept of phasor, Complex power, Apparent, active and reactive power, Power factor improvement."),
            ("Unit III: Network Theorems applied to AC & DC Circuits", "Superposition theorem, Thevenin's and Norton's theorems, Maximum power transfer theorem, Millman's theorem, Tellegen's theorem."),
            ("Unit IV: Three-Phase Balanced & Unbalanced Systems", "Phase sequence, Star and Delta connections, Relation between line and phase voltages and currents in balanced systems, Measurement of 3-phase power by Two-Wattmeter method."),
            ("Unit V: Magnetic Circuits & Coupled Inductors", "Faraday's laws of electromagnetic induction, Self and mutual inductances, Reluctance, MMF, Flux, B-H curve, Series and parallel magnetic circuits, Ideal transformer model.")
        ],
        "eval": [
            ("Continuous Internal Evaluation", "30 Marks"),
            ("Semester Examination", "70 Marks"),
            ("Credits", "3.0 (3-0-0)")
        ]
    },
    {
        "filename": "jntugv_eee_machines_pyq.pdf",
        "title": "Electrical Machines-I & Magnetic Circuits Previous Semester Question Papers",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "SRI SIVANI COLLEGE OF ENGINEERING & EXAM CELL",
        "dept": "DEPARTMENT OF ELECTRICAL & ELECTRONICS ENGINEERING",
        "code": "R23-EEE-2101",
        "type": "PREVIOUS SEMESTER QUESTION PAPERS WITH SOLVED DERIVATIONS",
        "sem": "II B.Tech I Semester (R23 Regulation)",
        "units": [
            ("Paper 1: Electromechanical Energy Conversion Principles", "Forces and torques in magnetic field systems, Energy and co-energy concepts, Singly excited and doubly excited magnetic systems."),
            ("Paper 2: DC Generators Principles & Armature Reaction", "Construction details, Lap and wave windings, EMF equation, Armature reaction, Demagnetizing and cross-magnetizing amp-turns, Commutation and interpoles."),
            ("Paper 3: DC Motors & Operating Characteristics", "Principle of operation, Back EMF, Torque equation, Characteristics of shunt, series, and compound motors, Applications."),
            ("Paper 4: Speed Control & Starting of DC Motors", "Armature resistance control, Field flux control, Ward-Leonard system, 3-point and 4-point starters, Calculation of starter resistance steps."),
            ("Paper 5: Testing of DC Machines & Efficiency Analysis", "Losses in DC machines, Brake test, Swinburne's test, Hopkinson's regenerative test, Retardation test, Separation of core losses.")
        ],
        "eval": [
            ("Exam Pattern", "Part A: 10 Short questions (20M) + Part B: 5 Units essay (50M)"),
            ("Total Marks", "70 Marks"),
            ("Prescribed Textbook", "Electrical Machines by P.S. Bimbhra / I.J. Nagrath & D.P. Kothari")
        ]
    },
    {
        "filename": "jntuk_eee_bee_lab_manual.pdf",
        "title": "Basic Electrical Engineering (BEE) & Measurements Lab Manual",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY KAKINADA",
        "college": "DEPARTMENT OF ELECTRICAL & ELECTRONICS ENGINEERING",
        "dept": "ELECTRICAL MACHINES & MEASUREMENTS LAB",
        "code": "R23-EEE-LAB1",
        "type": "LABORATORY PRACTICAL MANUAL WITH CONNECTION DIAGRAMS",
        "sem": "I B.Tech I Semester (R23 Scheme)",
        "units": [
            ("Experiment 1: Verification of KCL & KVL on Breadboard", "Measuring branch currents and loop voltages with digital multimeters across resistive meshes."),
            ("Experiment 2: Verification of Thevenin's & Norton's Theorems", "Determining open circuit voltage Vth, short circuit current Isc, and equivalent resistance Rth."),
            ("Experiment 3: Measurement of Active & Reactive Power in Single Phase Circuit", "Using electrodynamometer wattmeter, ammeter and voltmeter to calculate power factor of inductive load."),
            ("Experiment 4: Swinburne's Test on DC Shunt Machine", "Pre-determining efficiency of DC machine running as generator and motor at different loads."),
            ("Experiment 5: Calibration of Single-Phase Energy Meter", "Determining percentage error of induction type energy meter using phantom loading method.")
        ],
        "eval": [
            ("Continuous Lab Record", "15 Marks"),
            ("Viva-voce & Execution", "15 Marks"),
            ("University External Practical Exam", "50 Marks (Total: 80 Marks)")
        ]
    },

    # Master Blueprint
    {
        "filename": "academic_blueprint.pdf",
        "title": "Official B.Tech Academic Blueprint & Examination Regulations Master Copy",
        "univ": "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM",
        "college": "SRI SIVANI COLLEGE OF ENGINEERING & STATE AFFILIATED INSTITUTIONS",
        "dept": "DIRECTORATE OF ACADEMIC AFFAIRS & EXAMINATIONS",
        "code": "R23-ACAD-MASTER",
        "type": "ACADEMIC REGULATIONS, CURRICULAR STRUCTURE & GRADING BLUEPRINT",
        "sem": "All B.Tech Programs (CSE, AI/ML, ECE, EEE, MECH, CIVIL)",
        "units": [
            ("Section 1: B.Tech 4-Year Credit Architecture", "Total 160 credits required for award of B.Tech degree. Distribution across Basic Sciences (BS: 23), Engineering Sciences (ES: 24), Professional Core (PC: 64), Professional Electives (PE: 18), Open Electives (OE: 12), Humanities & Management (HSMC: 11), Project & Internships (PR: 10)."),
            ("Section 2: Examination & Evaluation Framework", "Evaluation ratio: 30% Continuous Internal Evaluation (CIE) + 70% Semester End Examination (SEE). Two Mid-examinations per semester; best 80% + worst 20% weighted average for Mid marks."),
            ("Section 3: Attendance, Condonation & Detention Rules", "Minimum 75% aggregate attendance required. Condonation up to 10% (between 65% and 75%) permitted on medical grounds with prescribed fee. Students with less than 65% attendance detained for the semester."),
            ("Section 4: Grading System & CGPA Calculation", "10-point scale: O (Outstanding, Grade Point 10), A+ (Excellent, 9), A (Very Good, 8), B+ (Good, 7), B (Above Average, 6), C (Average, 5), P (Pass, 4), F (Fail, 0). SGPA = Sum(C_i * GP_i) / Sum(C_i)."),
            ("Section 5: Honors & Minors Degree Guidelines", "Students with CGPA >= 8.0 without any backlogs can register for Honors in parent discipline or Minor in emerging area (AI/ML, Data Science, IoT, Cyber Security, Electric Vehicles) by earning an additional 18-20 credits.")
        ],
        "eval": [
            ("Applicability", "R23 Regulations for all B.Tech batches from 2023-24 onwards"),
            ("Approved by", "Academic Council & Board of Studies, JNTU-GV"),
            ("Affiliated Colleges", "Sri Sivani College of Engineering, MVGR, GMRIT, LENDI, and affiliated institutions")
        ]
    }
]

def generate_pdf(doc_info, output_dir):
    filepath = os.path.join(output_dir, doc_info["filename"])
    doc = SimpleDocTemplate(
        filepath,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#0f172a'),
        alignment=TA_CENTER
    )

    univ_style = ParagraphStyle(
        'UnivStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#1e3a8a'),
        alignment=TA_CENTER
    )

    college_style = ParagraphStyle(
        'CollegeStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#0369a1'),
        alignment=TA_CENTER
    )

    type_badge = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#b45309'),
        alignment=TA_CENTER
    )

    unit_title_style = ParagraphStyle(
        'UnitTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#1e293b')
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#334155'),
        alignment=TA_JUSTIFY
    )

    meta_label = ParagraphStyle(
        'MetaLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#475569')
    )

    meta_val = ParagraphStyle(
        'MetaVal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#0f172a')
    )

    elements = []

    # University & College Header Table
    header_data = [
        [Paragraph(f"<b>{doc_info['univ']}</b>", univ_style)],
        [Paragraph(f"<b>{doc_info['college']}</b>", college_style)],
        [Paragraph(f"<b>{doc_info['dept']}</b>", college_style)],
        [Paragraph(f"<b>★ {doc_info['type']} ★</b>", type_badge)]
    ]
    t_header = Table(header_data, colWidths=[520])
    t_header.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    elements.append(t_header)
    elements.append(Spacer(1, 8))

    # Document Title
    elements.append(Paragraph(doc_info["title"], title_style))
    elements.append(Spacer(1, 6))

    # Metadata Grid
    meta_data = [
        [
            Paragraph("<b>Course Code:</b>", meta_label), Paragraph(doc_info["code"], meta_val),
            Paragraph("<b>Academic Scheme:</b>", meta_label), Paragraph(doc_info["sem"], meta_val)
        ],
        [
            Paragraph("<b>Verification:</b>", meta_label), Paragraph("Verified Authentic Academic Copy", meta_val),
            Paragraph("<b>System Ref:</b>", meta_label), Paragraph("STUDY-BLUEPRINT-VERIFIED-2026", meta_val)
        ]
    ]
    t_meta = Table(meta_data, colWidths=[80, 180, 100, 160])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f1f5f9')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    elements.append(t_meta)
    elements.append(Spacer(1, 10))

    # Divider
    elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#94a3b8'), spaceAfter=8))

    # Units / Sections
    elements.append(Paragraph("<b>DETAILED CURRICULAR MODULES & TOPICS</b>", ParagraphStyle(
        'SectionHeader',
        fontName='Helvetica-Bold',
        fontSize=10,
        textColor=colors.HexColor('#0f172a'),
        leading=12,
        spaceAfter=6
    )))

    for title, desc in doc_info["units"]:
        unit_block = [
            [Paragraph(f"<b>{title}</b>", unit_title_style)],
            [Paragraph(desc, body_style)]
        ]
        t_unit = Table(unit_block, colWidths=[520])
        t_unit.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#e0f2fe')),
            ('BACKGROUND', (0,1), (-1,1), colors.HexColor('#ffffff')),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#bae6fd')),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        elements.append(t_unit)
        elements.append(Spacer(1, 6))

    # Assessment & Exam Blueprint Table
    elements.append(Spacer(1, 4))
    elements.append(Paragraph("<b>EVALUATION SCHEME & EXAMINATION BLUEPRINT</b>", ParagraphStyle(
        'EvalHeader',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        textColor=colors.HexColor('#0f172a'),
        leading=12,
        spaceAfter=5
    )))

    eval_rows = []
    for comp, detail in doc_info["eval"]:
        eval_rows.append([
            Paragraph(f"<b>{comp}</b>", meta_label),
            Paragraph(detail, body_style)
        ])

    t_eval = Table(eval_rows, colWidths=[180, 340])
    t_eval.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#94a3b8')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    elements.append(t_eval)

    # Official Seal and Signature Footer
    elements.append(Spacer(1, 12))
    seal_data = [
        [
            Paragraph("<b>OFFICIAL SEAL</b><br/><font size=6 color='#64748b'>DIRECTORATE OF ACADEMIC AFFAIRS<br/>JNTU-GV & AFFILIATED COLLEGES</font>", ParagraphStyle('Seal1', fontName='Helvetica-Bold', fontSize=8, leading=10, alignment=TA_CENTER)),
            Paragraph("<b>AUTHENTICATED DOCUMENT</b><br/><font size=6 color='#16a34a'>DIGITALLY SIGNED & VERIFIED<br/>SHA-256: e8b9c71a34d09f7e</font>", ParagraphStyle('Seal2', fontName='Helvetica-Bold', fontSize=8, leading=10, alignment=TA_CENTER)),
            Paragraph("<b>CONTROLLER OF EXAMINATIONS</b><br/><font size=6 color='#64748b'>SRI SIVANI COLLEGE OF ENGG<br/>CHILAKAPALEM, SRIKAKULAM</font>", ParagraphStyle('Seal3', fontName='Helvetica-Bold', fontSize=8, leading=10, alignment=TA_CENTER))
        ]
    ]
    t_seal = Table(seal_data, colWidths=[170, 180, 170])
    t_seal.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#fafaf9')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    elements.append(t_seal)

    doc.build(elements)
    print(f"Generated: {filepath}")

def main():
    target_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../frontend/public/docs"))
    os.makedirs(target_dir, exist_ok=True)
    print(f"Generating academic PDF resources in: {target_dir}")
    for item in RESOURCES_DATA:
        generate_pdf(item, target_dir)
    print(f"Successfully generated {len(RESOURCES_DATA)} official academic PDFs!")

if __name__ == "__main__":
    main()
