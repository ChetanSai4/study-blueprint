export interface DiplomaBranch {
  id: 'cme' | 'ece' | 'eee' | 'mech' | 'civil' | 'auto';
  label: string;
  name?: string;
  short: string;
  badge: string;
  color: string;
  ecet_bridge: {
    lateral_seat: string;
    top_colleges: string;
    rank_target: string;
    advantage: string;
  };
  core_subjects: Array<{ name: string; desc: string }>;
  psu_govt_jobs: Array<{ org: string; role: string; salary: string }>;
  industry_recruiters: string[];
  three_year_plan: Array<{ year: string; focus: string }>;
}

export const DIPLOMA_BRANCH_DETAILS: Record<string, DiplomaBranch> = {
  cme: {
    id: 'cme',
    label: '1. Computer Engineering (DCME)',
    short: 'DCME',
    badge: 'Software & IT',
    color: 'border-blue-300 bg-blue-50/70 text-blue-900',
    ecet_bridge: {
      lateral_seat: 'Direct Admission into 2nd Year (3rd Semester) B.Tech CSE / IT / AI&ML',
      top_colleges: 'JNTU-GV, JNTUK Kakinada, Andhra University (AU), Sri Sivani College of Engineering, GMRIT',
      rank_target: 'State ECET Rank < 1200 for government and top autonomous universities',
      advantage: 'Skips B.Tech 1st year chemistry/physics and jumps directly into Data Structures, DBMS, and Algorithms.'
    },
    core_subjects: [
      { name: 'Programming in C & Data Structures', desc: 'Pointers, linked lists, stacks, queues, and tree traversals with lab implementation.' },
      { name: 'Relational Database Management (DBMS)', desc: 'SQL queries, normalization, ER modeling, and transaction management in MySQL/Oracle.' },
      { name: 'Java & Object Oriented Programming', desc: 'Classes, inheritance, exception handling, multithreading, and GUI Swing applications.' },
      { name: 'Web Technologies & Internet of Things', desc: 'HTML5, CSS3, JavaScript, PHP, and interfacing sensors with microcontrollers.' }
    ],
    psu_govt_jobs: [
      { org: 'Indian Railways (RRB JE)', role: 'Junior Engineer (Information Technology)', salary: 'Level 6 (₹35,400 - ₹1,12,400)' },
      { org: 'ISRO / DRDO', role: 'Technical Assistant (Computer Science)', salary: 'Central Pay Matrix Level 7' },
      { org: 'State DISCOM / APGENCO', role: 'Sub-Engineer (IT & Billing Automation)', salary: 'State Cadre Sub-Engineer' }
    ],
    industry_recruiters: ['Tata Consultancy Services (TCS Ninja/Smart)', 'Infosys BPM & Operations', 'Wipro WILP', 'Cognizant', 'Tech Mahindra'],
    three_year_plan: [
      { year: '1st Year (C-20 Curriculum)', focus: 'Foundations of Computing, Digital Electronics, C Programming, and Basic Electrical.' },
      { year: '2nd Year (Branch Specialization)', focus: 'Data Structures, Operating Systems, Computer Networks, Java, and Database Systems.' },
      { year: '3rd Year (Industrial Training & ECET)', focus: '6-Month Mandatory Industrial Internship, Mini Project, and Daily State ECET Mock Test Practice.' }
    ]
  },
  ece: {
    id: 'ece',
    label: '2. Electronics & Communication (DECE)',
    short: 'DECE',
    badge: 'Hardware & Telecom',
    color: 'border-indigo-300 bg-indigo-50/70 text-indigo-900',
    ecet_bridge: {
      lateral_seat: 'Direct Admission into 2nd Year (3rd Semester) B.Tech ECE / EEE',
      top_colleges: 'JNTU-GV, AU College of Engineering, JNTUK, Sri Sivani College of Engineering, GMRIT',
      rank_target: 'State ECET Rank < 1500 for premier institutions',
      advantage: 'Direct entry into Microprocessors, Analog Circuits, and Signals & Systems.'
    },
    core_subjects: [
      { name: 'Electronic Devices & Amplifiers', desc: 'Diodes, BJTs, FETs, operational amplifiers, and frequency response analysis.' },
      { name: 'Microcontrollers & Embedded C (8051 / ARM)', desc: 'Assembly and Embedded C programming, timer interrupts, and ADC interfacing.' },
      { name: 'Digital Electronics & Logic Design', desc: 'K-Maps, flip-flops, counters, shift registers, and combinational logic circuits.' },
      { name: 'Communication Systems & Microwave', desc: 'AM/FM modulation, antennas, fiber optic communication, and satellite links.' }
    ],
    psu_govt_jobs: [
      { org: 'ISRO (SHAR / URSC)', role: 'Technical Assistant (Electronics)', salary: 'Pay Matrix Level 7' },
      { org: 'DRDO (RAC / CEPTAM)', role: 'Senior Technical Assistant - B (STA-B)', salary: 'Level 6 Central Pay' },
      { org: 'BEL (Bharat Electronics Ltd)', role: 'Technician / Junior Engineer', salary: 'Central PSU Scale' }
    ],
    industry_recruiters: ['Foxconn India', 'Schneider Electric', 'Dixon Technologies', 'Samsung Electronics', 'Honeywell'],
    three_year_plan: [
      { year: '1st Year (C-20 Curriculum)', focus: 'Basic Electronics, Circuit Theory, Engineering Drawing, and Workshop Practice.' },
      { year: '2nd Year (Core Electronics)', focus: 'Analog & Digital ICs, Microcontrollers, Communication Engineering, and PCB Design.' },
      { year: '3rd Year (Internship & ECET)', focus: 'Industrial Training at Telecom/VLSI unit, Hardware Project, and ECET ECE Rank Coaching.' }
    ]
  },
  eee: {
    id: 'eee',
    label: '3. Electrical & Electronics (DEEE)',
    short: 'DEEE',
    badge: 'Power & EV',
    color: 'border-amber-300 bg-amber-50/70 text-amber-900',
    ecet_bridge: {
      lateral_seat: 'Direct Admission into 2nd Year (3rd Semester) B.Tech EEE',
      top_colleges: 'JNTU-GV, Andhra University (AU), JNTUK Kakinada, Sri Sivani College of Engineering',
      rank_target: 'State ECET Rank < 1000 for top government engineering faculties',
      advantage: 'Enters directly into AC Machines, Power Systems, and Control Systems.'
    },
    core_subjects: [
      { name: 'DC & AC Electrical Machines', desc: 'Generators, alternators, 3-phase induction motors, and transformer efficiency testing.' },
      { name: 'Power System Generation & Transmission', desc: 'Hydro/thermal/solar plants, substations, insulators, and grid protection schemes.' },
      { name: 'Power Electronics & Industrial Drives', desc: 'Thyristors, inverters, choppers, and variable frequency motor drives.' },
      { name: 'Electrical Estimating & Utilization', desc: 'Domestic/industrial wiring, earthing methods, illumination, and EV charging points.' }
    ],
    psu_govt_jobs: [
      { org: 'State DISCOM / APTRANSCO / APGENCO', role: 'Sub-Engineer (Electrical Operations)', salary: 'State Electricity Board Pay' },
      { org: 'Indian Railways (RRB JE)', role: 'Junior Engineer (Traction / Electrical)', salary: 'Level 6 (₹35,400 - ₹1,12,400)' },
      { org: 'NTPC / PowerGrid (PGCIL)', role: 'Diploma Trainee (Electrical)', salary: 'Central PSU Package' }
    ],
    industry_recruiters: ['Tata Power', 'L&T Construction', 'Schneider Electric', 'ABB India', 'Siemens', 'Ather Energy'],
    three_year_plan: [
      { year: '1st Year', focus: 'Circuit Theory, Basics of Electrical Engineering, Engineering Physics, and Mechanical Workshops.' },
      { year: '2nd Year', focus: 'AC Machines, Transmission Lines, Power Electronics, and Electrical CAD Lab.' },
      { year: '3rd Year', focus: 'Substation Apprenticeship / Industrial Training, Switchgear Maintenance, and ECET Preparation.' }
    ]
  },
  mech: {
    id: 'mech',
    label: '4. Mechanical Engg (DME)',
    short: 'DME',
    badge: 'Manufacturing & CAD',
    color: 'border-rose-300 bg-rose-50/70 text-rose-900',
    ecet_bridge: {
      lateral_seat: 'Direct Admission into 2nd Year (3rd Semester) B.Tech Mechanical / Automobile',
      top_colleges: 'JNTU-GV, JNTUK, Andhra University (AU), Sri Sivani College of Engineering',
      rank_target: 'State ECET Rank < 1200',
      advantage: 'Skips general engineering and jumps straight into Fluid Mechanics, Thermodynamics, and Theory of Machines.'
    },
    core_subjects: [
      { name: 'Production Technology & Machine Tools', desc: 'Lathe, shaping, milling, grinding, CNC machine operation, and tool geometry.' },
      { name: 'Thermodynamics & IC Engines', desc: 'Otto/Diesel cycles, boiler performance, 2-stroke/4-stroke engine testing, and refrigeration.' },
      { name: 'Strength of Materials & Mechanics', desc: 'Bending moment, shearing force, torsion, and deflection of beams in mechanical members.' },
      { name: 'Computer Aided Drafting (AutoCAD / SolidWorks)', desc: '2D orthographic drafting, 3D part modeling, tolerances, and assembly drawings.' }
    ],
    psu_govt_jobs: [
      { org: 'Indian Railways (RRB ALP / JE)', role: 'Assistant Loco Pilot & Junior Engineer', salary: 'Level 4 to Level 6' },
      { org: 'BHEL / ONGC / IOCL / SAIL', role: 'Diploma Mechanical Trainee', salary: 'Central PSU Scale' },
      { org: 'Indian Navy / Indian Coast Guard', role: 'Yantrik (Mechanical Specialist)', salary: 'Defense Technical cadre' }
    ],
    industry_recruiters: ['Tata Motors', 'Mahindra & Mahindra', 'L&T Heavy Engineering', 'Hyundai Motors India', 'Bosch'],
    three_year_plan: [
      { year: '1st Year', focus: 'Workshop Technology (Carpentry, Fitting, Welding, Sheet Metal), Engineering Chemistry, and Drawing.' },
      { year: '2nd Year', focus: 'Thermal Engineering, Manufacturing Processes, Fluid Mechanics, and Machine Drawing.' },
      { year: '3rd Year', focus: 'Heavy Industry Apprenticeship, CNC Machining Lab, and Intensive State ECET Rank Preparation.' }
    ]
  },
  civil: {
    id: 'civil',
    label: '5. Civil Engineering (DCE)',
    short: 'DCE',
    badge: 'Construction & Survey',
    color: 'border-emerald-300 bg-emerald-50/70 text-emerald-900',
    ecet_bridge: {
      lateral_seat: 'Direct Admission into 2nd Year (3rd Semester) B.Tech Civil Engineering',
      top_colleges: 'JNTU-GV, Andhra University (AU), JNTUK, Sri Sivani College of Engineering',
      rank_target: 'State ECET Rank < 1000',
      advantage: 'Direct entry into Structural Analysis, Surveying-II, and Concrete Technology.'
    },
    core_subjects: [
      { name: 'Surveying with Total Station & Levelling', desc: 'Traversing, contouring, electronic theodolite, and GPS-enabled total station surveys.' },
      { name: 'Reinforced Concrete (RCC) & Steel Design', desc: 'Design of lintels, slabs, columns, footings, and structural connection details.' },
      { name: 'Building Planning, Estimation & Costing', desc: 'Architectural floor plans, rate analysis, quantity takeoff, and municipal bylaws.' },
      { name: 'Hydraulics & Water Resources Engg', desc: 'Fluid flow in open channels, pipe networks, weir discharge, and irrigation canals.' }
    ],
    psu_govt_jobs: [
      { org: 'SSC Junior Engineer (SSC JE)', role: 'Junior Engineer Civil (CPWD / MES / BRO)', salary: 'Level 6 (₹35,400 - ₹1,12,400)' },
      { org: 'State Village / Ward Secretariats', role: 'Engineering Assistant (Civil)', salary: 'State Government Scale' },
      { org: 'National Highway Authority (NHAI)', role: 'Site Inspection Technical Assistant', salary: 'Central Highway Authority' }
    ],
    industry_recruiters: ['L&T Construction', 'Shapoorji Pallonji', 'Afcons Infrastructure', 'NCC Urban', 'Sobha Developers'],
    three_year_plan: [
      { year: '1st Year', focus: 'Building Materials (Cement, Bricks, Concrete), Engineering Mechanics, and Surveying-I.' },
      { year: '2nd Year', focus: 'RCC Design, Transportation Engineering, Soil Mechanics, and AutoCAD 2D Drafting.' },
      { year: '3rd Year', focus: 'Site Quality Control Training at Mega Construction Project + State ECET Rank Booster Study.' }
    ]
  },
  auto: {
    id: 'auto',
    label: '6. Automobile Engg (DAE)',
    short: 'DAE',
    badge: 'Automotive & EV',
    color: 'border-teal-300 bg-teal-50/70 text-teal-900',
    ecet_bridge: {
      lateral_seat: 'Direct Admission into 2nd Year (3rd Semester) B.Tech Automobile / Mechanical',
      top_colleges: 'JNTU-GV, Andhra University (AU), JNTUK, Sri Sivani College of Engineering',
      rank_target: 'State ECET Rank < 800',
      advantage: 'Direct entry into Vehicle Dynamics, Chassis Design, and Automotive Transmission.'
    },
    core_subjects: [
      { name: 'Automobile Engines & Fuel Injection', desc: 'CRDI diesel engines, MPFI petrol systems, turbocharging, and emission control (BS-VI).' },
      { name: 'Automobile Chassis & Transmission', desc: 'Clutch, synchromesh gearbox, propeller shaft, differential, and ABS brakes.' },
      { name: 'Electric & Hybrid Vehicle Technology', desc: 'Lithium battery packs, BLDC traction motors, regenerative braking, and EV chargers.' },
      { name: 'Automobile Servicing & Workshop Practice', desc: 'Engine tuning, wheel alignment, computerized diagnostic scanners, and air-conditioning.' }
    ],
    psu_govt_jobs: [
      { org: 'State Road Transport (APSRTC / TSRTC)', role: 'Assistant Depot Mechanic / Junior Supervisor', salary: 'State Transport Corporation' },
      { org: 'Motor Vehicle Department (RTO)', role: 'Assistant Motor Vehicle Inspector (AMVI)', salary: 'State Transport Dept Gazetted/Non-Gaz' },
      { org: 'Indian Army Corps of EME', role: 'Vehicle Mechanic Technical Entry', salary: 'Defense Technical' }
    ],
    industry_recruiters: ['Tata Motors Commercial Vehicles', 'Ashok Leyland', 'Maruti Suzuki', 'Ola Electric', 'TVS Motor Company'],
    three_year_plan: [
      { year: '1st Year', focus: 'Engineering Graphics, Workshop Technology, Metallurgy, and Basic Mechanical Engineering.' },
      { year: '2nd Year', focus: 'Engine Systems, Chassis Components, Electrical Diagnostics, and CAD Lab.' },
      { year: '3rd Year', focus: 'Authorized Dealership / OEM Plant Internship + State ECET Preparation.' }
    ]
  }
};
