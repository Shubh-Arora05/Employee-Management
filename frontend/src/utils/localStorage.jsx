const employees = [
    {
        id: 1,
        firstname: "Amit",
        email: "e@e.com",
        password: "123",
        tasks: [
            {
                title: "Complete Report",
                description: "Prepare the monthly financial report.",
                date: "2025-02-10",
                category: "Finance",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                title: "Client Meeting",
                description: "Attend a Zoom call with Client X.",
                date: "2025-02-12",
                category: "Meetings",
                active: false,
                newTask: false,
                completed: true,
                failed: false
            },
            {
                title: "Review Budget",
                description: "Analyze the Q1 budget for discrepancies.",
                date: "2025-02-15",
                category: "Finance",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            }
        ],
        taskCount: {
            activeTasks: 2,
            newTasks: 2,
            completedTasks: 1,
            failedTasks: 0
        }
    },
    {
        id: 2,
        firstname: "Rajesh",
        email: "employee2@example.com",
        password: "123",
        tasks: [
            {
                title: "Code Review",
                description: "Review PR #42 from the development team.",
                date: "2025-02-08",
                category: "Development",
                active: false,
                newTask: false,
                completed: true,
                failed: false
            },
            {
                title: "Bug Fixing",
                description: "Fix login authentication bug.",
                date: "2025-02-11",
                category: "Development",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                title: "Write Documentation",
                description: "Update API documentation for the latest release.",
                date: "2025-02-14",
                category: "Development",
                active: true,
                newTask: false,
                completed: false,
                failed: true
            }
        ],
        taskCount: {
            activeTasks: 2,
            newTasks: 1,
            completedTasks: 1,
            failedTasks: 1
        }
    },
    {
        id: 3,
        firstname: "Vikram",
        email: "employee3@example.com",
        password: "123",
        tasks: [
            {
                title: "Design Homepage",
                description: "Create a new UI/UX design for the homepage.",
                date: "2025-02-09",
                category: "Design",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                title: "Fix Mobile Responsiveness",
                description: "Ensure the website is fully responsive on mobile devices.",
                date: "2025-02-13",
                category: "Design",
                active: false,
                newTask: false,
                completed: true,
                failed: false
            },
            {
                title: "Prototype User Flow",
                description: "Create a user flow prototype for the new onboarding process.",
                date: "2025-02-16",
                category: "Design",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            }
        ],
        taskCount: {
            activeTasks: 2,
            newTasks: 2,
            completedTasks: 1,
            failedTasks: 0
        }
    },
    {
        id: 4,
        firstname: "Suresh",
        email: "employee4@example.com",
        password: "123",
        tasks: [
            {
                title: "SEO Optimization",
                description: "Analyze and improve website SEO rankings.",
                date: "2025-02-07",
                category: "Marketing",
                active: false,
                newTask: false,
                completed: true,
                failed: false
            },
            {
                title: "Content Strategy",
                description: "Plan content strategy for Q2.",
                date: "2025-02-12",
                category: "Marketing",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                title: "Email Campaign",
                description: "Prepare and launch an email marketing campaign.",
                date: "2025-02-15",
                category: "Marketing",
                active: true,
                newTask: false,
                completed: false,
                failed: true
            }
        ],
        taskCount: {
            activeTasks: 2,
            newTasks: 1,
            completedTasks: 1,
            failedTasks: 1
        }
    },
    {
        id: 5,
        firstname: "Neha",
        email: "employee5@example.com",
        password: "123",
        tasks: [
            {
                title: "Customer Feedback Analysis",
                description: "Analyze feedback and prepare a report.",
                date: "2025-02-08",
                category: "Customer Support",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                title: "Resolve Support Tickets",
                description: "Close at least 10 support tickets today.",
                date: "2025-02-10",
                category: "Customer Support",
                active: false,
                newTask: false,
                completed: true,
                failed: false
            },
            {
                title: "Improve Knowledge Base",
                description: "Update knowledge base articles for better clarity.",
                date: "2025-02-13",
                category: "Customer Support",
                active: true,
                newTask: false,
                completed: false,
                failed: true
            }
        ],
        taskCount: {
            activeTasks: 2,
            newTasks: 1,
            completedTasks: 1,
            failedTasks: 1
        }
    }
];

  
  const admin = [
    {
      id: 1,
      email: "admin@example.com",
      password: "123"
    }
  ];
  

  

 
 
 export const setLocalStorage = () =>{
     localStorage.setItem('employees' , JSON.stringify(employees)) ;
     localStorage.setItem('admin' , JSON.stringify(admin)) ;
 }


 export const getLocalStorage = () =>{

    const employees = JSON.parse(localStorage.getItem('employees') ) ;
    const admin = JSON.parse(localStorage.getItem('admin') ) ;

    return {employees, admin}
    
 } 