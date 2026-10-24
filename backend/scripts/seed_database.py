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
        from app.database.mongodb import get_database
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
        {"code": "jntuh", "name": "Jawaharlal Nehru Technological University Hyderabad", "short_name": "JNTUH", "education_level_code": "btech", "state_or_national": "Telangana", "is_active": True},
        {"code": "jntuk", "name": "Jawaharlal Nehru Technological University Kakinada", "short_name": "JNTUK", "education_level_code": "btech", "state_or_national": "Andhra Pradesh", "is_active": True},
        {"code": "osmania", "name": "Osmania University", "short_name": "OU", "education_level_code": "btech", "state_or_national": "Telangana", "is_active": True},
        {"code": "sbtet", "name": "State Board of Technical Education and Training", "short_name": "SBTET", "education_level_code": "diploma", "state_or_national": "Telangana/AP", "is_active": True},
        {"code": "ts_bie", "name": "Telangana State Board of Intermediate Education", "short_name": "TS BIE", "education_level_code": "intermediate", "state_or_national": "Telangana", "is_active": True},
        {"code": "cbse", "name": "Central Board of Secondary Education", "short_name": "CBSE", "education_level_code": "school", "state_or_national": "National", "is_active": True}
    ]
    for b in boards_and_universities:
        await db.boards_and_universities.update_one({"code": b["code"]}, {"$set": b}, upsert=True)
    logger.info("Seeded %d boards and universities", len(boards_and_universities))

    # 3. Branches
    branches = [
        {"code": "cse", "name": "Computer Science & Engineering", "short_name": "CSE", "education_level_code": "btech", "description": "Core computing, data structures, algorithms, databases and systems"},
        {"code": "aiml", "name": "Artificial Intelligence & Machine Learning", "short_name": "AI/ML", "education_level_code": "btech", "description": "Intelligent systems, statistical learning, neural architectures"},
        {"code": "ece", "name": "Electronics & Communication Engineering", "short_name": "ECE", "education_level_code": "btech", "description": "Semiconductors, signal processing, communication networks"},
        {"code": "cme", "name": "Diploma in Computer Engineering", "short_name": "CME", "education_level_code": "diploma", "description": "Polytechnic computer engineering curriculum"},
        {"code": "mpc", "name": "Mathematics, Physics, Chemistry", "short_name": "MPC", "education_level_code": "intermediate", "description": "Standard engineering entrance preparatory stream"},
        {"code": "class_10", "name": "Secondary Class 10", "short_name": "Class 10", "education_level_code": "school", "description": "Board examination class"}
    ]
    for br in branches:
        await db.branches.update_one({"code": br["code"]}, {"$set": br}, upsert=True)
    logger.info("Seeded %d branches", len(branches))

    # 4. Subjects
    subjects = [
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
        {
            "title": "JNTUH BTech CSE R22 Data Structures Official Syllabus Copy",
            "resource_type": "syllabus",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "semester": 1,
            "regulation": "R22",
            "subject_id": ds_id,
            "file_url": "https://raw.githubusercontent.com/chetansai/study-blueprint-assets/main/syllabus_r22_ds.pdf",
            "file_size_bytes": 458000,
            "file_mime_type": "application/pdf",
            "source_contributor": "JNTUH Academic Directorate",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 142,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Data Structures Previous Year Question Paper (May 2024 Exam)",
            "resource_type": "previous_paper",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "semester": 1,
            "regulation": "R22",
            "subject_id": ds_id,
            "file_url": "https://raw.githubusercontent.com/chetansai/study-blueprint-assets/main/ds_pyq_2024.pdf",
            "file_size_bytes": 1240000,
            "file_mime_type": "application/pdf",
            "source_contributor": "University Examinations Branch",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 310,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Comprehensive Unit 3 Notes: Trees, BST & AVL Balance Rotations",
            "resource_type": "notes",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "semester": 1,
            "regulation": "R22",
            "subject_id": ds_id,
            "file_url": "https://raw.githubusercontent.com/chetansai/study-blueprint-assets/main/ds_unit3_notes.pdf",
            "file_size_bytes": 2890000,
            "file_mime_type": "application/pdf",
            "source_contributor": "Senior Faculty Review Board",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 528,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Data Structures Model Question Paper with Detailed Step-by-Step Marking Scheme",
            "resource_type": "model_paper",
            "education_level_code": "btech",
            "board_or_university_code": "jntuh",
            "branch_code": "cse",
            "semester": 1,
            "regulation": "R22",
            "subject_id": ds_id,
            "file_url": "https://raw.githubusercontent.com/chetansai/study-blueprint-assets/main/ds_model_paper.pdf",
            "file_size_bytes": 890000,
            "file_mime_type": "application/pdf",
            "source_contributor": "Academic Cell",
            "verification_status": "verified",
            "publication_status": "published",
            "download_count": 215,
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
