export const DEPARTMENTS= ['CS', 
    'Math', 
    'English',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Geography',
    'Economics',
    'Political Science',
    'Sociology',
    'Philosophy',
    'Art',
    'Music',
    'Dance'];

    export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((department) => ({
        label: department,
        value: department,
    }));
    export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;