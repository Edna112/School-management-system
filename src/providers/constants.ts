import { Subject } from "@/types";
import { BACKEND_BASE_URL } from "@/constants";

export const API_URL = `${BACKEND_BASE_URL}/subjects`;

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        department: "CS",
        description: "An introductory course covering fundamental programming concepts, algorithms, and data structures. Students will learn basic programming skills using a modern programming language and understand the core principles of computer science.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        code: "MATH201",
        name: "Calculus I",
        department: "Math",
        description: "A comprehensive study of differential and integral calculus. Topics include limits, continuity, derivatives, and integrals. This course provides the mathematical foundation for advanced studies in science and engineering.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        code: "ENG301",
        name: "Advanced English Literature",
        department: "English",
        description: "An in-depth exploration of major works in English literature from the Renaissance to modern times. Students will analyze themes, literary techniques, and historical contexts while developing critical thinking and analytical writing skills.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 4,
        code: "PHYS202",
        name: "Classical Mechanics",
        department: "Physics",
        description: "A fundamental course covering Newtonian mechanics, kinematics, dynamics, and conservation laws. Students will study motion, forces, energy, and momentum through theoretical analysis and practical problem-solving exercises.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 5,
        code: "CHEM301",
        name: "Organic Chemistry",
        department: "Chemistry",
        description: "An advanced study of carbon-based compounds, their structures, properties, and reactions. Topics include functional groups, stereochemistry, reaction mechanisms, and synthesis strategies essential for understanding biological and pharmaceutical chemistry.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 6,
        code: "BIO201",
        name: "Cell Biology",
        department: "Biology",
        description: "An exploration of cellular structure, function, and processes. Students will learn about cell organelles, membrane transport, cell division, and cellular communication, providing the foundation for understanding living organisms at the molecular level.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 7,
        code: "HIST302",
        name: "World History: Modern Era",
        department: "History",
        description: "A comprehensive survey of global history from the 18th century to the present. Examines major political, social, economic, and cultural developments including revolutions, world wars, decolonization, and globalization.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 8,
        code: "ECON201",
        name: "Principles of Microeconomics",
        department: "Economics",
        description: "An introduction to economic analysis focusing on individual decision-making, market structures, supply and demand, consumer behavior, and firm production. Students will learn to analyze economic problems and understand market mechanisms.",
        createdAt: new Date().toISOString(),
    },
];
