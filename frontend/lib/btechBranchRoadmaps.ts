export interface BTechBranchRoadmap {
  id: string;
  branch_code: string;
  name: string;
  short_name: string;
  tagline: string;
  overview: string;
  syllabus_pdf_url: string;
  syllabus_pdf_title: string;
  syllabus_code: string;
  regulation: string;
  average_package: string;
  highest_package: string;
  core_competencies: string[];
  simulation_tools: string[];
  programming_languages: string[];
  psu_recruiters: string[];
  corporate_recruiters: string[];
  four_year_plan: {
    year: number;
    title: string;
    stage_name: string;
    theme: string;
    semesters: {
      sem_number: number;
      sem_name: string;
      core_subjects: string[];
      labs: string[];
      key_milestone: string;
    }[];
    tools_to_learn: string[];
    certification: string;
  }[];
  featured_projects: {
    tier: 'Beginner' | 'Intermediate' | 'Capstone';
    title: string;
    description: string;
    tools: string[];
  }[];
  competitive_exams: {
    exam_name: string;
    description: string;
    eligibility_timing: string;
  }[];
}

export const BTECH_BRANCH_ROADMAPS: Record<string, BTechBranchRoadmap> = {
  // =========================================================================
  // ELECTRICAL & ELECTRONICS ENGINEERING (EEE)
  // =========================================================================
  eee: {
    id: 'btech_eee',
    branch_code: 'eee',
    name: 'Electrical & Electronics Engineering (EEE)',
    short_name: 'EEE',
    tagline: 'Power Systems, Electric Vehicle (EV) Drivetrains, Smart Grids & Industrial Automation',
    overview: 'Electrical and Electronics Engineering covers power generation, high-voltage transmission, electric vehicle motor drives, renewable solar/wind integration, power electronics converters, and embedded microcontroller automation. EEE graduates possess versatile mastery across heavy electrical power and modern electronic controls.',
    syllabus_pdf_url: '/docs/jntugv_eee_eca.pdf',
    syllabus_pdf_title: 'JNTU-GV B.Tech EEE R23 Electrical Circuit Analysis (ECA) Official Syllabus Copy',
    syllabus_code: 'R23-EEE-1102',
    regulation: 'R23 / R20 JNTU-GV & Affiliated Colleges',
    average_package: '₹6.2 LPA - ₹9.5 LPA',
    highest_package: '₹22.5 LPA (Texas Instruments / Tesla / Schneider)',
    core_competencies: [
      'Electric Circuit Analysis & Synthesis',
      'AC & DC Machines (Motors, Generators, Transformers)',
      'Power Electronics (Inverters, Choppers, Cycloconverters)',
      'Electric Vehicle (EV) Battery Management Systems (BMS)',
      'Power System Transmission, Fault Analysis & Switchgear',
      'Control Systems (Root Locus, Bode Plots, State-Space)',
      'PLC & SCADA Industrial Automation',
      'Renewable Energy Integration (Solar PV & Wind Energy)'
    ],
    simulation_tools: [
      'MATLAB / Simulink (Simscape Electrical)',
      'LTspice / PSpice',
      'ETAP (Power System Load Flow & Short Circuit)',
      'PSCAD (Transient Electromagnetic Analysis)',
      'Ansys Maxwell (Electromagnetic Finite Element Analysis)',
      'Proteus & KiCad PCB Designer',
      'Siemens TIA Portal (PLC Ladder Programming)'
    ],
    programming_languages: [
      'Embedded C (ARM / TI C2000 DSP)',
      'MATLAB Scripting',
      'Python for Power System Optimization',
      'PLC Ladder Logic (IEC 61131-3)'
    ],
    psu_recruiters: [
      'Power Grid Corporation of India (PGCIL)',
      'National Thermal Power Corporation (NTPC)',
      'Bharat Heavy Electricals Limited (BHEL)',
      'Indian Space Research Organisation (ISRO)',
      'Nuclear Power Corporation (NPCIL)',
      'Steel Authority of India (SAIL)',
      'Indian Railways (RRB Senior Section Engineer)'
    ],
    corporate_recruiters: [
      'Schneider Electric',
      'ABB Group',
      'Siemens Energy',
      'Larsen & Toubro (L&T Power & Electrical)',
      'Tesla / Ather Energy / Tata Motors EV',
      'Texas Instruments (Power Management ICs)',
      'Tata Power & Adani Transmission'
    ],
    four_year_plan: [
      {
        year: 1,
        title: '1st Year: Engineering Foundations & Circuit Fundamentals',
        stage_name: 'Year 1 (Sem 1 & 2)',
        theme: 'Mathematical Rigor, Electric Circuit Laws, and Foundational Science',
        semesters: [
          {
            sem_number: 1,
            sem_name: 'Semester 1-1',
            core_subjects: [
              'Linear Algebra & Calculus (Mathematics-1)',
              'Electrical Circuit Analysis (ECA)',
              'Engineering Physics / Applied Physics',
              'Programming for Problem Solving using C (PPS)'
            ],
            labs: [
              'Basic Electrical Engineering (BEE) Lab',
              'C Programming Computer Practice Lab',
              'Physics Experimental Rig Lab'
            ],
            key_milestone: 'Master KVL, KCL, Mesh/Nodal analysis, and verify network theorems on breadboard with multimeters and oscilloscopes.'
          },
          {
            sem_number: 2,
            sem_name: 'Semester 1-2',
            core_subjects: [
              'Differential Equations & Vector Calculus (Mathematics-2)',
              'Basic Electronics & Semiconductor Devices',
              'Engineering Chemistry & Battery Materials',
              'Engineering Graphics & CAD Drafting'
            ],
            labs: [
              'Electronics Devices & Circuits (EDC) Lab',
              'Engineering Workshop & Electrical Wiring Practice',
              'Applied Chemistry Testing Lab'
            ],
            key_milestone: 'Maintain 8.5+ SGPA, understand diode/transistor biasing, and achieve zero academic backlogs.'
          }
        ],
        tools_to_learn: ['LTspice', 'C Programming (GCC/Linux)', 'AutoCAD Electrical Basics'],
        certification: 'NPTEL Basic Electric Circuits (IIT Madras)'
      },
      {
        year: 2,
        title: '2nd Year: Core Electrical Machines & Electro-Magnetic Fields',
        stage_name: 'Year 2 (Sem 3 & 4)',
        theme: 'Rotating Machinery, Magnetic Circuits, Analog Electronics & Network Theory',
        semesters: [
          {
            sem_number: 3,
            sem_name: 'Semester 2-1',
            core_subjects: [
              'Electrical Machines - I (DC Machines & Single/Three Phase Transformers)',
              'Electromagnetic Fields (EMF Theory & Maxwell Equations)',
              'Analog Electronic Circuits (Op-Amps & Active Filters)',
              'Complex Variables & Numerical Transform Methods'
            ],
            labs: [
              'Electrical Machines - I Laboratory (Swinburne & Brake Tests)',
              'Analog Electronics Circuit Design Lab'
            ],
            key_milestone: 'Conduct open circuit, short circuit, and load tests on DC shunt/series motors and 5 kVA transformers.'
          },
          {
            sem_number: 4,
            sem_name: 'Semester 2-2',
            core_subjects: [
              'Electrical Machines - II (Induction Motors & Synchronous Alternators)',
              'Digital Electronics & Logic Design (Sequential/Combinational)',
              'Thermal Engineering & Fluid Dynamics for Power Plants',
              'Managerial Economics & Financial Analysis'
            ],
            labs: [
              'Electrical Machines - II Laboratory (Synchronizing Alternators)',
              'Digital Logic Design & Simulation Lab'
            ],
            key_milestone: 'Understand circle diagrams for induction motors, parallel operation of alternators, and start GATE EE preparation.'
          }
        ],
        tools_to_learn: ['MATLAB Simulink (Simscape Power)', 'KiCad PCB Designer', 'Proteus'],
        certification: 'NPTEL Electrical Machines (IIT Kharagpur)'
      },
      {
        year: 3,
        title: '3rd Year: Power Systems, Power Electronics & Industrial Control',
        stage_name: 'Year 3 (Sem 5 & 6)',
        theme: 'High-Power Semiconductor Converters, Grid Transmission & Feedback Systems',
        semesters: [
          {
            sem_number: 5,
            sem_name: 'Semester 3-1',
            core_subjects: [
              'Power Electronics (SCR, MOSFET, IGBT, Inverters & DC-DC Converters)',
              'Power Systems - I (Generation, Transmission Line Modeling & Corona)',
              'Control Systems (Transfer Functions, Bode Plots & PID Controllers)',
              'Microprocessors & Microcontrollers (8051 & ARM Cortex-M)'
            ],
            labs: [
              'Power Electronics Converter Rig Lab',
              'Microcontroller & Embedded Hardware Lab',
              'Control Systems MATLAB Simulation Lab'
            ],
            key_milestone: 'Design buck-boost DC-DC converter with closed-loop PID control and PWM gate drivers.'
          },
          {
            sem_number: 6,
            sem_name: 'Semester 3-2',
            core_subjects: [
              'Power Systems - II (Symmetrical/Unsymmetrical Fault Analysis & Stability)',
              'Electric Drives & Motor Control (V/f Control, Vector Control)',
              'Signals & Systems Analysis',
              'Professional Elective: Renewable Solar/Wind Energy Systems'
            ],
            labs: [
              'Power Systems Simulation Lab (ETAP / MATLAB)',
              'Electric Motor Drives & Inverter Testing Lab'
            ],
            key_milestone: 'Secure a Summer Internship in a Power Plant, Substation, or EV Automotive firm (Tata Motors/Ather/ABB).'
          }
        ],
        tools_to_learn: ['ETAP Power Flow', 'PSCAD Electromagnetic Simulator', 'Texas Instruments DSP Code Composer'],
        certification: 'Siemens Certified Industrial Automation Specialist'
      },
      {
        year: 4,
        title: '4th Year: EV Technology, Smart Grids & Capstone Placements',
        stage_name: 'Year 4 (Sem 7 & 8)',
        theme: 'Electric Mobility Engineering, High Voltage Switchgear & Career Launch',
        semesters: [
          {
            sem_number: 7,
            sem_name: 'Semester 4-1',
            core_subjects: [
              'Electric Vehicle (EV) Technology & Powertrain Design',
              'Power System Operation, Protection & Digital Relays',
              'High Voltage Engineering (Impulse Generator & Breakdown in Dielectrics)',
              'Open Elective: Machine Learning for Smart Grid Optimization'
            ],
            labs: [
              'Power System Protection & Digital Relay Testing Lab',
              'EV Simulation & Battery Testing Rig Lab'
            ],
            key_milestone: 'Appear for on-campus core placement interviews and attempt GATE Electrical mock test series.'
          },
          {
            sem_number: 8,
            sem_name: 'Semester 4-2',
            core_subjects: [
              'Smart Grids & Distributed Energy Resource Management (DERM)',
              'Industrial IoT & Supervisory Control (SCADA)',
              'Major Capstone Industry Engineering Project',
              'Comprehensive Viva-Voce Examination'
            ],
            labs: [
              'Industry Project Demonstration & Hardware Viva',
              'Full-scale Grid Telemetry Rig Test'
            ],
            key_milestone: 'Fabricate functional Capstone Hardware Prototype (e.g., Solar MPPT Inverter with BMS) and secure placement offer.'
          }
        ],
        tools_to_learn: ['PLC SCADA TIA Portal', 'CAN-Bus Analyzer', 'Simscape Driveline'],
        certification: 'GATE Electrical Engineering All-India Rank / Certified Energy Auditor'
      }
    ],
    featured_projects: [
      {
        tier: 'Beginner',
        title: 'Solar Photovoltaic MPPT Charger with LCD Telemetry',
        description: 'Microcontroller-driven Buck Converter with Perturb & Observe algorithm tracking peak power point of a 50W solar panel under changing irradiance.',
        tools: ['Arduino / STM32', 'LTspice', 'MOSFET Gate Driver', 'C++']
      },
      {
        tier: 'Intermediate',
        title: 'Lithium-Ion Battery Management System (BMS) with Thermal Protection',
        description: 'Multi-cell battery pack monitoring circuit executing active cell balancing, State of Charge (SoC) estimation, and over-current cutoff via CAN-bus communication.',
        tools: ['MATLAB Simulink', 'Embedded C', 'CAN-bus', 'KiCad']
      },
      {
        tier: 'Capstone',
        title: 'Field-Oriented Control (FOC) Inverter for EV Permanent Magnet Motor',
        description: 'Complete 3-phase SVPWM inverter driving a PMSM traction motor with regenerative braking, torque ripple minimization, and digital resolver feedback.',
        tools: ['TI TMS320F28379D DSP', 'MATLAB Simscape', 'IGBT Power Stack', 'ETAP']
      }
    ],
    competitive_exams: [
      {
        exam_name: 'GATE Electrical Engineering (EE)',
        description: 'Primary gateway for M.Tech admissions at IITs/IISc and executive engineer recruitment in Maharatna PSUs (PGCIL, NTPC, BHEL, IOCL).',
        eligibility_timing: '3rd Year (Pre-Final) & 4th Year (Final Year)'
      },
      {
        exam_name: 'Engineering Services Examination (UPSC ESE / IES)',
        description: 'Prestigious Group-A Gazetted Officer appointments in Indian Railway Service of Electrical Engineers (IRSEE) and Central Power Engineering Service.',
        eligibility_timing: 'Final Year & Post-Graduation'
      },
      {
        exam_name: 'State Electricity Transmission & Distribution (TRANSCO / GENCO)',
        description: 'Assistant Executive Engineer (AEE) recruitments in state electrical utilities (APTRANSCO, TSTRANSCO, KPTCL, MSEDCL).',
        eligibility_timing: 'Graduating Final Year Students'
      }
    ]
  },

  // =========================================================================
  // ELECTRONICS & COMMUNICATION ENGINEERING (ECE)
  // =========================================================================
  ece: {
    id: 'btech_ece',
    branch_code: 'ece',
    name: 'Electronics & Communication Engineering (ECE)',
    short_name: 'ECE',
    tagline: 'VLSI Chip Design, Embedded Microchips, 5G Wireless & Signal Processing',
    overview: 'Electronics and Communication Engineering bridges nano-scale semiconductor device physics, RTL microchip architecture, FPGA synthesizers, high-speed 5G/6G RF communications, and real-time embedded systems firmware.',
    syllabus_pdf_url: '/docs/jntugv_ece_edc.pdf',
    syllabus_pdf_title: 'JNTU-GV B.Tech ECE R23 Electronic Devices and Circuits (EDC) Official Syllabus',
    syllabus_code: 'R23-ECE-1102',
    regulation: 'R23 / R20 JNTU-GV & Affiliated Colleges',
    average_package: '₹7.5 LPA - ₹12.0 LPA',
    highest_package: '₹34.0 LPA (Qualcomm / Nvidia / Intel / AMD)',
    core_competencies: [
      'CMOS VLSI Design & Static Timing Analysis (STA)',
      'Verilog / SystemVerilog RTL Synthesis',
      'Embedded C & Real-Time Operating Systems (RTOS)',
      'Digital Signal Processing (DSP) & Image Processing',
      'RF Antennas, Microwave & 5G MIMO Communications',
      'FPGA Architecture (Xilinx / Altera)',
      'ARM Cortex Microcontroller Peripherals (SPI, I2C, UART)'
    ],
    simulation_tools: [
      'Cadence Virtuoso / Synopsys EDA',
      'Xilinx Vivado & ModelSim',
      'MATLAB & Simulink Signal Processing Toolbox',
      'STM32CubeIDE & Keil uVision',
      'Ansys HFSS (Antenna & High Frequency Simulation)'
    ],
    programming_languages: [
      'Verilog HDL & SystemVerilog',
      'Embedded C & C++',
      'Python for Automation & Verification',
      'Assembly (ARM / RISC-V)'
    ],
    psu_recruiters: [
      'ISRO (Scientist/Engineer-SC)',
      'DRDO (Defense Research & Dev Org)',
      'BEL (Bharat Electronics Limited)',
      'ECIL (Electronics Corp of India)',
      'BHEL Electronics Division'
    ],
    corporate_recruiters: [
      'Qualcomm',
      'Texas Instruments',
      'Intel',
      'Nvidia',
      'Broadcom',
      'Synopsys',
      'MediaTek',
      'NXP Semiconductors'
    ],
    four_year_plan: [
      {
        year: 1,
        title: '1st Year: Electronic Principles & Basic Circuits',
        stage_name: 'Year 1 (Sem 1 & 2)',
        theme: 'Semiconductors, Matrix Algebra, Circuit Theory & C Programming',
        semesters: [
          {
            sem_number: 1,
            sem_name: 'Semester 1-1',
            core_subjects: ['Linear Algebra & Calculus (M1)', 'Electronic Devices & Circuits (EDC)', 'Engineering Physics', 'Programming for Problem Solving using C'],
            labs: ['Electronic Devices Lab (V-I Diode & BJT)', 'C Programming Practice Lab'],
            key_milestone: 'Measure diode cut-in voltage, dynamic resistance, and BJT CE characteristics on hardware breadboard.'
          },
          {
            sem_number: 2,
            sem_name: 'Semester 1-2',
            core_subjects: ['Differential Equations & Complex Variables', 'Network Analysis & Transmission Lines', 'Applied Chemistry', 'Engineering Graphics'],
            labs: ['Network Analysis Simulation Lab', 'Engineering Workshop & Soldering Practice'],
            key_milestone: 'Verify Thevenin, Norton, and Maximum Power Transfer theorems across DC and AC frequency domains.'
          }
        ],
        tools_to_learn: ['LTspice', 'C Programming', 'GNU Octave'],
        certification: 'NPTEL Semiconductor Devices & Circuits'
      },
      {
        year: 2,
        title: '2nd Year: Digital RTL, Signals & Analog ICs',
        stage_name: 'Year 2 (Sem 3 & 4)',
        theme: 'Digital Logic, Operational Amplifiers, Fourier Transforms & Verilog',
        semesters: [
          {
            sem_number: 3,
            sem_name: 'Semester 2-1',
            core_subjects: ['Analog Circuits (Op-Amps, Oscillators, Multivibrators)', 'Digital Logic Design & Verilog HDL', 'Signals & Systems', 'Probability Theory & Stochastic Processes'],
            labs: ['Analog Circuits Laboratory', 'Digital System Design with Verilog HDL Lab'],
            key_milestone: 'Synthesize 4-bit synchronous counters and priority encoders in Verilog on Xilinx Vivado.'
          },
          {
            sem_number: 4,
            sem_name: 'Semester 2-2',
            core_subjects: ['Electromagnetic Fields & Waves (Maxwell Equations)', 'Analog & Pulse Communications', 'Computer Architecture & Organization', 'Control Systems Engineering'],
            labs: ['Analog Communications Modulation Lab (AM, FM, PM)', 'IC Applications & 555 Timer Lab'],
            key_milestone: 'Observe AM/FM envelope detection and spectrum harmonics using Digital Storage Oscilloscopes.'
          }
        ],
        tools_to_learn: ['Xilinx Vivado', 'ModelSim', 'KiCad'],
        certification: 'Arm Accredited Engineer (AAE)'
      },
      {
        year: 3,
        title: '3rd Year: VLSI Design, DSP & Microcontrollers',
        stage_name: 'Year 3 (Sem 5 & 6)',
        theme: 'CMOS IC Fabrication, Digital Signal Processors, ARM Embedded Firmware',
        semesters: [
          {
            sem_number: 5,
            sem_name: 'Semester 3-1',
            core_subjects: ['VLSI Design (CMOS Layout, Lambda Rules & Delay Modeling)', 'Microprocessors & Microcontrollers (ARM Cortex / 8051)', 'Digital Signal Processing (FFT, FIR/IIR Filters)', 'Antennas & Wave Propagation'],
            labs: ['VLSI Design CAD Lab (Cadence / Tanner)', 'ARM Microcontroller Interfacing Lab', 'DSP Simulation using MATLAB Lab'],
            key_milestone: 'Design CMOS inverter layout adhering to DRC/LVS rules and calculate parasitic propagation delays.'
          },
          {
            sem_number: 6,
            sem_name: 'Semester 3-2',
            core_subjects: ['Digital Communications (QPSK, QAM, BER Analysis)', 'Embedded Systems & Real-Time OS (FreeRTOS)', 'Microwave & Radar Engineering', 'Professional Elective: FPGA Architecture'],
            labs: ['Digital Communications Lab', 'Microwave Waveguide Bench Lab', 'FreeRTOS Embedded Systems Lab'],
            key_milestone: 'Secure Core VLSI / Embedded Internship (Qualcomm / Texas Instruments / NXP).'
          }
        ],
        tools_to_learn: ['Cadence Virtuoso', 'STM32CubeIDE', 'FreeRTOS'],
        certification: 'Cadence Certified Associate - Digital IC Design'
      },
      {
        year: 4,
        title: '4th Year: 5G/Wireless Systems & Core Placements',
        stage_name: 'Year 4 (Sem 7 & 8)',
        theme: 'Cellular 5G MIMO, SoC Verification, Capstone Project & Placements',
        semesters: [
          {
            sem_number: 7,
            sem_name: 'Semester 4-1',
            core_subjects: ['Cellular & Mobile Communications (5G NR, OFDM, Massive MIMO)', 'Optical Fiber Communications', 'SystemVerilog for UVM Functional Verification', 'Open Elective: Edge AI & TinyML'],
            labs: ['Optical Communications & Fiber Splicing Lab', 'SystemVerilog Testbench Verification Lab'],
            key_milestone: 'Appear for Core Semiconductor campus placement rounds (Digital Design / Verification / Embedded Firmware).'
          },
          {
            sem_number: 8,
            sem_name: 'Semester 4-2',
            core_subjects: ['Satellite Communications & GNSS', 'Major Industry Capstone Project', 'Technical Seminar & Viva Voce'],
            labs: ['Hardware-in-the-Loop Capstone Project Demonstration'],
            key_milestone: 'Tape-out FPGA prototype of a 32-bit RISC-V processor core with UART peripheral.'
          }
        ],
        tools_to_learn: ['SystemVerilog UVM', 'Ansys HFSS', 'Wireshark RF'],
        certification: 'GATE ECE Top 500 AIR / IEEE Embedded Systems Specialist'
      }
    ],
    featured_projects: [
      {
        tier: 'Beginner',
        title: 'Smart Environmental IoT Node with BLE Telemetry',
        description: 'Ultra low-power sensor system sampling temperature, humidity, and gas concentration, streaming to mobile via BLE.',
        tools: ['STM32', 'FreeRTOS', 'BLE 5.0', 'C']
      },
      {
        tier: 'Intermediate',
        title: '32-Bit Pipelined RISC-V Processor on FPGA',
        description: 'Synthesizing a 5-stage instruction pipeline (Fetch, Decode, Execute, Memory, Writeback) in Verilog with hazard detection.',
        tools: ['Verilog HDL', 'Xilinx Vivado', 'Basys 3 FPGA', 'ModelSim']
      },
      {
        tier: 'Capstone',
        title: 'OFDM Wireless Transceiver with FFT Coprocessor',
        description: 'Complete baseband physical layer architecture featuring QAM mapping, IFFT/FFT acceleration, and channel estimation.',
        tools: ['SystemVerilog', 'MATLAB Simulink', 'Xilinx Zynq SoC', 'Linux']
      }
    ],
    competitive_exams: [
      {
        exam_name: 'GATE Electronics & Communication (EC)',
        description: 'Gateway for IIT Master degrees (VLSI / Communication Systems) and scientist positions in ISRO, DRDO, and BEL.',
        eligibility_timing: '3rd & 4th Year'
      },
      {
        exam_name: 'ISRO Centralised Recruitment Board (ICRB)',
        description: 'Direct scientist-SC appointments for satellite avionics, radar transceivers, and deep space communication payloads.',
        eligibility_timing: 'Graduating 4th Year B.Tech Students'
      }
    ]
  },

  // =========================================================================
  // COMPUTER SCIENCE & ENGINEERING (CSE)
  // =========================================================================
  cse: {
    id: 'btech_cse',
    branch_code: 'cse',
    name: 'Computer Science & Engineering (CSE)',
    short_name: 'CSE',
    tagline: 'Full Stack Web, Cloud Microservices, Distributed Systems & Core Algorithms',
    overview: 'Computer Science & Engineering develops production software architects, high-performance systems engineers, distributed cloud developers, and algorithms specialists powering global internet infrastructures.',
    syllabus_pdf_url: '/docs/jntugv_cse_linear_algebra_m1.pdf',
    syllabus_pdf_title: 'JNTU-GV B.Tech CSE R23 Mathematics-1 & Calculus Official Syllabus Copy',
    syllabus_code: 'R23-BS-1101',
    regulation: 'R23 / R20 JNTU-GV & Affiliated Colleges',
    average_package: '₹8.0 LPA - ₹15.0 LPA',
    highest_package: '₹44.0 LPA (Google / Microsoft / Amazon / Atlassian)',
    core_competencies: [
      'Data Structures & Advanced Algorithms (Graphs, DP, Trees)',
      'Relational & NoSQL Database Internals (PostgreSQL, MongoDB)',
      'Full Stack Architecture (React, Next.js, Node.js, FastAPI)',
      'Operating Systems Internals (Threads, Synchronization, Virtual Memory)',
      'Computer Networks (TCP/IP, HTTP/3, WebSockets, DNS)',
      'Distributed Systems & Cloud Microservices (Docker, Kubernetes, AWS)',
      'System Design (Load Balancing, Caching, Sharding, CAP Theorem)'
    ],
    simulation_tools: [
      'Docker Desktop & Kubernetes (k8s)',
      'Postman / Insomnia API Studio',
      'Linux Kernel CLI & Bash Scripting',
      'Git & GitHub Actions CI/CD',
      'AWS Cloud Console & Terraform'
    ],
    programming_languages: [
      'Java (Spring Boot / Core)',
      'C++ (STL / Competitive Programming)',
      'Python',
      'TypeScript / JavaScript',
      'SQL'
    ],
    psu_recruiters: [
      'ISRO Central Computer Center',
      'NIC (National Informatics Centre)',
      'BARC Computer Division',
      'DRDO CAIR (Center for AI & Robotics)',
      'CDAC (Center for Dev of Advanced Computing)'
    ],
    corporate_recruiters: [
      'Google',
      'Microsoft',
      'Amazon',
      'Oracle',
      'Adobe',
      'Cisco',
      'Goldman Sachs',
      'ServiceNow',
      'Infosys / TCS / Wipro (Digital Roles)'
    ],
    four_year_plan: [
      {
        year: 1,
        title: '1st Year: Algorithmic Foundations & C/C++ Programming',
        stage_name: 'Year 1 (Sem 1 & 2)',
        theme: 'Problem Solving, Discrete Math, Memory Models & Computational Thinking',
        semesters: [
          {
            sem_number: 1,
            sem_name: 'Semester 1-1',
            core_subjects: ['Linear Algebra & Calculus (M1)', 'Programming for Problem Solving using C', 'Engineering Physics', 'Engineering Graphics'],
            labs: ['C Programming Practice Lab', 'Physics Lab', 'IT Workshop Lab'],
            key_milestone: 'Solve 100+ basic algorithm problems (pointers, arrays, recursion) and master Linux shell.'
          },
          {
            sem_number: 2,
            sem_name: 'Semester 1-2',
            core_subjects: ['Differential Equations & Numerical Methods', 'Data Structures through C/C++', 'Basic Electrical & Electronics', 'Applied Chemistry'],
            labs: ['Data Structures Laboratory (Linked Lists, Stacks, Queues)', 'BEE Lab'],
            key_milestone: 'Implement Linked Lists, Binary Trees, and Sorting algorithms from scratch in C++.'
          }
        ],
        tools_to_learn: ['Git & GitHub', 'VS Code', 'Linux CLI'],
        certification: 'HackerRank 5-Star Problem Solving'
      },
      {
        year: 2,
        title: '2nd Year: Core Computer Science Foundations',
        stage_name: 'Year 2 (Sem 3 & 4)',
        theme: 'DBMS, Operating Systems, Java OOP & Advanced Data Structures',
        semesters: [
          {
            sem_number: 3,
            sem_name: 'Semester 2-1',
            core_subjects: ['Object Oriented Programming through Java', 'Database Management Systems (DBMS)', 'Discrete Mathematics & Graph Theory', 'Digital Logic Design'],
            labs: ['Java Programming Lab', 'Database Management Systems SQL Lab'],
            key_milestone: 'Design normalized SQL databases (3NF/BCNF) and develop modular OOP applications in Java.'
          },
          {
            sem_number: 4,
            sem_name: 'Semester 2-2',
            core_subjects: ['Design & Analysis of Algorithms (DAA)', 'Operating Systems (Processes, Deadlocks, Paging)', 'Software Engineering & Agile', 'Formal Languages & Automata Theory (FLAT)'],
            labs: ['Algorithms Analysis Lab (Greedy, Dynamic Programming)', 'Operating Systems POSIX System Calls Lab'],
            key_milestone: 'Solve 150+ LeetCode problems across Graphs and DP; write multi-threaded C programs.'
          }
        ],
        tools_to_learn: ['PostgreSQL', 'Docker Basics', 'IntelliJ IDEA'],
        certification: 'Oracle Certified Professional Java Developer'
      },
      {
        year: 3,
        title: '3rd Year: Full Stack Web, Networks & Cloud Systems',
        stage_name: 'Year 3 (Sem 5 & 6)',
        theme: 'Distributed APIs, Computer Networks, Compilers & Microservices',
        semesters: [
          {
            sem_number: 5,
            sem_name: 'Semester 3-1',
            core_subjects: ['Computer Networks (TCP/IP, Routing Algorithms)', 'Web Technologies (HTML, CSS, JS, React)', 'Compiler Design (Lex, Yacc, AST Parsing)', 'Professional Elective: Cloud Computing'],
            labs: ['Computer Networks Packet Sniffing Lab (Wireshark, Socket Programming)', 'Full Stack Web Development Lab'],
            key_milestone: 'Build and deploy a full-stack Next.js + FastAPI application with live database and JWT authentication.'
          },
          {
            sem_number: 6,
            sem_name: 'Semester 3-2',
            core_subjects: ['Cryptography & Network Security', 'Cloud Infrastructure & DevOps', 'Machine Learning Foundations', 'Professional Elective: Distributed Systems'],
            labs: ['Cloud DevOps CI/CD Lab (Docker, GitHub Actions)', 'Security Penetration Testing Lab'],
            key_milestone: 'Crack technical internships in product software companies with system design portfolio.'
          }
        ],
        tools_to_learn: ['Next.js', 'FastAPI', 'AWS / Vercel', 'Postman'],
        certification: 'AWS Certified Solutions Architect Associate'
      },
      {
        year: 4,
        title: '4th Year: System Design, Capstones & Campus Placements',
        stage_name: 'Year 4 (Sem 7 & 8)',
        theme: 'Large-Scale Architectures, High-Concurrency APIs & Job Placements',
        semesters: [
          {
            sem_number: 7,
            sem_name: 'Semester 4-1',
            core_subjects: ['High-Level System Design & Microservices', 'Big Data Analytics (Hadoop / Spark)', 'Professional Ethics in Computing', 'Elective: Advanced Cloud Native Apps'],
            labs: ['System Design Benchmark Lab', 'Capstone Project Architecture Phase'],
            key_milestone: 'Complete campus placement coding rounds and interview loops.'
          },
          {
            sem_number: 8,
            sem_name: 'Semester 4-2',
            core_subjects: ['Major Industry Capstone Project', 'Technical Seminar & Viva Voce'],
            labs: ['Production Deployment & Load Testing Defense'],
            key_milestone: 'Deploy production capstone supporting 1,000+ concurrent users with automated CI/CD.'
          }
        ],
        tools_to_learn: ['Kubernetes', 'Redis', 'Kafka', 'Prometheus'],
        certification: 'Certified Kubernetes Administrator (CKA)'
      }
    ],
    featured_projects: [
      {
        tier: 'Beginner',
        title: 'Real-Time Markdown Academic Notes Editor',
        description: 'Single-page browser application featuring instant GitHub-flavored markdown preview, word count telemetry, and LocalStorage auto-save.',
        tools: ['Next.js', 'Tailwind CSS', 'TypeScript']
      },
      {
        tier: 'Intermediate',
        title: 'Distributed University Resource Sharing API',
        description: 'RESTful API with role-based access control, presigned file uploads, rate limiting, and PostgreSQL full-text search indexing.',
        tools: ['FastAPI', 'PostgreSQL', 'Docker', 'Redis']
      },
      {
        tier: 'Capstone',
        title: 'High-Concurrency Examination Engine with Auto-Proctoring',
        description: 'Microservice-based examination portal supporting 5,000 live students, automated real-time grading, WebSocket heartbeats, and audit trails.',
        tools: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker', 'WebSockets', 'AWS']
      }
    ],
    competitive_exams: [
      {
        exam_name: 'GATE Computer Science & IT (CS)',
        description: 'Top national exam for M.Tech admissions at IIT Bombay/IIT Delhi/IISc and scientist roles in ISRO, DRDO, BARC.',
        eligibility_timing: '3rd & 4th Year'
      }
    ]
  },

  // =========================================================================
  // MECHANICAL ENGINEERING (MECH)
  // =========================================================================
  mech: {
    id: 'btech_mech',
    branch_code: 'mech',
    name: 'Mechanical Engineering (MECH)',
    short_name: 'Mechanical',
    tagline: 'Thermal Power, CAD/CAM Design, Robotics, Automotive & Computational Fluid Dynamics',
    overview: 'Mechanical Engineering shapes thermodynamic energy systems, aerodynamic structures, automated robotic assembly cells, CNC precision machining, and finite element stress analysis for automotive, aerospace, and energy sectors.',
    syllabus_pdf_url: '/docs/jntugv_mech_engineering_mechanics.pdf',
    syllabus_pdf_title: 'JNTU-GV B.Tech Mechanical Engineering R23 Engineering Mechanics Syllabus',
    syllabus_code: 'R23-MEC-1102',
    regulation: 'R23 / R20 JNTU-GV & Affiliated Colleges',
    average_package: '₹5.8 LPA - ₹9.0 LPA',
    highest_package: '₹20.0 LPA (Tata Motors / Mercedes-Benz / L&T / ISRO)',
    core_competencies: [
      'Engineering Mechanics & Strength of Materials',
      'Applied Thermodynamics, Heat Transfer & Refrigeration',
      'Fluid Mechanics & Hydraulic Machinery',
      'Computer Aided Machine Drawing (CAD / SolidWorks)',
      'Finite Element Analysis (FEA / ANSYS Mechanical)',
      'Computational Fluid Dynamics (CFD / ANSYS Fluent)',
      'Manufacturing Technology, Welding & CNC Machining',
      'Kinematics & Dynamics of Machinery'
    ],
    simulation_tools: [
      'SolidWorks & CATIA',
      'ANSYS Mechanical (Structural FEA)',
      'ANSYS Fluent (Thermal / Fluid CFD)',
      'AutoCAD Mechanical',
      'MATLAB Simulink Driveline'
    ],
    programming_languages: [
      'Python for Numerical Modeling',
      'MATLAB for Kinematic Synthesis',
      'G-Code & M-Code for CNC'
    ],
    psu_recruiters: [
      'ISRO (VSSC / SDSC SHAR)',
      'DRDO (Defense Research Labs)',
      'BHEL (Thermal Power Equipment)',
      'ONGC (Oil & Natural Gas Corp)',
      'Indian Oil (IOCL)',
      'BARC (Bhabha Atomic Research Centre)'
    ],
    corporate_recruiters: [
      'Tata Motors',
      'Larsen & Toubro (L&T Heavy Engineering)',
      'Mercedes-Benz R&D India',
      'Mahindra & Mahindra',
      'Maruti Suzuki',
      'Thermax',
      'Cummins India'
    ],
    four_year_plan: [
      {
        year: 1,
        title: '1st Year: Mechanics, Calculus & Workshop Foundations',
        stage_name: 'Year 1 (Sem 1 & 2)',
        theme: 'Statics, Force Vectors, Material Science & Engineering Drawing',
        semesters: [
          {
            sem_number: 1,
            sem_name: 'Semester 1-1',
            core_subjects: ['Linear Algebra & Calculus (M1)', 'Engineering Mechanics (Statics & Dynamics)', 'Engineering Physics', 'Basic Civil & Mechanical Engineering'],
            labs: ['Engineering Workshop Practice Lab (Carpentry, Fitting, Welding)', 'Physics Experimental Lab'],
            key_milestone: 'Master free body diagrams, moments, centroid, and friction equilibrium equations.'
          },
          {
            sem_number: 2,
            sem_name: 'Semester 1-2',
            core_subjects: ['Differential Equations & Numerical Methods', 'Engineering Chemistry & Fuels', 'Computer Aided Engineering Graphics', 'Programming for Problem Solving using C'],
            labs: ['AutoCAD Computer Drafting Lab', 'C Programming Practice Lab'],
            key_milestone: 'Draft isometric views, projections of solids, and sectional views in CAD software.'
          }
        ],
        tools_to_learn: ['AutoCAD', 'SolidWorks 3D Modeling Basics'],
        certification: 'Autodesk Certified Professional - AutoCAD'
      },
      {
        year: 2,
        title: '2nd Year: Thermodynamics, Strength of Materials & Manufacturing',
        stage_name: 'Year 2 (Sem 3 & 4)',
        theme: 'First/Second Laws, Stress-Strain Mechanics, Casting & Machine Tools',
        semesters: [
          {
            sem_number: 3,
            sem_name: 'Semester 2-1',
            core_subjects: ['Thermodynamics (Pure Substances & Gas Cycles)', 'Mechanics of Solids (Strength of Materials)', 'Production Technology & Foundry', 'Metallurgy & Material Science'],
            labs: ['Mechanics of Solids Lab (Tensile, Hardness, Torsion Tests)', 'Production Technology Machine Lab'],
            key_milestone: 'Construct SFD and BMD diagrams for beams and calculate factor of safety.'
          },
          {
            sem_number: 4,
            sem_name: 'Semester 2-2',
            core_subjects: ['Applied Thermodynamics & IC Engines', 'Fluid Mechanics & Hydraulic Machinery', 'Kinematics of Machinery (Mechanisms & Inversions)', 'Machine Drawing with Geometric Tolerancing'],
            labs: ['Fluid Mechanics & Turbines Lab (Pelton, Francis, Kaplan)', 'IC Engines Thermal Performance Lab'],
            key_milestone: 'Determine thermal efficiency of diesel engines and calculate turbine specific speed.'
          }
        ],
        tools_to_learn: ['SolidWorks Parts & Assemblies', 'ANSYS Mechanical Basics'],
        certification: 'SolidWorks Associate (CSWA)'
      },
      {
        year: 3,
        title: '3rd Year: Heat Transfer, Machine Design & Dynamics',
        stage_name: 'Year 3 (Sem 5 & 6)',
        theme: 'Conduction/Convection, Gears/Shafts Design, FEA Simulation & Vibrations',
        semesters: [
          {
            sem_number: 5,
            sem_name: 'Semester 3-1',
            core_subjects: ['Design of Machine Members - I (Shafts, Keys, Couplings, Fasteners)', 'Heat Transfer (Conduction, Convection, Radiation, Heat Exchangers)', 'Dynamics of Machinery (Balancing, Governors, Gyroscope)', 'Industrial Engineering & Operations Research'],
            labs: ['Heat Transfer Experimental Lab', 'Dynamics of Machinery & Vibrations Lab'],
            key_milestone: 'Design a flanged shaft coupling adhering to ASME safety codes and calculate natural vibration frequency.'
          },
          {
            sem_number: 6,
            sem_name: 'Semester 3-2',
            core_subjects: ['Design of Machine Members - II (Gears, Bearings, Clutches)', 'Finite Element Methods (FEM / FEA Theory)', 'Metrology & Quality Assurance', 'Professional Elective: CAD/CAM & CNC'],
            labs: ['Computer Aided Engineering Simulation Lab (ANSYS)', 'CNC Programming & Machine Tools Lab'],
            key_milestone: 'Secure summer core internship in automotive OEM or thermal power plant.'
          }
        ],
        tools_to_learn: ['ANSYS Mechanical', 'ANSYS Fluent CFD', 'Mastercam CNC'],
        certification: 'ANSYS Certified Mechanical Professional'
      },
      {
        year: 4,
        title: '4th Year: Advanced Automotive, Robotics & Capstone Placements',
        stage_name: 'Year 4 (Sem 7 & 8)',
        theme: 'Electric Vehicles, Robotics Automation, Capstone Project & Placements',
        semesters: [
          {
            sem_number: 7,
            sem_name: 'Semester 4-1',
            core_subjects: ['Computational Fluid Dynamics (CFD)', 'Automotive Engineering & Electric Vehicles', 'Industrial Robotics & Automation', 'Elective: Renewable Energy Technologies'],
            labs: ['CFD Simulation Lab', 'Robotics Kinematics & Pneumatics Lab'],
            key_milestone: 'Execute aerodynamic drag coefficient simulation of automotive chassis in ANSYS Fluent.'
          },
          {
            sem_number: 8,
            sem_name: 'Semester 4-2',
            core_subjects: ['Major Industry Capstone Project', 'Technical Seminar & Viva Voce'],
            labs: ['Hardware-in-the-Loop Capstone Project Demonstration'],
            key_milestone: 'Fabricate working mechanical prototype (e.g., Pneumatic sorting robot or Solar thermal regenerator).'
          }
        ],
        tools_to_learn: ['SolidWorks Simulation', 'G-Code Optimization', 'MATLAB Simscape'],
        certification: 'GATE Mechanical Engineering Top Rank'
      }
    ],
    featured_projects: [
      {
        tier: 'Beginner',
        title: 'Automated Scotch-Yoke Mechanism Model',
        description: 'CAD modeling and 3D simulation of Scotch-Yoke mechanism converting rotational motion to linear harmonic motion.',
        tools: ['SolidWorks', 'Motion Study', 'AutoCAD']
      },
      {
        tier: 'Intermediate',
        title: 'Structural Stress Optimization of Aircraft Wing Spar',
        description: 'Finite element stress and deformation analysis of an aircraft wing spar under simulated gust aerodynamic loads.',
        tools: ['ANSYS Mechanical', 'SolidWorks', 'FEA']
      },
      {
        tier: 'Capstone',
        title: 'Aerodynamic Drag Minimization & Thermal Heat Exchanger for EV',
        description: 'Coupled CFD and thermal simulation optimizing liquid cooling plate for lithium battery modules in electric vehicles.',
        tools: ['ANSYS Fluent', 'CATIA', 'MATLAB', 'CFD']
      }
    ],
    competitive_exams: [
      {
        exam_name: 'GATE Mechanical Engineering (ME)',
        description: 'Primary pathway for M.Tech at IITs and executive engineer recruitment in Maharatnas (ISRO, BHEL, ONGC, NTPC).',
        eligibility_timing: '3rd & 4th Year'
      }
    ]
  },

  // =========================================================================
  // CIVIL ENGINEERING (CIVIL)
  // =========================================================================
  civil: {
    id: 'btech_civil',
    branch_code: 'civil',
    name: 'Civil Engineering (CIVIL)',
    short_name: 'Civil',
    tagline: 'Structural Design, Smart Transportation, Geotechnical & BIM Infrastructure',
    overview: 'Civil Engineering plans, designs, analyzes, and constructs vital infrastructure including earthquake-resistant skyscrapers, highways, bridges, dams, smart cities, and sustainable environmental water systems.',
    syllabus_pdf_url: '/docs/jntugv_civil_surveying.pdf',
    syllabus_pdf_title: 'JNTU-GV B.Tech Civil Engineering R23 Surveying & Geomatics Syllabus',
    syllabus_code: 'R23-CIV-1103',
    regulation: 'R23 / R20 JNTU-GV & Affiliated Colleges',
    average_package: '₹5.5 LPA - ₹8.5 LPA',
    highest_package: '₹18.0 LPA (L&T Construction / Tata Projects / Afcons / NHAI)',
    core_competencies: [
      'Structural Analysis & Design (Reinforced Concrete & Steel)',
      'Surveying & Total Station / GPS Geomatics',
      'Geotechnical & Foundation Engineering',
      'Highway & Transportation Engineering',
      'Building Information Modeling (BIM / Revit)',
      'Fluid Mechanics & Water Resources Engineering',
      'Construction Planning & Project Management (CPPM)'
    ],
    simulation_tools: [
      'STAAD.Pro (Structural Analysis)',
      'ETABS (High-Rise Building Design)',
      'Autodesk Revit Architecture (BIM)',
      'AutoCAD Civil 3D',
      'Primavera P6 & MS Project'
    ],
    programming_languages: [
      'Python for Structural Optimization',
      'MATLAB for Finite Difference Hydraulics'
    ],
    psu_recruiters: [
      'National Highways Authority of India (NHAI)',
      'Central Public Works Department (CPWD / IES)',
      'NBCC (National Buildings Construction Corp)',
      'Rail Vikas Nigam Limited (RVNL)',
      'ISRO Civil Engineering Wing',
      'Airport Authority of India (AAI)'
    ],
    corporate_recruiters: [
      'Larsen & Toubro (L&T Construction)',
      'Tata Projects',
      'Afcons Infrastructure',
      'Shapoorji Pallonji',
      'Hindustan Construction Company (HCC)',
      'GMR Infrastructure'
    ],
    four_year_plan: [
      {
        year: 1,
        title: '1st Year: Foundations & Engineering Surveying',
        stage_name: 'Year 1 (Sem 1 & 2)',
        theme: 'Calculus, Statics, Surveying Instruments & Engineering Drawing',
        semesters: [
          {
            sem_number: 1,
            sem_name: 'Semester 1-1',
            core_subjects: ['Linear Algebra & Calculus (M1)', 'Surveying & Geomatics', 'Engineering Physics', 'Basic Electrical & Mechanical Engineering'],
            labs: ['Surveying Field Practice Lab (Compass, Auto-Level)', 'Engineering Physics Lab'],
            key_milestone: 'Master Fly levelling, benchmark transfer, and contour plotting across field terrain.'
          },
          {
            sem_number: 2,
            sem_name: 'Semester 1-2',
            core_subjects: ['Differential Equations & Calculus', 'Engineering Mechanics', 'Building Materials & Construction', 'Engineering Graphics'],
            labs: ['Building Materials Testing Lab', 'Computer Aided Drafting CAD Lab'],
            key_milestone: 'Test compressive strength of bricks, cement soundness, and draft floor plans in AutoCAD.'
          }
        ],
        tools_to_learn: ['AutoCAD 2D Drafting', 'Total Station Field Operations'],
        certification: 'Autodesk Certified User - AutoCAD'
      },
      {
        year: 2,
        title: '2nd Year: Solid Mechanics & Concrete Technology',
        stage_name: 'Year 2 (Sem 3 & 4)',
        theme: 'Strength of Materials, Fluid Mechanics, IS 456 Concrete Mix Design',
        semesters: [
          {
            sem_number: 3,
            sem_name: 'Semester 2-1',
            core_subjects: ['Strength of Materials - I (Beams, Stresses, Mohr Circle)', 'Fluid Mechanics', 'Concrete Technology & Mix Proportioning', 'Advanced Theodolite Surveying'],
            labs: ['Strength of Materials Lab (Universal Testing Machine UTM)', 'Concrete Technology Lab (Slump, Compaction Factor)'],
            key_milestone: 'Design concrete mix for M25/M30 grade according to IS 10262:2019 standards.'
          },
          {
            sem_number: 4,
            sem_name: 'Semester 2-2',
            core_subjects: ['Strength of Materials - II (Torsion, Columns, Thin Cylinders)', 'Hydraulics & Open Channel Machinery', 'Structural Analysis - I (Determinate Structures)', 'Geotechnical Engineering - I (Soil Mechanics)'],
            labs: ['Fluid Mechanics & Hydraulic Machinery Lab', 'Soil Mechanics Lab (Atterberg Limits, Permeability)'],
            key_milestone: 'Perform soil compaction test and determine direct shear angle of internal friction.'
          }
        ],
        tools_to_learn: ['STAAD.Pro Basics', 'Autodesk Civil 3D'],
        certification: 'Bentley Certified Structural Modeler'
      },
      {
        year: 3,
        title: '3rd Year: Structural RC Design, Steel & Highways',
        stage_name: 'Year 3 (Sem 5 & 6)',
        theme: 'Limit State Design (IS 456 & IS 800), Foundation Soils & Highway Pavements',
        semesters: [
          {
            sem_number: 5,
            sem_name: 'Semester 3-1',
            core_subjects: ['Design of Reinforced Concrete Structures (Slabs, Beams, Columns)', 'Structural Analysis - II (Slope Deflection, Moment Distribution)', 'Foundation Engineering (Shallow/Deep Piles)', 'Environmental Engineering (Water Treatment)'],
            labs: ['Reinforced Concrete Structural Detailing Lab', 'Environmental Engineering Water Testing Lab'],
            key_milestone: 'Calculate reinforcement detailing for continuous RCC beams adhering to SP-34 guidelines.'
          },
          {
            sem_number: 6,
            sem_name: 'Semester 3-2',
            core_subjects: ['Design of Steel Structures (Tension Members, Columns, Roof Trusses)', 'Transportation Engineering (Highway Alignment & Pavements)', 'Water Resources & Irrigation Engineering', 'Professional Elective: BIM Architecture'],
            labs: ['Transportation Materials Testing Lab (Bitumen Penetration, Aggregate Crushing)', 'Computer Structural Analysis Lab (ETABS/STAAD)'],
            key_milestone: 'Model and analyze multi-story commercial building under seismic loads in ETABS.'
          }
        ],
        tools_to_learn: ['ETABS Structural', 'Autodesk Revit BIM', 'Primavera P6'],
        certification: 'Autodesk Certified Professional - Revit Structure'
      },
      {
        year: 4,
        title: '4th Year: Smart Infrastructure & Capstone Placements',
        stage_name: 'Year 4 (Sem 7 & 8)',
        theme: 'Bridge Design, Estimation & Costing, Project Management & Job Launch',
        semesters: [
          {
            sem_number: 7,
            sem_name: 'Semester 4-1',
            core_subjects: ['Construction Planning & Project Management (CPM / PERT)', 'Estimating, Costing & Valuation', 'Earthquake Resistant Design of Structures', 'Elective: Prestressed Concrete Structures'],
            labs: ['Computer Aided Estimation & Detailing Lab', 'Geotechnical Finite Element Lab'],
            key_milestone: 'Appear for on-campus L&T, Tata Projects, and state municipal civil interviews.'
          },
          {
            sem_number: 8,
            sem_name: 'Semester 4-2',
            core_subjects: ['Major Industry Infrastructure Capstone Project', 'Technical Seminar & Viva Voce'],
            labs: ['Full-scale BIM & Structural Design Defense'],
            key_milestone: 'Complete structural drawings and bar bending schedule (BBS) for a complete commercial complex.'
          }
        ],
        tools_to_learn: ['STAAD Foundation Advanced', 'MS Project', 'GIS Mapping'],
        certification: 'GATE Civil Engineering Top Rank / Chartered Engineer pathway'
      }
    ],
    featured_projects: [
      {
        tier: 'Beginner',
        title: 'Campus Topographic Contour Mapping with Total Station',
        description: 'Complete horizontal and vertical control survey of a 10-acre educational campus delivering 3D contour map in DXF format.',
        tools: ['Total Station', 'AutoCAD Civil 3D', 'Excel']
      },
      {
        tier: 'Intermediate',
        title: 'Seismic Structural Analysis of G+5 Commercial Complex',
        description: 'Dynamic response spectrum and wind load evaluation of RCC moment-resisting frame in ETABS complying with IS 1893:2016.',
        tools: ['ETABS', 'STAAD.Pro', 'IS 456', 'IS 1893']
      },
      {
        tier: 'Capstone',
        title: 'Complete BIM Model, Structural Design & Schedule for Smart Hospital',
        description: 'Integrated architectural, structural, and MEP modeling in Revit with 4D construction schedule linking in Primavera P6.',
        tools: ['Autodesk Revit', 'ETABS', 'Primavera P6', 'AutoCAD']
      }
    ],
    competitive_exams: [
      {
        exam_name: 'GATE Civil Engineering (CE)',
        description: 'Top national exam for M.Tech admissions at IITs and executive engineer recruitment in NHAI, CPWD, RVNL, and IOCL.',
        eligibility_timing: '3rd & 4th Year'
      },
      {
        exam_name: 'UPSC Indian Engineering Services (IES / ESE Civil)',
        description: 'Highest civil engineering career appointments in Indian Railway Service of Engineers (IRSE) and Military Engineer Services (MES).',
        eligibility_timing: 'Final Year & Post-Graduation'
      }
    ]
  },

  // =========================================================================
  // AI & MACHINE LEARNING (AIML)
  // =========================================================================
  aiml: {
    id: 'btech_aiml',
    branch_code: 'aiml',
    name: 'Artificial Intelligence & Machine Learning (AI/ML)',
    short_name: 'AI/ML',
    tagline: 'Deep Learning, LLM Engineering, Computer Vision & Production MLOps',
    overview: 'AI & Machine Learning integrates linear algebra, probabilistic reasoning, deep neural networks, large language models, computer vision, and cloud MLOps to engineer intelligent autonomous systems.',
    syllabus_pdf_url: '/docs/jntugv_aiml_foundations.pdf',
    syllabus_pdf_title: 'JNTU-GV B.Tech AI & ML R23 Mathematical Foundations & Python Syllabus',
    syllabus_code: 'R23-AIML-1102',
    regulation: 'R23 / R20 JNTU-GV & Affiliated Colleges',
    average_package: '₹9.0 LPA - ₹18.0 LPA',
    highest_package: '₹48.0 LPA (OpenAI / Google DeepMind / Microsoft / Uber)',
    core_competencies: [
      'Mathematical Foundations (Linear Algebra, Calculus, Bayes Probability)',
      'Machine Learning Algorithms (Regression, SVM, Random Forests)',
      'Deep Learning (CNNs, RNNs, Transformers, Diffusion Models)',
      'Large Language Models (LLMs, Prompt Engineering, RAG Architecture)',
      'Computer Vision & Object Detection (YOLO, OpenCV)',
      'Production MLOps (Docker, MLflow, FastAPI, Triton Inference Server)'
    ],
    simulation_tools: [
      'PyTorch & TensorFlow',
      'Hugging Face Transformers & Datasets',
      'Jupyter Lab & Google Colab Pro',
      'Weights & Biases (WandB) / MLflow',
      'Docker & Triton Inference Server'
    ],
    programming_languages: [
      'Python',
      'SQL',
      'C++ for Tensor Acceleration (CUDA)',
      'TypeScript'
    ],
    psu_recruiters: [
      'DRDO Center for AI & Robotics (CAIR)',
      'ISRO Space Applications Centre',
      'CDAC AI Research Wing',
      'National Informatics Centre (NIC)'
    ],
    corporate_recruiters: [
      'Microsoft AI',
      'Amazon AWS AI',
      'Google Research',
      'Nvidia',
      'Adobe Sensei',
      'Tiger Analytics',
      'Fractal Analytics'
    ],
    four_year_plan: [
      {
        year: 1,
        title: '1st Year: Mathematics for ML & Python Foundations',
        stage_name: 'Year 1 (Sem 1 & 2)',
        theme: 'Matrices, Vector Spaces, Probability & Python Programming',
        semesters: [
          {
            sem_number: 1,
            sem_name: 'Semester 1-1',
            core_subjects: ['Linear Algebra & Matrices (M1)', 'Python for Data Science', 'Applied Physics', 'Engineering Graphics'],
            labs: ['Python for Data Science Lab (NumPy, Matplotlib)', 'Physics Lab'],
            key_milestone: 'Master matrix transformations, SVD concepts, and NumPy vectorization.'
          },
          {
            sem_number: 2,
            sem_name: 'Semester 1-2',
            core_subjects: ['Multivariable Calculus & Optimization', 'Data Structures in Python/C++', 'Discrete Mathematics & Logic', 'Basic Electrical Engineering'],
            labs: ['Data Structures Laboratory', 'Scientific Computing Lab'],
            key_milestone: 'Implement gradient descent algorithms and search trees from scratch.'
          }
        ],
        tools_to_learn: ['NumPy', 'Pandas', 'Jupyter Lab', 'Git'],
        certification: 'DeepLearning.AI Python for AI'
      },
      {
        year: 2,
        title: '2nd Year: Core Machine Learning & Statistical Modeling',
        stage_name: 'Year 2 (Sem 3 & 4)',
        theme: 'Supervised Learning, Feature Engineering, DBMS & Algorithms',
        semesters: [
          {
            sem_number: 3,
            sem_name: 'Semester 2-1',
            core_subjects: ['Machine Learning Foundations (Regression, Trees, SVM)', 'Database Management Systems & SQL', 'Probability & Inferential Statistics', 'Design of Algorithms'],
            labs: ['Machine Learning scikit-learn Lab', 'SQL Data Wrangling Lab'],
            key_milestone: 'Train, evaluate, and tune hyper-parameters of classifiers on real-world datasets.'
          },
          {
            sem_number: 4,
            sem_name: 'Semester 2-2',
            core_subjects: ['Unsupervised Learning & Clustering', 'Operating Systems & Distributed Compute', 'Artificial Intelligence Search Algorithms', 'Exploratory Data Analysis'],
            labs: ['AI Heuristic Search Lab (A*, Minimax)', 'Unsupervised Clustering Lab'],
            key_milestone: 'Build end-to-end data pipelines with automated outlier removal and feature scaling.'
          }
        ],
        tools_to_learn: ['scikit-learn', 'PostgreSQL', 'Seaborn'],
        certification: 'DeepLearning.AI Machine Learning Specialization'
      },
      {
        year: 3,
        title: '3rd Year: Deep Learning, Computer Vision & NLP',
        stage_name: 'Year 3 (Sem 5 & 6)',
        theme: 'Convolutional Networks, Attention Mechanism, LLMs & MLOps',
        semesters: [
          {
            sem_number: 5,
            sem_name: 'Semester 3-1',
            core_subjects: ['Deep Learning & Neural Networks (PyTorch)', 'Natural Language Processing (NLP & Transformers)', 'Computer Vision (CNNs, Object Detection)', 'Cloud Computing for AI'],
            labs: ['PyTorch Neural Network Training Lab', 'Computer Vision OpenCV & YOLO Lab'],
            key_milestone: 'Fine-tune a Hugging Face Transformer model on custom domain text with GPU acceleration.'
          },
          {
            sem_number: 6,
            sem_name: 'Semester 3-2',
            core_subjects: ['Large Language Models (LLMs) & RAG Systems', 'MLOps & Model Deployment (FastAPI, Docker)', 'Reinforcement Learning', 'Professional Elective: Time Series Forecasting'],
            labs: ['LLM RAG & Vector Database Lab', 'MLOps Containerized Inference Lab'],
            key_milestone: 'Secure a Summer AI Engineer Internship at a high-growth tech firm.'
          }
        ],
        tools_to_learn: ['PyTorch', 'Hugging Face', 'FastAPI', 'Docker', 'Qdrant / Milvus'],
        certification: 'TensorFlow / PyTorch Developer Certificate'
      },
      {
        year: 4,
        title: '4th Year: Generative AI, Capstone & Placements',
        stage_name: 'Year 4 (Sem 7 & 8)',
        theme: 'Autonomous Systems, Model Optimization, Capstone & Career Launch',
        semesters: [
          {
            sem_number: 7,
            sem_name: 'Semester 4-1',
            core_subjects: ['Generative AI & Diffusion Models', 'AI Ethics, Governance & Model Safety', 'High-Performance Inference Optimization (TensorRT / ONNX)', 'Elective: Autonomous Robotics Vision'],
            labs: ['Generative AI Pipeline Lab', 'Production TensorRT Benchmark Lab'],
            key_milestone: 'Complete campus placement interviews for AI/ML and Data Science tracks.'
          },
          {
            sem_number: 8,
            sem_name: 'Semester 4-2',
            core_subjects: ['Major Industry AI Capstone Project', 'Technical Seminar & Viva Voce'],
            labs: ['Live Production Model Serving Defense'],
            key_milestone: 'Deploy live multimodal AI application with sub-100ms latency to production.'
          }
        ],
        tools_to_learn: ['ONNX Runtime', 'LangChain / LlamaIndex', 'Kubernetes'],
        certification: 'AWS Certified Machine Learning Specialty'
      }
    ],
    featured_projects: [
      {
        tier: 'Beginner',
        title: 'Real-Time Facial Emotion Detector',
        description: 'Lightweight convolutional network classifying facial emotions live from webcam video feed using OpenCV.',
        tools: ['Python', 'OpenCV', 'PyTorch']
      },
      {
        tier: 'Intermediate',
        title: 'Enterprise Academic RAG Query Engine',
        description: 'Retrieval Augmented Generation system answering student queries directly from university syllabus PDFs using vector embeddings.',
        tools: ['FastAPI', 'Hugging Face', 'ChromaDB', 'Next.js']
      },
      {
        tier: 'Capstone',
        title: 'Autonomous Defect Inspection System with Edge Inference',
        description: 'Industrial vision pipeline detecting manufacturing micro-defects at 60 FPS on edge Nvidia Jetson with automated cloud telemetry.',
        tools: ['PyTorch', 'TensorRT', 'Docker', 'Nvidia Jetson']
      }
    ],
    competitive_exams: [
      {
        exam_name: 'GATE Data Science & Artificial Intelligence (DA)',
        description: 'Dedicated national paper for M.Tech AI admissions at IIT Madras, IIT Bombay, and IISc Bangalore.',
        eligibility_timing: '3rd & 4th Year'
      }
    ]
  }
};
