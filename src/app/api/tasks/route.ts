
interface Task {
  id: number;
  title: string;
 
  completed: boolean;
}

interface CreateTaskRequest {
  title: string;
  
}
let tasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    completed: false,
  },
  
];

export async function GET() {
     
  return Response.json(tasks);
} 

export async function POST(request: Request) {
   try {
    const body : CreateTaskRequest = await request.json();
    if(!body.title) {
        return Response.json({ message: "Title is required" }, { status: 400 });
    }
    const newTask: Task = {
        id: tasks.length + 1,
        title: body.title,
        completed: false,
    }
    tasks.push(newTask);
    return Response.json(newTask, { status: 201 });
    
   } catch (error) {
    return Response.json({ message: "Error adding task" }, { status: 500 });
   }
}