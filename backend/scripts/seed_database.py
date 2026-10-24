import asyncio
import logging
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("seed")

async def seed_data(target_db=None):
    if target_db is not None:
        db = target_db
    else:
        from app.database.mongodb import connect_to_mongo, get_database
        await connect_to_mongo()
        db = get_database()

    # 1. Education Levels
    education_levels = [
        {"code": "school", "title": "School (Classes 6–10)", "description": "CBSE, ICSE and State Secondary Boards", "display_order": 1, "is_active": True},
        {"code": "intermediate", "title": "Intermediate / +2", "description": "Junior College Streams (MPC, BiPC, MEC, CEC)", "display_order": 2, "is_active": True},
        {"code": "diploma", "title": "Diploma / Polytechnic", "description": "State Board of Technical Education across branches", "display_order": 3, "is_active": True},
        {"code": "btech", "title": "BTech / BE Engineering", "description": "Undergraduate Engineering across Semesters & Regulations", "display_order": 4, "is_active": True},
        {"code": "competitive", "title": "Competitive Examinations", "description": "JEE Main/Advanced, EAMCET/EAPCET, GATE, etc.", "display_order": 5, "is_active": True}
    ]
    for el in education_levels:
        await db.education_levels.update_one({"code": el["code"]}, {"$set": el}, upsert=True)
    logger.info("Seeded %d education levels", len(education_levels))

    # 2. Boards and Universities
    boards_and_universities = [
        {"code": "jntugv", "name": "JNTU Gurajada Vizianagaram (incl. Sri Sivani College of Engg)", "short_name": "JNTU-GV", "education_level_code": "btech", "state_or_national": "Andhra Pradesh", "is_active": True},
        {"code": "jntuk", "name": "Jawaharlal Nehru Technological University Kakinada", "short_name": "JNTUK", "education_level_code": "btech", "state_or_national": "Andhra Pradesh", "is_active": True},
        {"code": "jntuh", "name": "Jawaharlal Nehru Technological University Hyderabad", "short_name": "JNTUH", "education_level_code": "btech", "state_or_national": "Telangana", "is_active": True},
        {"code": "jntua", "name": "Jawaharlal Nehru Technological University Anantapur", "short_name": "JNTUA", "education_level_code": "btech", "state_or_national": "Andhra Pradesh", "is_active": True},
        {"code": "au", "name": "Andhra University College of Engineering", "short_name": "AU", "education_level_code": "btech", "state_or_national": "Andhra Pradesh", "is_active": True},
        {"code": "osmania", "name": "Osmania University", "short_name": "OU", "education_level_code": "btech", "state_or_national": "Telangana", "is_active": True},
        {"code": "vtu", "name": "Visvesvaraya Technological University", "short_name": "VTU", "education_level_code": "btech", "state_or_national": "Karnataka", "is_active": True},
        {"code": "anna", "name": "Anna University", "short_name": "Anna Univ", "education_level_code": "btech", "state_or_national": "Tamil Nadu", "is_active": True},
        {"code": "aktu", "name": "Dr. A.P.J. Abdul Kalam Technical University", "short_name": "AKTU", "education_level_code": "btech", "state_or_national": "Uttar Pradesh", "is_active": True},
        {"code": "sppu", "name": "Savitribai Phule Pune University", "short_name": "SPPU", "education_level_code": "btech", "state_or_national": "Maharashtra", "is_active": True},
        {"code": "autonomous_other", "name": "Autonomous Engineering College / Other Indian University", "short_name": "Autonomous/Other", "education_level_code": "btech", "state_or_national": "National", "is_active": True},
        {"code": "sbtet", "name": "State Board of Technical Education and Training", "short_name": "SBTET", "education_level_code": "diploma", "state_or_national": "Telangana/AP", "is_active": True},
        {"code": "ts_bie", "name": "Telangana State Board of Intermediate Education", "short_name": "TS BIE", "education_level_code": "intermediate", "state_or_national": "Telangana", "is_active": True},
        {"code": "ap_bie", "name": "Andhra Pradesh Board of Intermediate Education", "short_name": "AP BIE", "education_level_code": "intermediate", "state_or_national": "Andhra Pradesh", "is_active": True},
        {"code": "cbse", "name": "Central Board of Secondary Education", "short_name": "CBSE", "education_level_code": "school", "state_or_national": "National", "is_active": True}
    ]
    for b in boards_and_universities:
        await db.boards_and_universities.update_one({"code": b["code"]}, {"$set": b}, upsert=True)
    logger.info("Seeded %d boards and universities", len(boards_and_universities))

    # 3. Branches
    branches = [
        {"code": "cse", "name": "Computer Science & Engineering", "short_name": "CSE", "education_level_code": "btech", "description": "Core computing, data structures, algorithms, databases and systems"},
        {"code": "aiml", "name": "Artificial Intelligence & Machine Learning", "short_name": "AI/ML", "education_level_code": "btech", "description": "Intelligent systems, statistical learning, neural architectures"},
        {"code": "ds", "name": "Data Science", "short_name": "DS", "education_level_code": "btech", "description": "Big data analytics, statistics, predictive data pipelines"},
        {"code": "ece", "name": "Electronics & Communication Engineering", "short_name": "ECE", "education_level_code": "btech", "description": "Semiconductors, signal processing, communication networks"},
        {"code": "eee", "name": "Electrical & Electronics Engineering", "short_name": "EEE", "education_level_code": "btech", "description": "Power systems, circuits, machines, power electronics"},
        {"code": "mech", "name": "Mechanical Engineering", "short_name": "MECH", "education_level_code": "btech", "description": "Thermodynamics, mechanics, CAD/CAM, manufacturing"},
        {"code": "civil", "name": "Civil Engineering", "short_name": "CIVIL", "education_level_code": "btech", "description": "Structural engineering, surveying, hydrology, construction"},
        {"code": "cme", "name": "Diploma in Computer Engineering", "short_name": "CME", "education_level_code": "diploma", "description": "Polytechnic computer engineering curriculum"},
        {"code": "mpc", "name": "Mathematics, Physics, Chemistry", "short_name": "MPC", "education_level_code": "intermediate", "description": "Standard engineering entrance preparatory stream"},
        {"code": "class_9", "name": "Class 9 Secondary School", "short_name": "Class 9", "education_level_code": "school", "description": "Secondary school foundation year across CBSE, ICSE, and State Boards"},
        {"code": "class_10", "name": "Secondary Class 10", "short_name": "Class 10", "education_level_code": "school", "description": "Board examination class"}
    ]
    for br in branches:
        await db.branches.update_one({"code": br["code"]}, {"$set": br}, upsert=True)
    logger.info("Seeded %d branches", len(branches))

    # 4. Subjects
    subjects = [
        # 1st Year (Semester 1-1) - JNTUGV / JNTUK / JNTUH
        {
            "code": "BS1101",
            "name": "Linear Algebra & Calculus (Mathematics-I)",
            "short_name": "M1",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "cse",
            "academic_year": 1,
            "semester": 1,
            "regulation": "R23",
            "credits": 4,
            "description": "Matrices, Rank, System of Linear Equations, Eigenvalues & Eigenvectors, Cayley-Hamilton, Mean Value Theorems, Multivariable Calculus.",
            "icon_name": "Sigma",
            "is_active": True
        },
        {
            "code": "ES1102",
            "name": "Programming for Problem Solving using C (PPS)",
            "short_name": "PPS",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "cse",
            "academic_year": 1,
            "semester": 1,
            "regulation": "R23",
            "credits": 3,
            "description": "Introduction to Programming, C syntax, Control Structures, Arrays, Strings, Functions, Recursion, Pointers, Structures and File Handling.",
            "icon_name": "Code",
            "is_active": True
        },
        {
            "code": "BS1103",
            "name": "Applied Physics / Engineering Physics",
            "short_name": "Physics",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "cse",
            "academic_year": 1,
            "semester": 1,
            "regulation": "R23",
            "credits": 3,
            "description": "Wave Optics, Interference, Diffraction, Lasers, Fiber Optics, Quantum Mechanics, Free Electron Theory, Semiconductors.",
            "icon_name": "Zap",
            "is_active": True
        },
        {
            "code": "ES1104",
            "name": "Basic Electrical & Electronics Engineering (BEEE)",
            "short_name": "BEEE",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "cse",
            "academic_year": 1,
            "semester": 1,
            "regulation": "R23",
            "credits": 3,
            "description": "DC & AC Circuits, Kirchhoff's Laws, Network Theorems, Magnetic Circuits, Transformers, Diodes, BJT, Rectifiers.",
            "icon_name": "Cpu",
            "is_active": True
        },
        {
            "code": "HS1105",
            "name": "Communicative English",
            "short_name": "English",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "cse",
            "academic_year": 1,
            "semester": 1,
            "regulation": "R23",
            "credits": 2,
            "description": "Vocabulary, Reading Comprehension, Formal Writing, Technical Presentation, Grammar and Listening Skills.",
            "icon_name": "BookOpen",
            "is_active": True
        },
        # 2nd Year (Semester 2-1)
        {
            "code": "CS301PC",
            "name": "Data Structures",
            "short_name": "DS",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "academic_year": 2,
            "semester": 1,
            "regulation": "R22",
            "credits": 4,
            "description": "Linear and non-linear data structures, trees, graphs, sorting, and hashing techniques.",
            "icon_name": "BinaryTree",
            "is_active": True
        },
        {
            "code": "CS302PC",
            "name": "Database Management Systems",
            "short_name": "DBMS",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "academic_year": 2,
            "semester": 1,
            "regulation": "R22",
            "credits": 4,
            "description": "Relational data model, SQL queries, ER modeling, normalization, transaction processing, and concurrency control.",
            "icon_name": "Database",
            "is_active": True
        },
        {
            "code": "CS401PC",
            "name": "Operating Systems",
            "short_name": "OS",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "academic_year": 2,
            "semester": 2,
            "regulation": "R22",
            "credits": 3,
            "description": "Process management, CPU scheduling, inter-process synchronization, deadlocks, and virtual memory.",
            "icon_name": "Cpu",
            "is_active": True
        },
        {
            "code": "CS402PC",
            "name": "Computer Networks",
            "short_name": "CN",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "academic_year": 2,
            "semester": 2,
            "regulation": "R22",
            "credits": 3,
            "description": "OSI reference model, TCP/IP protocol suite, data link routing, transport layer mechanisms, and application services.",
            "icon_name": "Network",
            "is_active": True
        },
        {
            "code": "MATH-1A",
            "name": "Intermediate Mathematics 1A",
            "short_name": "Maths 1A",
            "education_level_code": "intermediate",
            "board_or_university_code": "ts_bie",
            "branch_code": "mpc",
            "academic_year": 1,
            "semester": 1,
            "regulation": "NCERT",
            "credits": 4,
            "description": "Functions, Mathematical Induction, Matrices, and Trigonometric Equations.",
            "icon_name": "Sigma",
            "is_active": True
        },
        {
            "code": "CBSE-M10",
            "name": "Class 10 Mathematics",
            "short_name": "Class 10 Maths",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_10",
            "academic_year": 1,
            "semester": 1,
            "regulation": "NCERT",
            "credits": 4,
            "description": "Real Numbers, Polynomials, Quadratic Equations, Trigonometry, and Statistics.",
            "icon_name": "Calculator",
            "is_active": True
        },
        {
            "code": "CBSE-M09",
            "name": "Class 9 Mathematics",
            "short_name": "Class 9 Maths",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_9",
            "academic_year": 1,
            "semester": 1,
            "regulation": "NCERT",
            "credits": 4,
            "description": "Number Systems, Polynomials, Coordinate Geometry, Linear Equations in Two Variables, Triangles, Quadrilaterals, Circles, Heron's Formula, Surface Areas & Volumes, and Statistics.",
            "icon_name": "Calculator",
            "is_active": True
        },
        {
            "code": "CBSE-SCI09",
            "name": "Class 9 Science",
            "short_name": "Class 9 Science",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_9",
            "academic_year": 1,
            "semester": 1,
            "regulation": "NCERT",
            "credits": 4,
            "description": "Matter in Our Surroundings, Atoms & Molecules, Structure of the Atom, Cell - The Fundamental Unit of Life, Tissues, Motion, Force and Laws of Motion, Gravitation, Work & Energy, and Sound.",
            "icon_name": "Atom",
            "is_active": True
        },
        {
            "code": "CBSE-SST09",
            "name": "Class 9 Social Science",
            "short_name": "Class 9 Social",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_9",
            "academic_year": 1,
            "semester": 1,
            "regulation": "NCERT",
            "credits": 4,
            "description": "History (India and the Contemporary World-I), Geography (Contemporary India-I), Political Science (Democratic Politics-I), and Economics (People as Resource, Poverty as Challenge).",
            "icon_name": "Globe",
            "is_active": True
        },
        {
            "code": "CBSE-ENG09",
            "name": "Class 9 English Language & Literature",
            "short_name": "Class 9 English",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_9",
            "academic_year": 1,
            "semester": 1,
            "regulation": "NCERT",
            "credits": 3,
            "description": "NCERT Beehive (Prose & Poetry), Moments Supplementary Reader, Reading Comprehension, Integrated Grammar, and Creative Writing Skills.",
            "icon_name": "BookOpen",
            "is_active": True
        }
    ]

    subject_ids = {}
    for sub in subjects:
        await db.subjects.update_one(
            {"code": sub["code"], "board_or_university_code": sub["board_or_university_code"]},
            {"$set": sub},
            upsert=True
        )
        s_doc = await db.subjects.find_one({"code": sub["code"]})
        subject_ids[sub["code"]] = str(s_doc["_id"])
    logger.info("Seeded %d subjects with persistent IDs", len(subjects))

    # 5. Units and Topics (for Data Structures CS301PC)
    ds_id = subject_ids.get("CS301PC")
    if ds_id:
        ds_units = [
            {"subject_id": ds_id, "unit_number": 1, "title": "Basic Concepts & Linked Lists", "description": "Asymptotic notations, singly linked lists, doubly linked lists, circular linked lists."},
            {"subject_id": ds_id, "unit_number": 2, "title": "Stacks & Queues", "description": "Stack ADT, array & linked implementations, infix to postfix conversion, queue variants."},
            {"subject_id": ds_id, "unit_number": 3, "title": "Trees & Binary Search Trees", "description": "Binary tree traversals, BST operations, AVL tree rotations, B-Trees."},
            {"subject_id": ds_id, "unit_number": 4, "title": "Graphs & Algorithms", "description": "Graph representation, BFS, DFS, minimum spanning trees, Prim's and Kruskal's algorithms."},
            {"subject_id": ds_id, "unit_number": 5, "title": "Sorting & Hashing", "description": "Quick sort, merge sort, heap sort, hash functions, collision resolution."}
        ]
        unit_ids = {}
        for u in ds_units:
            await db.syllabus_units.update_one(
                {"subject_id": ds_id, "unit_number": u["unit_number"]},
                {"$set": u},
                upsert=True
            )
            u_doc = await db.syllabus_units.find_one({"subject_id": ds_id, "unit_number": u["unit_number"]})
            unit_ids[u["unit_number"]] = str(u_doc["_id"])

        tree_unit_id = unit_ids.get(3)
        topics = [
            {"unit_id": tree_unit_id, "subject_id": ds_id, "topic_name": "Binary Tree Representation & Traversals", "order": 1, "is_important_for_exam": True, "estimated_study_minutes": 50},
            {"unit_id": tree_unit_id, "subject_id": ds_id, "topic_name": "Binary Search Tree (BST) Search & Insertion", "order": 2, "is_important_for_exam": True, "estimated_study_minutes": 45},
            {"unit_id": tree_unit_id, "subject_id": ds_id, "topic_name": "BST Deletion with Inorder Successor", "order": 3, "is_important_for_exam": True, "estimated_study_minutes": 55},
            {"unit_id": tree_unit_id, "subject_id": ds_id, "topic_name": "AVL Trees - Rotations (LL, RR, LR, RL)", "order": 4, "is_important_for_exam": True, "estimated_study_minutes": 60}
        ]
        topic_ids = {}
        for tp in topics:
            await db.syllabus_topics.update_one(
                {"unit_id": tree_unit_id, "topic_name": tp["topic_name"]},
                {"$set": tp},
                upsert=True
            )
            t_doc = await db.syllabus_topics.find_one({"unit_id": tree_unit_id, "topic_name": tp["topic_name"]})
            topic_ids[tp["topic_name"]] = str(t_doc["_id"])

    # 6. Verified Curated Educational Resources
    resources = [
        # --- CSE ---
        {
            "title": "JNTU-GV BTech CSE R23 Linear Algebra & Calculus (M1) Official Syllabus & Model Paper",
            "resource_type": "syllabus",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "cse",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntugv.edu.in/syllabus/r23_m1_cse.pdf",
            "file_size_bytes": 458000,
            "file_mime_type": "application/pdf",
            "source_contributor": "JNTU-GV Academic Directorate (incl. Sri Sivani College of Engg)",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 842,
            "created_at": datetime.utcnow()
        },
        {
            "title": "JNTU-GV CSE Programming for Problem Solving using C (PPS) Lab Manual & Code Repository",
            "resource_type": "lab_manual",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "cse",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntugv.edu.in/labs/pps_lab_manual.pdf",
            "file_size_bytes": 1820000,
            "file_mime_type": "application/pdf",
            "source_contributor": "Dept of CSE, Sri Sivani College of Engineering",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 920,
            "created_at": datetime.utcnow()
        },
        {
            "title": "JNTUK Data Structures & Algorithms Previous Year Question Papers (2022-2024)",
            "resource_type": "previous_paper",
            "education_level_code": "btech",
            "board_or_university_code": "jntuk",
            "branch_code": "cse",
            "semester": 1,
            "regulation": "R20",
            "file_url": "https://jntuk.edu.in/pyq/dsa_pyq.pdf",
            "file_size_bytes": 1240000,
            "file_mime_type": "application/pdf",
            "source_contributor": "JNTUK Examination Cell",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 650,
            "created_at": datetime.utcnow()
        },

        # --- AI & MACHINE LEARNING (AIML) ---
        {
            "title": "JNTU-GV BTech AI & ML R23 Mathematical Foundations & Python for Data Science Syllabus",
            "resource_type": "syllabus",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "aiml",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntugv.edu.in/syllabus/r23_aiml_foundations.pdf",
            "file_size_bytes": 520000,
            "file_mime_type": "application/pdf",
            "source_contributor": "JNTU-GV AI Curriculum Board",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 710,
            "created_at": datetime.utcnow()
        },
        {
            "title": "JNTUK AI & Machine Learning Lab Manual: NumPy, Pandas, Matplotlib & Scikit-learn",
            "resource_type": "lab_manual",
            "education_level_code": "btech",
            "board_or_university_code": "jntuk",
            "branch_code": "aiml",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntuk.edu.in/labs/aiml_lab_manual.pdf",
            "file_size_bytes": 2100000,
            "file_mime_type": "application/pdf",
            "source_contributor": "JNTUK Computer Faculty",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 890,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Andhra University (AU) AI & Data Engineering Mid & Semester Exam PYQs",
            "resource_type": "previous_paper",
            "education_level_code": "btech",
            "board_or_university_code": "au",
            "branch_code": "aiml",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://andhrauniversity.edu.in/pyq/ai_exam_papers.pdf",
            "file_size_bytes": 980000,
            "file_mime_type": "application/pdf",
            "source_contributor": "AU College of Engineering (A)",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 480,
            "created_at": datetime.utcnow()
        },

        # --- MECHANICAL ENGINEERING (MECH) ---
        {
            "title": "JNTU-GV BTech Mechanical Engineering R23 Engineering Mechanics Syllabus & Blueprint",
            "resource_type": "syllabus",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "mech",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntugv.edu.in/syllabus/r23_mech_engineering_mechanics.pdf",
            "file_size_bytes": 610000,
            "file_mime_type": "application/pdf",
            "source_contributor": "Dept of Mechanical Engg, Sri Sivani College of Engineering",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 640,
            "created_at": datetime.utcnow()
        },
        {
            "title": "JNTU-GV Engineering Thermodynamics Previous Mid-1 & Semester Examination Papers",
            "resource_type": "previous_paper",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "mech",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntugv.edu.in/pyq/mech_thermodynamics.pdf",
            "file_size_bytes": 1450000,
            "file_mime_type": "application/pdf",
            "source_contributor": "JNTU-GV Exam Branch",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 820,
            "created_at": datetime.utcnow()
        },
        {
            "title": "JNTUK Computer Aided Drafting (CAD) & Engineering Graphics Lab Manual (R23/R20)",
            "resource_type": "lab_manual",
            "education_level_code": "btech",
            "board_or_university_code": "jntuk",
            "branch_code": "mech",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntuk.edu.in/labs/cad_drafting_manual.pdf",
            "file_size_bytes": 3400000,
            "file_mime_type": "application/pdf",
            "source_contributor": "Mechanical Workshop Cell",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 910,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Andhra University (AU) Fluid Mechanics & Hydraulic Machinery Comprehensive Lecture Notes",
            "resource_type": "notes",
            "education_level_code": "btech",
            "board_or_university_code": "au",
            "branch_code": "mech",
            "semester": 1,
            "regulation": "R20",
            "file_url": "https://andhrauniversity.edu.in/notes/mech_fluid_mechanics.pdf",
            "file_size_bytes": 2650000,
            "file_mime_type": "application/pdf",
            "source_contributor": "AU Mechanical Faculty",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 730,
            "created_at": datetime.utcnow()
        },

        # --- CIVIL ENGINEERING (CIVIL) ---
        {
            "title": "JNTU-GV BTech Civil Engineering R23 Surveying & Geomatics Syllabus Blueprint",
            "resource_type": "syllabus",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "civil",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntugv.edu.in/syllabus/r23_civil_surveying.pdf",
            "file_size_bytes": 540000,
            "file_mime_type": "application/pdf",
            "source_contributor": "Dept of Civil Engineering, Sri Sivani College of Engg",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 560,
            "created_at": datetime.utcnow()
        },
        {
            "title": "JNTU-GV Strength of Materials (Mechanics of Solids) Semester PYQ with Solved Problems",
            "resource_type": "previous_paper",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "civil",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntugv.edu.in/pyq/civil_strength_materials.pdf",
            "file_size_bytes": 1620000,
            "file_mime_type": "application/pdf",
            "source_contributor": "Civil Examination Cell",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 780,
            "created_at": datetime.utcnow()
        },
        {
            "title": "JNTUK Surveying Field Practice & Total Station Lab Manual",
            "resource_type": "lab_manual",
            "education_level_code": "btech",
            "board_or_university_code": "jntuk",
            "branch_code": "civil",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntuk.edu.in/labs/surveying_lab_manual.pdf",
            "file_size_bytes": 2400000,
            "file_mime_type": "application/pdf",
            "source_contributor": "JNTUK Civil Engineering Lab",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 690,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Andhra University (AU) Building Materials & Concrete Technology Hand-written Notes",
            "resource_type": "notes",
            "education_level_code": "btech",
            "board_or_university_code": "au",
            "branch_code": "civil",
            "semester": 1,
            "regulation": "R20",
            "file_url": "https://andhrauniversity.edu.in/notes/concrete_tech.pdf",
            "file_size_bytes": 2980000,
            "file_mime_type": "application/pdf",
            "source_contributor": "AU Civil Faculty Forum",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 510,
            "created_at": datetime.utcnow()
        },

        # --- ELECTRONICS & COMMUNICATION (ECE) ---
        {
            "title": "JNTU-GV BTech ECE R23 Electronic Devices and Circuits (EDC) Syllabus & Question Bank",
            "resource_type": "syllabus",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "ece",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntugv.edu.in/syllabus/r23_ece_edc.pdf",
            "file_size_bytes": 580000,
            "file_mime_type": "application/pdf",
            "source_contributor": "Dept of ECE, Sri Sivani College of Engineering",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 880,
            "created_at": datetime.utcnow()
        },
        {
            "title": "JNTU-GV Network Analysis & Signals Previous Year Question Papers (2022-2024)",
            "resource_type": "previous_paper",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "ece",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntugv.edu.in/pyq/ece_network_analysis.pdf",
            "file_size_bytes": 1390000,
            "file_mime_type": "application/pdf",
            "source_contributor": "JNTU-GV Examinations Wing",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 940,
            "created_at": datetime.utcnow()
        },
        {
            "title": "JNTUK Electronic Devices and Circuits (EDC) & Simulation Lab Manual",
            "resource_type": "lab_manual",
            "education_level_code": "btech",
            "board_or_university_code": "jntuk",
            "branch_code": "ece",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntuk.edu.in/labs/edc_lab_manual.pdf",
            "file_size_bytes": 2200000,
            "file_mime_type": "application/pdf",
            "source_contributor": "JNTUK Electronics Cell",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 810,
            "created_at": datetime.utcnow()
        },

        # --- ELECTRICAL & ELECTRONICS (EEE) ---
        {
            "title": "JNTU-GV BTech EEE R23 Electrical Circuit Analysis (ECA) Syllabus Blueprint",
            "resource_type": "syllabus",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "eee",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntugv.edu.in/syllabus/r23_eee_eca.pdf",
            "file_size_bytes": 530000,
            "file_mime_type": "application/pdf",
            "source_contributor": "Dept of EEE, Sri Sivani College of Engineering",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 760,
            "created_at": datetime.utcnow()
        },
        {
            "title": "JNTU-GV Electrical Machines-I & Magnetic Circuits Previous Semester Question Papers",
            "resource_type": "previous_paper",
            "education_level_code": "btech",
            "board_or_university_code": "jntugv",
            "branch_code": "eee",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntugv.edu.in/pyq/eee_machines_pyq.pdf",
            "file_size_bytes": 1410000,
            "file_mime_type": "application/pdf",
            "source_contributor": "JNTU-GV Exam Branch",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 790,
            "created_at": datetime.utcnow()
        },
        {
            "title": "JNTUK Basic Electrical Engineering (BEE) & Measurements Lab Manual",
            "resource_type": "lab_manual",
            "education_level_code": "btech",
            "board_or_university_code": "jntuk",
            "branch_code": "eee",
            "semester": 1,
            "regulation": "R23",
            "file_url": "https://jntuk.edu.in/labs/bee_lab_manual.pdf",
            "file_size_bytes": 1950000,
            "file_mime_type": "application/pdf",
            "source_contributor": "JNTUK Electrical Laboratory",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 680,
            "created_at": datetime.utcnow()
        },

        {
            "title": "Class 9 Mathematics Complete NCERT Syllabus Blueprint & Chapter Weightage",
            "resource_type": "syllabus",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_9",
            "semester": 1,
            "regulation": "NCERT",
            "subject_id": subject_ids.get("CBSE-M09", "cbse_m09"),
            "file_url": "https://ncert.nic.in/syllabus.php",
            "file_size_bytes": 1150000,
            "file_mime_type": "application/pdf",
            "source_contributor": "CBSE Academic Board",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 482,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Class 9 Science (Physics & Chemistry) Formula Sheet & Concept Notes",
            "resource_type": "formula_sheet",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_9",
            "semester": 1,
            "regulation": "NCERT",
            "subject_id": subject_ids.get("CBSE-SCI09", "cbse_sci09"),
            "file_url": "https://ncert.nic.in/science-notes.pdf",
            "file_size_bytes": 940000,
            "file_mime_type": "application/pdf",
            "source_contributor": "Science Faculty Cell",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 390,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Class 9 Annual Examination Model Question Paper with Stepwise Solutions",
            "resource_type": "model_paper",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_9",
            "semester": 1,
            "regulation": "NCERT",
            "subject_id": subject_ids.get("CBSE-M09", "cbse_m09"),
            "file_url": "https://cbse.gov.in/sample-papers/class9.pdf",
            "file_size_bytes": 1420000,
            "file_mime_type": "application/pdf",
            "source_contributor": "National Examination Board",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 520,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Class 9 Science (Physics, Chemistry & Biology) Complete NCERT Syllabus Blueprint",
            "resource_type": "syllabus",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_9",
            "semester": 1,
            "regulation": "NCERT",
            "subject_id": subject_ids.get("CBSE-SCI09", "cbse_sci09"),
            "file_url": "https://ncert.nic.in/science-syllabus.pdf",
            "file_size_bytes": 1080000,
            "file_mime_type": "application/pdf",
            "source_contributor": "CBSE Curriculum Cell",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 465,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Class 9 Social Science Complete NCERT Blueprint & Question Pattern",
            "resource_type": "syllabus",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_9",
            "semester": 1,
            "regulation": "NCERT",
            "subject_id": subject_ids.get("CBSE-SST09", "cbse_sst09"),
            "file_url": "https://ncert.nic.in/sst-blueprint.pdf",
            "file_size_bytes": 980000,
            "file_mime_type": "application/pdf",
            "source_contributor": "NCERT Social Studies Wing",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 310,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Class 9 Science Annual Examination Model Paper with Scoring Key",
            "resource_type": "model_paper",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_9",
            "semester": 1,
            "regulation": "NCERT",
            "subject_id": subject_ids.get("CBSE-SCI09", "cbse_sci09"),
            "file_url": "https://cbse.gov.in/sample-papers/class9-science.pdf",
            "file_size_bytes": 1280000,
            "file_mime_type": "application/pdf",
            "source_contributor": "State Education Board",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 490,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Class 9 Mathematics Chapter-wise Formula Sheet & Algebraic Identities Handbook",
            "resource_type": "formula_sheet",
            "education_level_code": "school",
            "board_or_university_code": "cbse",
            "branch_code": "class_9",
            "semester": 1,
            "regulation": "NCERT",
            "subject_id": subject_ids.get("CBSE-M09", "cbse_m09"),
            "file_url": "https://ncert.nic.in/math-formulas.pdf",
            "file_size_bytes": 850000,
            "file_mime_type": "application/pdf",
            "source_contributor": "Math Academic Forum",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 610,
            "created_at": datetime.utcnow()
        }
    ]
    for r in resources:
        await db.resources.update_one({"title": r["title"]}, {"$set": r}, upsert=True)
    logger.info("Seeded %d verified educational resources", len(resources))

    # 7. Curated Real YouTube Learning Library
    # Legitimate verified YouTube videos from Abdul Bari, Neso Academy, GATE Smashers, Knowledge Gate
    videos = [
        {
            "title": "2.1.1 Introduction to Trees | Trees in Data Structure",
            "youtube_url": "https://www.youtube.com/watch?v=gcULXE7ViPu",
            "youtube_id": "gcULXE7ViPu",
            "channel_name": "Abdul Bari",
            "description": "Comprehensive visual breakdown of Tree data structure terminology: root, height, degree, ancestors, binary trees.",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "subject_id": ds_id,
            "topic_id": topic_ids.get("Binary Tree Representation & Traversals"),
            "language": "en",
            "difficulty_level": "beginner",
            "duration_seconds": 1054,
            "verification_status": "verified",
            "verification_date": datetime.utcnow(),
            "publication_status": "published",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Binary Tree Traversals (Inorder, Preorder, Postorder) with Recursive Code",
            "youtube_url": "https://www.youtube.com/watch?v=9Jry5-82I68",
            "youtube_id": "9Jry5-82I68",
            "channel_name": "Neso Academy",
            "description": "Clear step-by-step trace of binary tree depth-first traversals: Inorder (LNR), Preorder (NLR), and Postorder (LRN).",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "subject_id": ds_id,
            "topic_id": topic_ids.get("Binary Tree Representation & Traversals"),
            "language": "en",
            "difficulty_level": "beginner",
            "duration_seconds": 980,
            "verification_status": "verified",
            "verification_date": datetime.utcnow(),
            "publication_status": "published",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Binary Search Tree (BST) Operations - Insertion and Search Algorithms",
            "youtube_url": "https://www.youtube.com/watch?v=qH6yxkw0u78",
            "youtube_id": "qH6yxkw0u78",
            "channel_name": "Abdul Bari",
            "description": "Properties of binary search trees, time complexity comparisons, recursive vs iterative insertion algorithm.",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "subject_id": ds_id,
            "topic_id": topic_ids.get("Binary Search Tree (BST) Search & Insertion"),
            "language": "en",
            "difficulty_level": "intermediate",
            "duration_seconds": 1420,
            "verification_status": "verified",
            "verification_date": datetime.utcnow(),
            "publication_status": "published",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Database Normalization (1NF, 2NF, 3NF, BCNF) Made Easy",
            "youtube_url": "https://www.youtube.com/watch?v=GFQaEYEc8_8",
            "youtube_id": "GFQaEYEc8_8",
            "channel_name": "Knowledge Gate",
            "description": "Complete masterclass covering functional dependencies, candidate keys, and normalization anomalies.",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "subject_id": subject_ids.get("CS302PC", ds_id),
            "language": "en",
            "difficulty_level": "intermediate",
            "duration_seconds": 2100,
            "verification_status": "verified",
            "verification_date": datetime.utcnow(),
            "publication_status": "published",
            "created_at": datetime.utcnow()
        },
        {
            "title": "CPU Scheduling Algorithms in Operating Systems (FCFS, SJF, Round Robin)",
            "youtube_url": "https://www.youtube.com/watch?v=26QPDBe-NB8",
            "youtube_id": "26QPDBe-NB8",
            "channel_name": "Neso Academy",
            "description": "Detailed Gantt chart calculations for turnaround time, waiting time, and CPU utilization across scheduling algorithms.",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "subject_id": subject_ids.get("CS401PC", ds_id),
            "language": "en",
            "difficulty_level": "beginner",
            "duration_seconds": 1260,
            "verification_status": "verified",
            "verification_date": datetime.utcnow(),
            "publication_status": "published",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Python Programming Full Course in Telugu for Beginners",
            "youtube_url": "https://www.youtube.com/watch?v=Bf0p_ZJvW3w",
            "youtube_id": "Bf0p_ZJvW3w",
            "channel_name": "Telugu Web Guru",
            "description": "Complete Python programming fundamentals explained in Telugu: variables, loops, lists, dictionaries, and OOP concepts.",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "subject_id": ds_id,
            "language": "te",
            "difficulty_level": "beginner",
            "duration_seconds": 7200,
            "verification_status": "verified",
            "verification_date": datetime.utcnow(),
            "publication_status": "published",
            "created_at": datetime.utcnow()
        }
    ]
    for v in videos:
        await db.videos.update_one({"youtube_id": v["youtube_id"]}, {"$set": v}, upsert=True)
    logger.info("Seeded %d verified educational YouTube videos", len(videos))

    # 8. Career Pathways and Professional Roles
    career_paths = [
        {
            "slug": "class10-intermpc-btechcse",
            "title": "Class 10 → Intermediate MPC → BTech CSE → Software / AI Engineer",
            "entry_level_code": "school",
            "intermediate_step_codes": ["intermediate", "btech"],
            "target_education_level_code": "btech",
            "target_branch_code": "cse",
            "description": "The premier engineering track in India: excel in Class 10 Board exams, master +2 Mathematics/Physics in Intermediate MPC, qualify state/national entrances (JEE Main / TS EAMCET), and specialize in Computer Science.",
            "entrance_exams": ["JEE Main", "TS EAMCET", "AP EAPCET"],
            "display_order": 1
        },
        {
            "slug": "diploma-lateral-btechcse",
            "title": "Diploma (CME) → ECET Lateral Entry → BTech CSE 2nd Year",
            "entry_level_code": "diploma",
            "intermediate_step_codes": ["diploma", "btech"],
            "target_education_level_code": "btech",
            "target_branch_code": "cse",
            "description": "Practical hands-on polytechnic route: complete 3-year Diploma in Computer Engineering, secure top rank in state ECET, and enter directly into the 2nd year (Semester 2-1) of BTech CSE.",
            "entrance_exams": ["TS ECET", "AP ECET"],
            "display_order": 2
        }
    ]
    for cp in career_paths:
        await db.career_paths.update_one({"slug": cp["slug"]}, {"$set": cp}, upsert=True)

    career_roles = [
        {
            "role_code": "full_stack_dev",
            "title": "Full Stack Software Developer",
            "branch_codes": ["cse", "aiml", "cme"],
            "summary": "Engineers responsive frontend user interfaces, robust backend APIs, secure database architectures, and production cloud infrastructure.",
            "core_skills": ["Data Structures & Algorithms", "RESTful API Architecture", "Relational & NoSQL Database Design", "State Management", "CI/CD & Cloud Deployment"],
            "programming_languages": ["TypeScript / JavaScript", "Python", "Java", "SQL"],
            "frameworks_and_tools": ["Next.js / React", "FastAPI / Node.js", "MongoDB", "PostgreSQL", "Docker", "Git"],
            "learning_roadmap": [
                {"phase": 1, "title": "Core Foundations (Months 1–2)", "topics": ["HTML5/CSS3/Modern JS", "Python & DSA Fundamentals", "Git Version Control"], "recommended_duration_weeks": 8},
                {"phase": 2, "title": "Backend & Database Engineering (Months 3–4)", "topics": ["FastAPI / Express API design", "MongoDB modeling & indexing", "Authentication & JWTs"], "recommended_duration_weeks": 8},
                {"phase": 3, "title": "Production Frontend & Systems (Months 5–6)", "topics": ["Next.js App Router", "State management", "Dockerizing services", "Portfolio Capstone"], "recommended_duration_weeks": 8}
            ],
            "projects": [
                {"tier": "beginner", "title": "Personal Task & Study Time Tracker", "description": "Responsive CRUD web application with local storage persistence and priority filters.", "suggested_tech_stack": ["HTML", "Tailwind CSS", "JavaScript"]},
                {"tier": "intermediate", "title": "Academic Syllabus & Question Bank Repository", "description": "Full-stack resource management system with role-based uploads and document search.", "suggested_tech_stack": ["Next.js", "FastAPI", "MongoDB"]},
                {"tier": "advanced_capstone", "title": "Real-Time Collaborative Examination Simulator", "description": "Multi-tenant exam platform featuring live automated grading, question randomization, and audit logging.", "suggested_tech_stack": ["Next.js", "FastAPI", "MongoDB", "WebSockets", "Docker"]}
            ],
            "internship_preparation_checklist": [
                "Solve 150+ DSA problems on Arrays, Strings, Hashing, Trees, and DP",
                "Deploy at least 2 full-stack projects with live URLs on GitHub",
                "Clear resume highlighting GitHub commits, tech stack, and measurable impact",
                "Mock interviews on Core CS: DBMS normalization, OS process scheduling, Networks"
            ],
            "certifications": ["AWS Certified Cloud Practitioner", "Meta Full-Stack Professional Certificate"],
            "eligibility_notes": "BTech CSE, AIML, IT or Diploma CME with strong coding proficiency.",
            "industry_insights": "High nationwide demand across Bengaluru, Hyderabad, and Pune. Strong emphasis on system design and problem-solving.",
            "is_active": True
        },
        {
            "role_code": "class9_foundation",
            "title": "Class 9 & 10 Secondary School → Future Career Bridge",
            "branch_codes": ["class_9", "class_10", "school"],
            "summary": "Mastering 9th & 10th NCERT mathematics, science, logical reasoning, and choosing the optimal stream (+2 MPC for Engineering vs BiPC for Medicine vs Polytechnic).",
            "core_skills": ["Algebra & Euclidean Geometry", "Physics (Motion, Laws of Motion, Work)", "Chemistry Fundamentals (Atoms, Molecules)", "Logical Reasoning & NTSE Preparation", "Elementary Coding (Python / Scratch)"],
            "programming_languages": ["Python (Beginner)", "Scratch"],
            "frameworks_and_tools": ["Jupyter Notebooks", "Desmos Graphing", "GeoGebra"],
            "learning_roadmap": [
                {"phase": 1, "title": "Class 9 Conceptual Foundations (Term 1)", "topics": ["Number Systems & Polynomials", "Motion, Force & Laws of Motion", "Cells & Tissues", "Basic Python Syntax"], "recommended_duration_weeks": 16},
                {"phase": 2, "title": "Advanced Problem Solving & Olympiads (Term 2)", "topics": ["Linear Equations & Coordinate Geometry", "Work, Energy & Gravitation", "Atoms & Structure of Atom", "Logical Reasoning"], "recommended_duration_weeks": 16},
                {"phase": 3, "title": "Stream Decision Bridge & Board Prep", "topics": ["Comprehensive Class 9 Syllabus Revision", "Stream Bridge: MPC vs BiPC decision guide", "Annual Sample Examination Papers"], "recommended_duration_weeks": 16}
            ],
            "projects": [
                {"tier": "beginner", "title": "Interactive Geometry & Formula Calculator", "description": "Python or web script calculating surface area, volumes, and quadratic roots.", "suggested_tech_stack": ["Python", "Math Library"]},
                {"tier": "intermediate", "title": "Physics Laws of Motion Simulator", "description": "Visual demonstration of projectile motion and velocity-time graphs.", "suggested_tech_stack": ["Python", "Matplotlib"]},
                {"tier": "advanced_capstone", "title": "NTSE / Olympiad Quiz & Revision Application", "description": "Interactive multiple choice test engine with timer and answer explanations.", "suggested_tech_stack": ["HTML", "CSS", "JavaScript"]}
            ],
            "internship_preparation_checklist": [
                "Master 100% of NCERT Class 9 Mathematics & Science textbook exercises",
                "Solve past 5 years Olympiad (NSO/IMO) and NTSE Stage 1 question papers",
                "Build at least one beginner coding program in Python",
                "Decide stream preference (+2 Intermediate MPC, BiPC, or Polytechnic Diploma)"
            ],
            "certifications": ["Unified Council NSTSE Certificate", "Science Olympiad Foundation (SOF)"],
            "eligibility_notes": "Students currently studying in Class 8, 9, or 10.",
            "industry_insights": "Early mastery of mathematical logic and scientific method in Class 9 is the single biggest predictor of top ranks in JEE, NEET, and tech careers.",
            "is_active": True
        },
        {
            "role_code": "ai_ml_engineer",
            "title": "AI & Machine Learning Engineer",
            "branch_codes": ["cse", "aiml"],
            "summary": "Develops predictive models, data processing pipelines, neural network architectures, and production inference systems.",
            "core_skills": ["Linear Algebra & Probability", "Statistical Modeling", "Feature Engineering", "Deep Learning", "Model Deployment & Serving"],
            "programming_languages": ["Python", "SQL", "C++"],
            "frameworks_and_tools": ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "FastAPI", "Docker"],
            "learning_roadmap": [
                {"phase": 1, "title": "Mathematical Foundations", "topics": ["Linear Algebra", "Multivariate Calculus", "Probability & Statistics"], "recommended_duration_weeks": 6},
                {"phase": 2, "title": "Machine Learning Fundamentals", "topics": ["Supervised & Unsupervised Learning", "Evaluation Metrics", "scikit-learn"], "recommended_duration_weeks": 8},
                {"phase": 3, "title": "Deep Learning & Production", "topics": ["CNNs & Transformers", "PyTorch model training", "ONNX and FastAPI serving"], "recommended_duration_weeks": 10}
            ],
            "projects": [
                {"tier": "beginner", "title": "Student Exam Score Predictor", "description": "Regression model forecasting semester outcomes based on study time and past test scores.", "suggested_tech_stack": ["Python", "scikit-learn", "Streamlit"]},
                {"tier": "intermediate", "title": "Automated Document Classification for Question Papers", "description": "NLP text classifier organizing academic resources into subject categories.", "suggested_tech_stack": ["PyTorch", "FastAPI", "HuggingFace"]},
                {"tier": "advanced_capstone", "title": "Production Model Serving & Monitoring Pipeline", "description": "End-to-end ML pipeline with automated drift detection, model registry, and containerized API inference.", "suggested_tech_stack": ["PyTorch", "Docker", "FastAPI", "Prometheus"]}
            ],
            "internship_preparation_checklist": [
                "Master Python NumPy, Pandas vectorization",
                "Explain the math behind Gradient Descent, Backpropagation, and Cross-Entropy",
                "Host a working model demonstration on Hugging Face Spaces or custom web app"
            ],
            "certifications": ["DeepLearning.AI Machine Learning Specialization", "TensorFlow Developer Certificate"],
            "eligibility_notes": "BTech in CSE, AI/ML, Data Science, or related analytical disciplines.",
            "industry_insights": "Growing demand for engineers capable of bridging experimental Python notebooks with fast, robust backend API deployment.",
            "is_active": True
        }
    ]
    for cr in career_roles:
        await db.career_roles.update_one({"role_code": cr["role_code"]}, {"$set": cr}, upsert=True)
    logger.info("Seeded %d career pathways and professional roles", len(career_roles))

    # 9. Create Indexes
    await db.users.create_index("google_sub", unique=True)
    await db.users.create_index("email", unique=True)
    await db.student_profiles.create_index("user_id", unique=True)
    await db.subjects.create_index([("code", 1), ("board_or_university_code", 1), ("regulation", 1)], unique=True)
    await db.videos.create_index("youtube_id", unique=True)
    await db.study_sessions.create_index([("user_id", 1), ("started_at", -1)])
    await db.syllabus_progress.create_index([("user_id", 1), ("topic_id", 1)], unique=True)
    await db.tasks.create_index([("user_id", 1), ("status", 1), ("due_date", 1)])
    await db.bookmarks.create_index([("user_id", 1), ("item_type", 1), ("item_id", 1)], unique=True)
    logger.info("Successfully ensured all database indexes.")

    logger.info("Database seeding completed successfully.")

if __name__ == "__main__":
    asyncio.run(seed_data())
